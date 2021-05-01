const fse = require('fs-extra');

const srcDir = `./dist`;
const destDir = `/build`;



// To copy a folder or file  

try {
	fse.copySync(srcDir, destDir, {overwrite: true}, function (err) {
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