#!/usr/bin/env node
/**
 * This module is started with bin/run.sh. It sets up a Express HTTP and a Socket.IO Server.
 * Static file Requests are answered directly from this module, Socket.IO messages are passed
 * to MessageHandler and minfied requests are passed to minified.
 */

/*
 * 2011 Peter 'Pita' Martischka (Primary Technology Ltd)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var log4js = require('log4js')
  , async = require('async')
  , stats = require('./stats')


log4js.replaceConsole();

stats.gauge('memoryUsage', function() {
  return process.memoryUsage().rss
})

var settings
  , db
  , plugins
  , hooks;
var npm = require("npm/lib/npm.js");

async.waterfall([
  // load npm
  function(callback) {
    npm.load({}, function(er) {
      callback(er)
    })
  },

  // load everything
  function(callback) {
    settings = require('./utils/Settings');
    db = require('./db/DB');
    plugins = require("ep_etherpad-lite/static/js/pluginfw/plugins");
    hooks = require("ep_etherpad-lite/static/js/pluginfw/hooks");
    hooks.plugins = plugins;

    callback();
  },

  //initalize the database
  function (callback)
  {
    db.init(callback);
  },

  function(callback) {
    plugins.update(callback)
  },

  function (callback) {
    console.info("Installed plugins: " + plugins.formatPluginsWithVersion());
    console.debug("Installed parts:\n" + plugins.formatParts());
    console.debug("Installed hooks:\n" + plugins.formatHooks());

    // Call loadSettings hook
    hooks.aCallAll("loadSettings", { settings: settings });
    callback();
  },

  //initalize the http server
  function (callback)
  {
    hooks.callAll("createServer", {});
    callback(null);
  }
]);

retrieve();

var Padid;
var args2;
var length;
var pads = [];
var holdText = [];

//api
function retrieve(){
setTimeout(
  function() {
api = require('etherpad-lite-client')
etherpad = api.connect({
  apikey: '401c947f830ee815d774e807a6d1cd7d8564cb3977323d3e2b0d85a8268511f1',
  host: 'localhost',
  port: 9001,
})

//list all pads API
etherpad.listAllPads(function(error, data) {
  if(error) console.error('Error listing pads: ' + error.message)
  else console.log('Pads: ' + data.padIDs)
  //padID array
  length = data.padIDs.length;
  for(j = 0; j < data.padIDs.length; j++) {
    pads[j] = data.padIDs[j]
  }//make padid array
})//etherpad.listAllPads

setTimeout(function() {
//setTimeout(function () {   //wait command for for-loop
for(j = 0; j < length; j++) {
  Padid =  pads[j];
  console.log('Pad '+j+' is '+ Padid);
    args2 = {
      padID: Padid,
    }
gettext(j);

function gettext(jay){
etherpad.getText(args2, function(error, data) {
  if(error) console.error('Error getting pad text: ' + error.message)
  else console.log(data.text)
  holdText[jay] = data.text;
})
}//function gettext

}//make padid array
}, 1000); //get text waits for listAllPads to work
}, 2000);//api waits for app to load
}//close api

//process strings
setTimeout(
  function() {
         var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
         var natural_language_understanding = new NaturalLanguageUnderstandingV1({
           'username': 'f9f8f677-7097-4d3b-a1bc-39a1b518b54d',
           'password': 'GsYeHzMUW1Ii',
           'version_date': '2017-02-27'
         });
         /*
         //from Deduplication debate during 3/13 meeting
         var tm = ["A turing machine is defined as a finite state machine with the ability to read and write data to a tape",
           "The definition of a turing machine: a finite state machine that writes and reads to a tape"];
         //from EGEE437 Solar Energy Conversion Systems
         var myStringArray = ["What is a component Of light?","A term for the groups Of physical orientations and scattering Of light",
          "A term for the groups Of similar wavelengths Of light orientations and scattering Of light",
         "A term for the groups Of only horizontal orientations Of light"];
         */
         var arrayLength = holdText.length;
         //var arrayLength = tm.length;
         for (var i = 0; i < arrayLength; i++) {
             console.log('String ' + i + ' is: ' + holdText[i]);
             var parameters = {
               'html': holdText[i],
               'features': {
                 'keywords': {
                   'sentiment': true,
                   'emotion': true,
                   'limit': 7
                 }
               }
             };
             process(i);
           }//JSON response for loops

         function process(i){
         natural_language_understanding.analyze(parameters, function(err, response) {
           if (err)
             console.log('error:', err);
           else
             console.log(i);
              var tool = JSON.parse(JSON.stringify(response, null, 2));
             //console.log(tool);
             // Get the amount of objects.
             var count = Object.keys(tool.keywords).length;
             var arr = [];
             // Loop through the JSON and output each row in to a string.
             for(j = 0; j < count; j++) {
                 keywords =  tool.keywords[j].text;
                 arr.push(keywords);
                 console.log('Strings are '+ arr[j]);
                 console.log('string ' + i + ' keywords are: ' + keywords);
                 //algo goes here
           }//keywords for loop
            go(holdText[1]);
         });
         }
}, 4000); //wait for npm to load

//insert text into pad
function go(text1){
setTimeout(
  function() {
api = require('etherpad-lite-client')
etherpad = api.connect({
  apikey: '401c947f830ee815d774e807a6d1cd7d8564cb3977323d3e2b0d85a8268511f1',
  host: 'localhost',
  port: 9001,
})

var args = {
  padID: pads[length-1],
  text: text1,
}
etherpad.setText(args, function(error, data) {
  if(error) console.error('Error inserting pad text: ' + error.message)
  else console.log('Text is inserted')
})
}, 5000); //settext
}
