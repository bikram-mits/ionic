var mongoose = require('mongoose');

var TokenSchema = mongoose.Schema({

  userId:String,
  type:String,
  regId:String
})

var Token= mongoose.model('Token',TokenSchema);

module.exports.Token=Token;
