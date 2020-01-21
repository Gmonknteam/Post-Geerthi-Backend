const mongoose = require('mongoose');

var schema = mongoose.Schema;

var userSchema = new schema (

    {
      userId: {
          type:String,
          default:'',
          unique:true,
          index:true
      },
      firstName : {
          type:String,
          default:''
      },
      lastName : {
          type:String,
          default:''
      },
      mail:{
          type:String,
          default:''
      },
      phoneNumber:{
          type:String,
          default:''
      },
      Password :{
          type:String,
          default:'default'
      }

    }
);

mongoose.model('ecomModel',userSchema);