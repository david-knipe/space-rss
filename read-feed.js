'use strict';

const _ = require('lodash');
const FeedParser = require('feedparser');
const request = require('request'); // for fetching the feed 

const getRecent = (done) => { 
const results = [];
const req = request('https://www.nasa.gov/rss/dyn/breaking_news.rss')
const feedparser = new FeedParser({});
 
req.on('error', function (error) {
  // handle any request errors 
});
 
req.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream 
 
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
  }
});
 
feedparser.on('error', function (error) {
  // always handle errors 
  console.log('oasofhdafbh', error);
});
 
feedparser.on('readable', function () {
  // This is where the action is! 
  var stream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
  var item;
//  console.log('ksoehfoh', meta);
 
  while (item = stream.read()) {
//    console.log('jsodhfnksdb', item['rss:title']);
    if (item['rss:title']['#'].match(/Space/i)) {
      results.push(item);
    }
  }
//  console.log('isdofhnosefj', feedparser);
});

feedparser.on('end', () => {
  const sortedResults = _.sortBy(results, [(article) => (new Date(article.pubdate).getTime())]);
  done(null, sortedResults);
});
};

module.exports.getRecent = getRecent;

//console.log('zoivhsodf', feedparser);
//feedparser.on('articles', (event) => console.log('asfubhisuefbn', event));
