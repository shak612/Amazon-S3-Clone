const { default: mongoose } = require("mongoose");
const path = require('path');
const fs = require('fs');
const File = require("../../models/filesSchema");

exports.downloadService = async (folder, fileId, userId) => {
    const response = {
        status: false,
        data: ""
    }
    try {
       
        // Find the file by ID
        const file = await File.findOne({owner: new mongoose.Types.ObjectId(userId), 'versions.details.filename': fileId});
    
        if (!file) {
          return res.status(404).json({ message: 'File not found' });
        }
    
        // Check if the file belongs to the specified folder
        if (file.directory !== folder) {
          return res.status(403).json({ message: 'File not found in the specified folder' });
        }
    
        // Check if the user has permission to access the file
        if (file.owner.toString() !== userId.toString()) {
          return res.status(403).json({ message: 'You do not have permission to access this file' });
        }
    
        // Set the file path
        const filePath = path.join(__dirname, file.path);
    
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ message: 'File not found on server' });
        }
    
        // Stream the file to the client
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.log(error)        
    }
}