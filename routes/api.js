var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/*
1.获取所有的 note: GET  /api/notes req:{}  res:{status :0,data[{},{}]}  {status :1,errorMsg:"失败的信息"}
2.创建一个 note: POST  /api/note/add req:{note:'hello world'}  res:{status :0}  {status :1,errorMsg:"失败的信息"}
3.修改一个 note: POST /api/note/edit req:{note:'new note',id:100}
4.删除一个 note :POST /api/note/delete req:{id:100}
*/

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  var query = {raw:true}
  if(req.session.user){
    query.where = {
      uid:req.session.user.id
    }
  }
	Note.findAll(query).then(function(notes){
	res.send({status:0,data:notes})
	})
});

router.post('/notes/add', function(req, res, next) {

  if(!req.session.user){
    return res.send({status:1,errorMsg:'请先登录！'})
  }

  var uid = req.session.user.id
  var note = req.body.note
  Note.create({text:note,uid:uid}).then(function(){
  	res.send({status:0})
  }).catch(function(){
  	res.send({status:1,errorMsg:'数据库出错！'})
  })
});

router.post('/notes/edit', function(req, res, next) {

  if(!req.session.user){
    return res.send({status:1,errorMsg:'请先登录！'})
  }

  var uid = req.session.user.id
  Note.update({text:req.body.note},{where:{id:req.body.id,uid:uid}}).then(function(){
    console.log(arguments)
  	res.send({status:0})
  }).catch(function(){
    res.send({status:1,errorMsg:'数据库出错！'})
  })
});

router.post('/notes/delete', function(req, res, next) {

  if(!req.session.user){
    return res.send({status:1,errorMsg:'请先登录！'})
  }

  var uid = req.session.user.id
  Note.destroy({where:{id:req.body.id,uid:uid}}).then(function(){
  	res.send({status:0})
  }).catch(function(){
    res.send({status:1,errorMsg:'数据库出错！'})
  })
});

module.exports = router;
