const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/aafta/OneDrive/Desktop/Airtribe_Tasks/Amazon-S3-Clone/uploads'); // Specify the directory where you want to store the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames for uploaded files
    }
  });

const upload = multer({ storage: storage }).single('file');  
module.exports = upload;
