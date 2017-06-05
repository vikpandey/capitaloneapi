/**
 * Created by vikas on 6/4/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema

//var dishSchema = new Schema({
var coder = new Schema({

        Languages : {

            type : ArrayList,
            required : true
        },
        Name : {

            type : String,
            required : true
        }
    });

var Coder = mongoose.model('Example', coder);

//Make this available to our Node applications

module.exports = Coder;