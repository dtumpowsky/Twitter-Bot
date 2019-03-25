let Twitter = require('twitter');
let config = require('./config.js');
let T = new Twitter(config);

// Set up search parameters
var params = {
    q: '#banjo',
    count: 10,
    result_type: 'popular',
    lang: 'en'
  }


T.get('search/tweets', params, function(err, data, response) {
    if(!err){
        for(let i = 0; i < data.statuses.length; i++){
            // Get the tweet Id from the returned data
            let id = { id: data.statuses[i].id_str }

            T.post('favorites/create', id, function(err, response){
            
            if(err) {
                console.log(err[0].message);
            } else {
                let username = response.user.screen_name;
                let tweetId = response.id_str;
                console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
                }
            });
        }
        
    } else {
        console.log(err);
    }
})