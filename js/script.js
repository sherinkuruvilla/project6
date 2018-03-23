
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $wikiHeaderElem = $('#wikipedia-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $bgimg = $('#bgimg');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    var streetAddress = $('#street').val();
    var city = $('#city').val();
    var streetCity=streetAddress + ', ' + city;

    // load streetview
    bgimg_src_url=`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${streetCity}&key=AIzaSyCriVCDQ3ckiFeUiMNhv8dk0DsRYcgFjyw`;
    //$body.append(`<img class="bgimg" src="${bgimg_src_url}">`);
    $bgimg.attr("src",`${bgimg_src_url}`);

    //Load NY times
     var NYTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + streetCity +
    "&sort=newest&api-key=102be8b382774e7aac9a8c6523f11b35"

    $.getJSON(NYTimesURL
    ).done(function(result, status, xhr) {
        $nytHeaderElem.text('New York Times Article about ' + streetCity);
        var articles = result.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'
                + '<a href="' + article.web_url + '">'
                + article.headline.main + ' target="_blank" </a>'
                + '<p>' + article.snippet + '</p></li>'
                );
        }
    }).fail(function(result, status, xhr) {
        $nytHeaderElem.text('New York Times Articles could not be loaded.');
    });

   // WikiMediaURL = `https://en.wikipedia.org/w/api.php?action=query&titles=` +
   // `${streetCity}&prop=revisions&rvprop=content&format=json&formatversion=2`;


    WikiMediaURL = `https://en.wikipedia.org/w/api.php?action=query` +
                    `&list=search&srsearch=${streetCity}&format=json&formatversion=2`;

                    //alert(WikiMediaURL);
    var wikitimeout = setTimeout(function(){
        $wikiElem.text('Wikipedia article search timed out.')
    }, 8000)

    $.ajax( {
        url: WikiMediaURL,
        dataType: 'jsonp',
        headers: { 'Api-User-Agent': 'SherinKuruvilla@gmail.com' }
    })
    .done(function(result, status, xhr){
        $wikiHeaderElem.text('Wikipedia Article about ' + streetCity);
        var articles = result.query.search;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            var url = 'https://en.wikipedia.org/wiki?curid=' + article.pageid
            $wikiElem.append('<li class="article">'
                + '<a href="' + url + '" target="_blank">'
                + article.title + '</a></li>'
                );
                //console.log(article.title + '  ' + url );
                clearTimeout(wikitimeout);
        }

//console.log(result);
    })
    ;



    return false;
};

$('#form-container').submit(loadData);

