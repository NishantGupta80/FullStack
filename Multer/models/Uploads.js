const mongoose = require('mongoose');


const uploadSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    imageName: {
        type: String, 
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now 
    },
    role:{
        type:String
    }

});

const Uploads = mongoose.model('Uploads', uploadSchema);

module.exports = Uploads;
