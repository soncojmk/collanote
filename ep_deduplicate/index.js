var eejs = require("ep_etherpad-lite/node/eejs");

exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_chatdate/templates/styles.html", {}, module);
  return cb();
};
console.log('in ep_chatdate');
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
             var parameters1 = {
               'html': holdText[i],
               'features': {
                 'keywords': {
                   'sentiment': true,
                   'emotion': true,
                   'limit': 7
                 }
               }//features
             };//parameters
             keywords(i);

             var parameters2 = {
               'features': {
                 'semantic_roles': {}
                },
                'text': holdText[i],
              };
             semanticRoles(i);
           }//JSON response for loops

         function keywords(i){
         natural_language_understanding.analyze(parameters1, function(err, response) {
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
                 //console.log('Strings are '+ arr[j]);
                 console.log('string ' + i + ' keywords are: ' + keywords);
                 //algo goes here

           }//keywords for loop
            //go(holdText[1]);
         });
         }

         function semanticRoles(i){
         natural_language_understanding.analyze(parameters2, function(err, response) {
           if (err)
             console.log('error:', err);
           else
             console.log(i);
              var tool = JSON.parse(JSON.stringify(response, null, 2));
             //console.log(tool);
             // Get the amount of objects.
             var count = Object.keys(tool.semantic_roles).length;
             var arr = [];
             // Loop through the JSON and output each row in to a string.
             for(j = 0; j < count; j++) {
                 subject =  tool.semantic_roles[j].subject.text;
                 action =  tool.semantic_roles[j].action.verb.text;
                 object =  tool.semantic_roles[j].object.text;
                 //arr.push(subject);
                 //console.log('Strings are '+ arr[j]);
                 console.log('string ' + j + ' subject is: ' + subject);
                 console.log('string ' + j + ' action is: ' + action);
                 console.log('string ' + j + ' object is: ' + object);
                 //algo goes here
           }//keywords for loop
            //go(holdText[1]);
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
