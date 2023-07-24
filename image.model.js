var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    image: String,
    
});
 
//Image is a model which has a schema imageSchema
 let imagemodel=mongoose.model('Image', imageSchema);
module.exports =imagemodel
