var mongoose = require('mongoose');
var sanpham = mongoose.Schema({
    name : {type:String},
    code : {type:String},
    sl : {type:Number},
    price : {type:Number},
    mt : {type:String},
    img : {type:Array}
})
module.exports = mongoose.model("sanpham",sanpham)