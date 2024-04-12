exports.uploadService = async (file) => {
    console.log("uploadService---------", file.file)
    const response = {
        status: false,
        message: "",
    }

    try {

    const form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/uploads'; // Specify the directory where you want to store the uploaded files
    form.keepExtensions = true; // Keep file extensions

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