var express = require('express');

var app = express();

const mongoose = require('mongoose');

let db = mongoose.connect('mongodb://localhost:27017/ecommercec',{useNewUrlParser:true,useCreateIndex:true});

var bodyParser = require('body-parser');

var shortid = require('shortid');

console.log(shortid.generate());

app.use(bodyParser.urlencoded({extended:false}));

require('./ecommodel');

const ecomModel = mongoose.model('ecomModel');

const port = process.env.port || 4000;

var isEmpty = (data) => {
    if(data == null || data == undefined || data.length==0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

app.post('/signup',function(req,res){

    var retypepassword = req.body.retypepassword;

    var newUser = new ecomModel(
        {
            userId : shortid.generate(),
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            mail:req.body.mail,
            phoneNumber : req.body.phoneNumber,
            password : req.body.password 
        }
    )


    ecomModel.find({phoneNumber:req.body.phoneNumber}).exec(
        (err,data)=>{
            if(err)
            {
                res.send("Error while sending the details "+err);
            }
            else if(isEmpty(data)){
                newUser.save(
                    (err,data)=>{
                        if(err){
                            res.send(err);
                        }
                        else{
                            res.send(
                                {
                                  error:false,
                                  status: 200,
                                  message:'message success',
                                  value : data  
                                }
                            );
                        }
                    }
                )
            }

            else{
                res.send('user already existing please login ');
            }
        }
    )
})


var server = app.listen(port,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("app is listeneing at http://localhost:%s",port);
})