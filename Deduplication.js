//NLU keywords
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': 'f9f8f677-7097-4d3b-a1bc-39a1b518b54d',
  'password': 'GsYeHzMUW1Ii',
  'version_date': '2017-02-27'
});
//from Deduplication debate during 3/13 meeting
var tm = ["A turing machine is defined as a finite state machine with the ability to read and write data to a tape",
  "The definition of a turing machine: a finite state machine that writes and reads to a tape"];
//from EGEE437 Solar Energy Conversion Systems
var myStringArray = ["What is a component Of light?","A term for the groups Of physical orientations and scattering Of light",
 "A term for the groups Of similar wavelengths Of light orientations and scattering Of light",
"A term for the groups Of only horizontal orientations Of light"];

var arrayLength = tm.length;
for (var i = 0; i < arrayLength; i++) {
    console.log('String ' + i + ' is: ' + tm[i]);
    var parameters = {
      'html': tm[i],
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
    // Loop through the JSON and output each row in to a string.
    for(j = 0; j < count; j++) {
        keywords =  tool.keywords[j].text;
        console.log('string' + i + ' keywords are: ' + keywords);
  }//keywords for loop
});
}
//NLU from SDK
/*var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  username: 'f9f8f677-7097-4d3b-a1bc-39a1b518b54d',
  password: 'GsYeHzMUW1Ii',
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

nlu.analyze({
  'html': "What is a component Of light? C) a term for the groups Of physical orientations and scattering Of light C) a term for the groups Of similar wavelengths Of light orientations and scattering Of light C) a term for the groups Of only horizontal orientations Of light", // Buffer or String
  'features': {
    'concepts': {},
    'keywords': {},
  }
}, function(err, response) {
     if (err)
       console.log('error:', err);
     else
       var retreivedstring = JSON.stringify(response, null, 2);
       console.log(retreivedstring);
 });
*/

//NLU Semantic Roles
/*
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': 'f9f8f677-7097-4d3b-a1bc-39a1b518b54d',
  'password': 'GsYeHzMUW1Ii',
  'version_date': '2017-02-27'
});

var parameters = {
  'features': {
    'semantic_roles': {}
  },
  'text': 'A turing machine is defined as'
};

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
*/
