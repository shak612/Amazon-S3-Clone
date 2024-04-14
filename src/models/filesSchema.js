const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    directory: { type: String, default: '/' },
    permissions: { type: String, enum: ['private', 'public', 'shared'], default: 'private' },
    metadata: { type: Object },
    version: { type: Number, default: 1 }
});
  
const File = mongoose.model('File', FileSchema);

module.exports = File;