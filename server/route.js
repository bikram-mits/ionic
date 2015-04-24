var model = require('./model');
var gcm = require('node-gcm');
var message = new gcm.Message();

var sender = new gcm.Sender('AIzaSyCsLQkhR6Yqydlt-1u8HUeS0_Uafu-K4gs');
var registrationIds = [];

module.exports=function(app){

    app.post('/api/device',function(req,res){

      var token=new model.Token({

          userId:req.body.userId,
          type:req.body.type,
          regId:req.body.regId
      })
      console.log(req.body);
      token.save(function(err){

        console.log(err);
      });
      res.json(200);

    });

    app.get('/api/device/:name',function(req,res){
      console.log('we are here...');

       model.Token.find({"userId":req.params.name}).exec(function(doc,err){
         console.log(err);
        if(doc){
          message.addData('message',"\u270C Peace, Love \u2764 and bikram \u2706!");
          message.addData('title','Hacking your device...' );
          message.addData('msgcnt','3');
          message.timeToLive = 3000;
          console.log(doc[0].regId);
          registrationIds.push(doc[0].regId);
          sender.send(message, registrationIds, 4, function (result) {

            res.json(200);

          });


        }else{

          res.json(500);
        }
       })

    });

};
