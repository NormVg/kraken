const fs = require('fs');
const path = require('path');

function listDirectory(dirPath) {
    try {
        const files = fs.readdirSync(dirPath); // Read the directory
        return files.map(file => {
            const fullPath = path.join(dirPath, file);
            const isDirectory = fs.lstatSync(fullPath).isDirectory();
            return {
                name: file,
                path: fullPath,
                type: isDirectory ? 'directory' : 'file'
            };
        });
    } catch (error) {
        console.error('Error reading directory:', error.message);
        return [];
    }
}

console.log(
listDirectory("/home/vishnu/room/dev/kraken/src/renderer/src/components")
)