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
	
	var storages = {};
	var link = {};
	var roms = [];
	
	/**
	 * USB state listener
	 */
	function usbEventListener() {
		var usb = this;
		
		FS.addStorageStateChangeListener(function(result) {
			console.debug(JSON.stringify(result));
			usb.checkMountState();
	  }, error);
	}
	
	/**
	 * Check how many USB are mounted
	 */
	function checkMountState() {
		this.numOfMountedUSB = 0;
		this.USBLabelList = "";
		var usb = this;
		
		FS.listStorages(function(storages){
			
			for (var i = 0; i < storages.length; i++){
				
				debug('checkMountState',JSON.stringify(storages[i]));
				
				if(storages[i].type == TYPE && storages[i].state == STATE){
					usb.storages = storages[i];
					usb.getRomsPath();
				}
			}
			
		},error);
	}
	
	/**
	 * Get link or path to roms directory.
	 * 
	 */
	function getRomsPath(){
		var usb = this;
		
		FS.resolve(
			usb.storages.label + ROMS_PATH,
			function(dir) {
			  debug('FS.resolve', dir);
			  try{
				  
				  /*Listing directory files to get names roms*/
				  FS.listDirectory(dir.fullPath,usb.getRomsList,error);
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
		roms =  files;
		debug('getRomsList (roms)', roms);
	}
	
	return {
		checkMountState: checkMountState,
		usbEventListener: usbEventListener,
		roms: roms
	};
}());