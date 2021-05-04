const fs = require('fs-extra');

const directoriesToCopy = ["manifest.json", "assets"];

for (var i = directoriesToCopy.length - 1; i >= 0; i--) {
	let path = directoriesToCopy[i]
	copyDirectory(path);
}

function copyDirectory(srcDir) {
	const destDir = `build/${srcDir}`;	

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

}