const multer = require('multer');
const User = require('../models/users');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/aafta/OneDrive/Desktop/Airtribe_Tasks/Amazon-S3-Clone/src/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate unique filenames for uploaded files
    }
  });

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(req.userId){
      const condition = User.findOne({ _id: req.userId });
      condition.then(user => {
        if (user) {
          // Continue with the file upload when the condition is not met
          cb(null, true);
        }else {
          // Skip the file upload when the condition is met
          cb(null, false);
        }
      }).catch(err => {
        console.error(err);
        cb(err, false);
      });
    }else{
      cb(null, false);
    }
  }
}).single('file');  

module.exports = upload;
