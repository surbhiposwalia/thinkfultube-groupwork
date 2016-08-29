$(function(){

  $('#search-form').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('search-box').val();
    $('search-box').val('');
    getRequest(searchTerm);
  });

  function getRequest(searchTerm) {
    var params = {
      part: 'snippet',
      key: 'AIzaSyDLyjSGqBFk053JDmFljds0mbtXbuxAVJU',
      q: searchTerm
  };

  $.getJSON('https://www.googleapis.com/youtube/v3/search', params,
    function(data) {
      var searchResult = data.items
      console.log(searchResult);
      $.each(searchResult, function(index, value) {
        var picture = value.snippet.thumbnails.medium.url,
            link = 'https://www.youtube.com/watch?v=' + value.id.videoId;
        populateSearchResult(picture, link)
      });
    })
}

  function populateSearchResult(pictureResult, linkResult) {
    $('.result-list').append('<li class="result-item"><a href=' + linkResult + '><img src="' + pictureResult + '"></a><li>');
  }

});
