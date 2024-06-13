// var walk = require('walkdir');

let fol = "📁"
let fil =  "📄"
const fs = require('fs');
const path = require('path');

/**
 * Recursively walks through a directory and returns its structure as a formatted object.
 * @param {string} dirPath - The path of the directory to walk through.
 * @returns {object} - The formatted structure of the directory as an object.
 */
function walkDirAsObject(dirPath) {
    let idCounter = 1;  // Initialize a counter for unique IDs

    // Define a recursive function to walk the directory
    const walk = (currentPath) => {
        const structure = {
            id: idCounter.toString(),
            name: path.basename(currentPath),
            isFolder: true,
            items: []
        };
        idCounter++;

        // Read all files and directories within the current path
        const items = fs.readdirSync(currentPath);

        items.forEach(item => {
            const itemPath = path.join(currentPath, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
                // Recursively walk through the directory
                const folderStructure = walk(itemPath);
                structure.items.push(folderStructure);
            } else {
                // Add file to the structure
                structure.items.push({
                    id: idCounter.toString(),
                    name: item,
                    isFolder: false,
                    items: []
                });
                idCounter++;
            }
        });

        return structure;
    };

    // Return the final structure starting from the provided directory path
    const rootStructure = walk(dirPath);
    rootStructure.name = "root";  // Name the root directory
    const dirData = JSON.stringify(rootStructure, null, 2)
    return dirData;
}

// Example usage:
const dirPath = '/home/vishnu/dev/DISC';
const directoryStructure = walkDirAsObject(dirPath);

console.log(directoryStructure);



//async with path callback 
 
// walk('/home/vishnu/dev/DISC', function(path, stat) {
//   console.log('found: ', path, stat);
// });
 
//use async emitter to capture more events
 
// var emitter = walk('/home/vishnu/dev/DISC');
 
// emitter.on('file', function(filename, stat) {
//   console.log('file from emitter file: ', filename);
// });

// emitter.on('directory', function(filename, stat) {
//     console.log('file from  dir: ', filename);
//   });
 
// //sync with callback
 
// walk.sync('../', function(path, stat) {
//   console.log('found sync:', path);
// });
 
// //sync just need paths
 
// var paths = walk.sync('../');
// console.log('found paths sync: ', paths);
 
// // async await/promise!
// // let result = await walk.async('../',{return_object:true})
// //result['path'] = {statObject}