const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    originalName: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    directory: { type: String, default: '/' },
    permissions: { type: String, enum: ['private', 'public', 'shared'], default: 'private' },
    metadata: { type: Object },
    versions: { 
        versionCount: { type: Number },
        details: [
            {
                _id: false,
                filename: { type: String, required: true },
                path: { type: String, required: true },
                version: { type: Number, default: 1 }              
            }
        ]
     }
},{
    timestamps: true // Add timestamps option
});
  
const File = mongoose.model('File', FileSchema);

module.exports = File;