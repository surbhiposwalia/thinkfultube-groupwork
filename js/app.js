$(function() {

    $('#search-form').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#search-box').val();
        $('#search-box').val('');
        getRequest(searchTerm);
    });

    $('body').on('click', '.show_channel_button', function() {
        var channelName = $(this).text().slice(5, -7);
        $('.result-list').empty();
        getRequest(channelName);
    });

    function getRequest(searchTerm) {
        var params = {
            part: 'snippet',
            q: searchTerm,
            key: 'AIzaSyCCoDNOVP3ZAwlp6FP3FzZap3WhWTiaajI'
        };

        $.getJSON('https://www.googleapis.com/youtube/v3/search', params,
            function(data) {
                var searchResult = data.items;
                $.each(searchResult, function(index, value) {
                    var picture = value.snippet.thumbnails.medium.url,
                        channelName = value.snippet.channelTitle,
                        link = 'https://www.youtube.com/watch?v=' + value.id.videoId;
                      populateSearchResult(picture, link, channelName);
                });

            })
    }

    function populateSearchResult(pictureResult, linkResult, channelNameResult) {
        $('.result-list').append('<li class="result-item"><a href="' + linkResult + '"><img src="' + pictureResult + '"></a><button class="show_channel_button">Show ' + channelNameResult + ' videos</button></li>');
    }

});
