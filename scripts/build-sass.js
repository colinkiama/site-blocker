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

	// Check file data.
	console.log(`Checking ${destinationPath}`);
	const data = fs.readFileSync(destinationPath, 'utf8');
	console.log(data);	
}
// Build view styles.
viewNames.forEach(name => {
	console.log("View Name:", name);

	const sourcePath = `./views/${name}/${name}.scss`;
	const destinationPath = `./dist/${name}.css`;

	buildAndCopySass(sourcePath, destinationPath);
	
})


// Build global styles
const globalStyleName = 'app';
const sourcePath = `./${globalStyleName}/${globalStyleName}.scss`;
const destinationPath = `./dist/${globalStyleName}.css`;

buildAndCopySass(sourcePath, destinationPath);


 