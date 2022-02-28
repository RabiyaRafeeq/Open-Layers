const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
      },
      coordinates: {
        type: [[[Number]]], 
        required: true
      }
});

const FeatureSchema = new mongoose.Schema({
    type:String,
    geometry:PolygonSchema
});

const Feature = mongoose.model("Feature",FeatureSchema);

module.exports = Feature;