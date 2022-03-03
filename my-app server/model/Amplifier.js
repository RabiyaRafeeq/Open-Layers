const mongoose = require('mongoose');

const AmplifierSchema = new mongoose.Schema({
    type:String,
    geometry:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], 
            required: true
        }
    }
});

const Amplifier = mongoose.model("Amplifier",AmplifierSchema);

module.exports = Amplifier;