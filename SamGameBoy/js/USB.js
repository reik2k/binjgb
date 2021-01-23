/*
 * Copyright (C) 2021 Abel Prieto
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
var App = window.App || {};

App.USB = (function USB() {
	const FS = tizen.filesystem;
	const TYPE = "EXTERNAL";
	const STATE = "MOUNTED";
	const ROMS_PATH = '/roms/gb';
	
	var listRoms = [];
	var resolve_roms;
	var rejected_roms;
	var roms_promise = new Promise((resolve,rejected)=>{
		resolve_roms = resolve; /* it is resolve in getRomsList() */
		rejected_roms = rejected;
	});
	
	/**
	 * USB state listener
	 */
	function usbEventListener() {
		var usb = this;
		
		FS.addStorageStateChangeListener(function(result) {
			console.debug('usbEventListener (result)', result);
			usb.checkMountState();
	  }, error);
	}
	
	/**
	 * Check how many USB are mounted
	 */
	function checkMountState() {
		FS.listStorages(function(storages){
			for (var i = 0; i < storages.length; i++){
				debug('checkMountState (storages)', storages[i]);
				if(storages[i].type == TYPE && storages[i].state == STATE){
					getRomsPath(storages[i].label);
				}
			}
			
		},error);
	}
	
	/**
	 * Get link or path to roms directory.
	 * 
	 */
	function getRomsPath(label){
		FS.resolve(
			label + ROMS_PATH,
			function(dir) {
			  debug('FS.resolve (dir)', dir);
			  try{
				  /*Listing directory files to get names roms*/
				  FS.listDirectory(dir.fullPath,getRomsList,error);
			  }catch(e){error(e)};
			},
			error,
			'rw'
		);
	}
	
	/**
	 * Gets available list roms in array object
	 */
	function getRomsList(files, path){
		var list = [];
		files.forEach((fileName)=>{
			if( !is_oculted_file(fileName) && 
				check_extension_file(fileName)){
				let f = {
					path: '/' + path + '/' + fileName,
					name: fileName
				};
				list.push(f);
			}
		});
		
		resolve_roms(list);
	}
	
	/**
	 * Avoid oculted files
	 */
	function is_oculted_file(fileName){
		
		if(fileName.indexOf('.') == 0){
			return true;
		}
		
		return false;
	}
	
	/**
	 * Only accept GB or GBC extension
	 */
	function check_extension_file(fileName){
		var extension = fileName.split('.')[1];
		if(extension == 'gb' || extension == 'gbc'){
			return true;
		}
		
		return false;
	}
	
	return {
		checkMountState: checkMountState,
		usbEventListener: usbEventListener,
		roms: roms_promise
	};
}());