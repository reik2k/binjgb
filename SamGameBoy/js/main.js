var App = window.App || {};

function tv(){
	var value = tizen.tvinputdevice.getSupportedKeys();
	console.log(value); 
}

App.Main = (function Main(){
	
    window.onload = function () {
    		tv();
    		window.addEventListener('keydown', (event) => {
    			console.log(event); 	
    		},false);

    };
    
    
}());