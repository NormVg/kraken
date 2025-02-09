

const saveFilePath = (text, filePath) => {
  try {
    window.fs.writeFileSync(filePath, text, "utf8");
    console.log(`File saved: ${filePath}`);
  } catch (error) {
    console.error("Error saving file:", error);
  }
};

const createFile = (name, dirPath) => {
  const filePath = window.path.join(dirPath, name);
  try {
    window.fs.writeFileSync(filePath, "", "utf8"); // Creates an empty file
    console.log(`File created: ${filePath}`);
  } catch (error) {
    console.error("Error creating file:", error);
  }
};

const createFolder = (name, dirPath) => {
  const folderPath = window.path.join(dirPath, name);
  try {
    if (!window.fs.existsSync(folderPath)) {
      window.fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder created: ${folderPath}`);
    } else {
      console.log("Folder already exists:", folderPath);
    }
  } catch (error) {
    console.error("Error creating folder:", error);
  }
};

const deleteFile = (filePath) => {
  try {
    if (window.fs.existsSync(filePath)) {
      window.fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
    } else {
      console.log("File does not exist:", filePath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const deleteFolder = (folderPath) => {
  try {
    if (window.fs.existsSync(folderPath)) {
      window.fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`Folder deleted: ${folderPath}`);
    } else {
      console.log("Folder does not exist:", folderPath);
    }
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

const renameFileFolder = (newName, oldPath) => {
  const newPath = window.path.join(window.path.dirname(oldPath), newName);
  try {
    if (window.fs.existsSync(oldPath)) {
      window.fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${oldPath} -> ${newPath}`);
    } else {
      console.log("File/Folder does not exist:", oldPath);
    }
  } catch (error) {
    console.error("Error renaming:", error);
  }
};


function isImageFile(filePath) {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".tiff",
    ".svg",
"ico"
  ];
  const ext = window.path.extname(filePath).toLowerCase();
  return imageExtensions.includes(ext);
}



async function listDirectory(dirPath) {
  try {
    const files = await window.fs.promises.readdir(dirPath); // Read directory asynchronously
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const fullPath = window.path.join(dirPath, file);
        const stats = await window.fs.promises.lstat(fullPath); // Get stats asynchronously
        const isDirectory = stats.isDirectory();
        const isImage = isImageFile(fullPath);
        return {
          name: file,
          path: fullPath,
          type: isDirectory ? "directory" : isImage ? "image" : "file",
        };
      })
    );


    fileDetails.sort((a, b) => {
      if (a.type === "directory" && b.type !== "directory") return -1;
      if (a.type !== "directory" && b.type === "directory") return 1;
      return a.name.localeCompare(b.name); // Sort alphabetically within type
    });

    return fileDetails;
  } catch (error) {
    console.error("Error reading directory:", error.message);
    return [];
  }
}



export  {
  saveFilePath,
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  renameFileFolder,
  listDirectory,
  isImageFile
};
