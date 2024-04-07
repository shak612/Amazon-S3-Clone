exports.uploadService = async (file) => {
    console.log("uploadService---------", file)
    const response = {
        status: false,
        message: "",
    }

    try {

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