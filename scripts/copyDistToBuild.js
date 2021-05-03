const fs = require('fs-extra');

const srcDir = `dist`;
const destDir = `build/dist`;



// To copy a folder or file  

try {
	fs.copySync(srcDir, destDir, {overwrite: true}, function (err) {
		if (err) {    
			console.error(err); 
	 	} else {
	    	console.log("success!");
	  	}
	});
}
catch (err) {
	console.error(err)
}