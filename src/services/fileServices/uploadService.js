const File = require("../../models/filesSchema");

exports.uploadService = async (data) => {
    const response = {
        status: false,
        message: "File is Successfully Uploaded!!!",
    }

    try {
    if(data.userId === null)
       return response.message = data.message;

    const userId = data.userId;
    const { folder, permissions, metadata } = data.body;

    let directory = '/';
    if (folder) {
      // If folder is provided, ensure it starts and ends with '/'
      directory = `/${folder.replace(/^\/|\/$/g, '')}/`;
    }

    // Save file information to the database
    const file = new File({
      filename: data.file.filename,
      path: data.file.path,
      owner: userId,
      directory: directory || '/', // Default directory is root
      permissions: permissions || 'private', // Default permissions is private
      metadata: metadata || {}
    });

     await file.save();
     response.status = true; 
     return response;
    } catch (error) {
      console.log(error)
        const response = {
            status: false,
            message: error,
        }     
        return response;
    }
}