// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                // return an object { articleId: wordCount }
                var arr=res.articles;
                var result={}
                for(var i=0;i<arr.length;i++){
                    // console.log(i,arr[i]);
                    var str=arr[i].text;
                    var id=arr[i]._id;
                    var count=str.split(' ');
                    result[id]=count.length;
                }
                console.log(result);
                return result;
            })
            
    }

    function countWordsSafe(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
                console.log('this is inside countWordsSafe',res)
                return res;
            })
            .catch(err => {
                console.error('Error inside countWordsSafe: ${err.message}');
                return {};
            })
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
                var keys=Object.keys(res);
                var max=res[keys[0]];
                var index=keys[0];
                console.log('GET LARGE',res);
                for(var i=0;i<keys.length;i++){
                    if(max<res[keys[i]]){
                        index=keys[i];
                        max=res[keys[i]];
                        console.log('GET LARGE22',index,max);
                    }
                }

                return index;
            })
    }

    exports.inclass = {
        author: "zy23",
        countWords, countWordsSafe, getLargest
    }

})(this);
