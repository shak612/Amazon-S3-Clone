const { default: mongoose } = require("mongoose");
const File = require("../../models/filesSchema");

exports.uploadService = async (data) => {
    const response = {
        status: false,
        message: "File is Successfully Uploaded!!!",
    }

    try {
    
    if(!data.userId){
      response.message = data.message;
      return response;
    }

    const userId = data.userId;
    const existingFile = await File.findOne({owner: new mongoose.Types.ObjectId(userId), originalName: data.file.originalname });

    if(existingFile != undefined){  
      existingFile.versions.versionCount = existingFile.versions.versionCount + 1;
      existingFile.versions.details.push({
          filename: data.file.filename,
          path: data.file.path,
          version: (() => {
            let tempVersion = 0;
            let existingVersions = [...existingFile.versions.details];
            tempVersion = existingVersions.sort((a, b) => b.version - a.version)[0].version + 1;
            return tempVersion
          })()
      })

      await existingFile.save();
    }else{
      const { folder, permissions, metadata } = data.body;
      let directory = '/';
      if (folder) {
        // If folder is provided, ensure it starts and ends with '/'
        directory = `/${folder.replace(/^\/|\/$/g, '')}/`;
      }
      
      // Save file information to the database
      const file = new File({
        originalName: data.file.originalname,
        owner: userId,
        directory: directory || '/', // Default directory is root
        permissions: permissions || 'private', // Default permissions is private
        metadata: metadata || {},
        versions: {
          versionCount: 1,
          details: [
            {
              filename: data.file.filename,
              path: data.file.path,
            }
          ]
        }
      });

      await file.save();
    }

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