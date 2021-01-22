/*
 * Copyright (C) 2021 Abel Prieto
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
'use strict';

var error = (err) => {

	let e = {
			code: err.code,
			message: err.message,
			name: err.name
	}
		
	console.error(JSON.stringify(e));
}

var debug = (name,txt) => {
	
	console.debug('[' + name + '] ' + JSON.stringify(txt));
}