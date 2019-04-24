var express = require('express');
var router = express.Router();
var multer  = require('multer');
var sanphamModule = require('../model/sanpham');
var chuyenObject = require('mongodb').ObjectID;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/manage', {useNewUrlParser: true});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+ '-' +  file.originalname );
  }
});
 
var img = [];
var upload = multer({ storage: storage });

/* GET add page. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
});

/* GET add page. */
router.post('/upload',upload.any(), function(req, res, next) {
  img.push(req.files[0].path);
  console.log(req.files[0].path);
  console.log('phong');
  img.reverse();
  res.status(200).send(req.files);
});

/* GET add page. */
router.post('/add', function(req, res, next) {
  var name = req.body.name, code = req.body.code,sl = req.body.sl,price = req.body.price,mt = req.body.mt
  var motsp = {
    "name" : name,
    "code" : code,
    "sl" : sl,
    "price" : price,
    "mt" : mt,
    "img" : img
  }
  var dulieu = new sanphamModule(motsp);
  console.log(motsp);
  dulieu.save();
  res.redirect('/');
});
// /* GET remove procducts. */
router.get('/xoa/:idcanxoa',upload.any(), function(req, res, next) {
  var idcanxoa = chuyenObject(req.params.idcanxoa);
  sanphamModule.deleteMany({_id:idcanxoa},function(err,res){
    if(err) throw err; 
  })
  res.redirect('/');
});

// 
router.get('/sua/:idcansua',upload.any(), function(req, res, next) {
  var idcansua = chuyenObject(req.params.idcansua);
  sanphamModule.find({_id:idcansua},function(err,dulieu){
    res.render('sua', {title: "sua" , data:dulieu})
  })
});

// 
router.post('/sua/:idcansua',upload.any(), function(req, res, next) {
  var idcansua = chuyenObject(req.params.idcansua);
  var name = req.body.name, code = req.body.code,sl = req.body.sl,price = req.body.price,mt = req.body.mt;
  var motsp1 = {
    "name" : name,
    "code" : code,
    "sl" : sl,
    "price" : price,
    "mt" : mt,
    "img" : img
  }
  sanphamModule.updateOne({_id : idcansua}, {$set:motsp1},function(err,res){
    if(err) throw err; 
  })
  res.redirect('/');
});
// Show SP
router.get('/',upload.any(), function(req, res, next) {
  sanphamModule.find({},function(err,dulieu){
    res.render('index', { title: 'Express', data:dulieu });
  })

});


module.exports = router;
