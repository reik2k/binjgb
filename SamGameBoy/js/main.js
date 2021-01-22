/*
 * Copyright (C) 2021 Abel Prieto
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
var App = window.App || {};

App.Main = (function Main(){
	
	const btnON = document.querySelector( '.btn-on' );
	const btnOFF = document.querySelector( '.btn-off' );
	const power = document.querySelector( '.power' );
	const text = document.querySelector( '.animated-text' );
	const canvas = document.querySelector( '.canvas' );
	const select = document.querySelector( '.default_select' );
	
	var usb = App.USB;
	
	/**
	 * From Modernizr
	 */
    function whichTransitionEvent () {
      let t;
      const el = document.createElement( 'fake' );
      const transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };

      for ( t in transitions ) {
        if ( el.style[ t ] !== undefined ) {
          return transitions[ t ];
        }
      }
    }
    
    /**
	 * Play Nintendo Sound
	 */
    function playSound () {
    		const audio = document.querySelector( 'audio' );
    		audio.currentTime = 0;
    		
    		// Show loading animation.
		var playPromise = audio.play();
		
		if (playPromise !== undefined) {
			playPromise.then(_ => {})
			.catch(error => {
				error(error);
			    });
		 }
    }
    
    function toggleBtn(){
    		if(btnON.className.indexOf('is-disabled') == -1) {
    			btnON.classList.add( 'is-disabled' );
    			btnOFF.classList.remove( 'is-disabled' );
    			power.classList.add( 'power-on' );
    		}
    		else {
    			btnON.classList.remove( 'is-disabled' );
    			btnOFF.classList.add( 'is-disabled' );
    			power.classList.remove( 'power-on' );
    		}
    }
    
    function toggleCanvas(){
    		if(canvas.className.indexOf('hide') == -1){
    			canvas.classList.remove( 'show' );
    			canvas.classList.add( 'hide' );
    		}
		else {
			canvas.classList.remove( 'hide' );
			canvas.classList.add( 'show' );
		}
    }
    
    function completeSelect(roms){
    		
	    	if(roms && roms.length!=0){
	    		for(let i; i < roms.length; i++){
	    			let option = document.createElement('option');
	    			option.setAttribute('value', roms[i] + '.' + i);
	    			select.appendChild(option);
	    			
	    		}
	    	}
	    	
	    	debug('completeSelect', roms);
    }
    
    /**
	 * Console Menu Control
	 */
    function animate() {
		
        // Turn ON
        btnON.onclick = function () {
        	
        		toggleBtn();
        		
		    // Animate text
		    const transitionEvent = whichTransitionEvent();
		    
		    const promise = new Promise(function (resolve, reject){
		    		text.classList.remove( 'btn-hide' );
		    		text.classList.add( 'end' );
		    		text.addEventListener( transitionEvent, playSound );
			    setTimeout(function(){ 
			    		resolve();
			    	}, 6000);
		    });
		    
		    promise.then(
		    		function(){
		    			toggleCanvas();
		    			loadEmu();
		    		});
		    
        };
        	
        // Turn OFF
        btnOFF.onclick = function () {
        		toggleBtn();
        		
            // Text
            text.classList.remove( 'end' );
            
            toggleCanvas();
            Emulator.stop();
          };
    }
    
    window.onload = function () {
    		usb.usbEventListener();
    		usb.checkMountState();
    		completeSelect(usb.roms);
    		
    		animate();
    };
}());
