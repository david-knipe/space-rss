'use strict';

$.get('/recentStories', {}, (data) => {
    var tableContent = '';
    for (var ind in data) {
        tableContent += '<tr>';
        var article = data[ind];
        tableContent += '<td>' + article.pubdate + '</td>'
            + '<td>' + article.title + '</td>'
            + '<td>' + article.author + '</td>'
            + '<td><img src="' + article['rss:enclosure']['@'].url + '"/></td>'
            + '<td>' + article.description + '</td>'
            + '<td><a href="' + article.link + '">Click!</a></td>'
        tableContent += '</tr>';
    }
    $('#table-content').html(tableContent);
}, 'json');
