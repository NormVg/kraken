
export function updateRecentFolderDB(path,db){
    var newDB = db
    const name = path.split('/').pop();

    
    const newVal = {
        name: name,
        path: path
    };
    
    if (!newDB.some(item => item.path == newVal.path)){
        newDB.unshift(newVal)
    }
    newDB = newDB.slice(0, 6);
    return newDB
}