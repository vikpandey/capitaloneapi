/**
 * Created by vikas on 6/4/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema

//var dishSchema = new Schema({
  var unicorn = new Schema({

      Horns : {

          type : Number,
          required : true
      },
      Horn_description : {

          type : String,
          required : true
      },
      Limbs : {
          type : Array,
          required : true
      }
  }
);

var Unicorn = mongoose.model('Example', unicorn);

//Make this available to our Node applications

module.exports = Unicorn;
