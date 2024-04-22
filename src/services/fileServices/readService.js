const mongoose = require("mongoose");
const File = require("../../models/filesSchema");

exports.readService = async (data) => {
    const response = {
        status: false,
        data: [],
    }

    try {
        if (!data.userId) {
            response.message = data.message || "User ID is missing";
            return response;
        }

        const userId = data.userId;

        // Check if userId is a valid ObjectId string
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            response.message = "Invalid User ID";
            return response;
        }

        const filesData = await File.find({ owner: new mongoose.Types.ObjectId(userId) });

        if (!filesData || filesData.length === 0) {
            response.message = 'Files Not Found!!';
            return response;
        }

        filesData.forEach(({ directory, filename }) => {
            response.data.push({
                directory,
                filename
            })
        })

        response.status = true;
        return response;
    } catch (error) {
        console.log(error);
        response.message = "Internal Server Error";
        return response;
    }
}
