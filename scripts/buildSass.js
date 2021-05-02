const sass = require("sass");
const fs = require('fs-extra')
const viewNames = ["popup", "options", "site-blocked"];

function buildAndCopySass(sourcePath, destinationPath){
	try {
	 	let result = sass.renderSync({
			file: sourcePath,
			outFile: destinationPath
		});

		fs.outputFileSync(destinationPath, result.css);
	}
	catch (err) {
		console.error(err);
	}

}
// Build view styles.
viewNames.forEach(name => {
	const sourcePath = `./app/sass/views/${name}.scss`;
	const destinationPath = `./dist/${name}.css`;

	buildAndCopySass(sourcePath, destinationPath);
	
})


// Build global styles
const globalStyleName = 'app';
const sourcePath = `./${globalStyleName}/sass/${globalStyleName}.scss`;
const destinationPath = `./dist/${globalStyleName}.css`;

buildAndCopySass(sourcePath, destinationPath);


 