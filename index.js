var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = new NaturalLanguageUnderstandingV1({
  username: 'f9f8f677-7097-4d3b-a1bc-39a1b518b54d',
  password: 'GsYeHzMUW1Ii',
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

nlu.analyze({
  'html': "Maybe you think the Pontiac Aztek was the greatest car ever made, belong to the FlatEarth Society, and make a pilgrimage to the alien landing site at Roswell, New Mexico,every four years. If you do, go ahead and believe that requirements won't change onyour projects. If, on the other hand, you've stopped believing in Santa Claus and theTooth Fairy, or at least have stopped admitting it, you can take several steps to num-mize the impact of requirements changes", // Buffer or String
  'features': {
    'concepts': {},
    'keywords': {},
  }
}, function(err, response) {
     if (err)
       console.log('error:', err);
     else
       console.log(JSON.stringify(response, null, 2));
 });
