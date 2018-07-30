var pageToken;
var isLoading = false;
var keyword;
var debounceTimeout;
$(document).ready(function () {

    $("#search").on("input", function (event) {
        event.preventDefault();
        $("#result-list").empty();
        $(".loader").css("opacity", "1");

        keyword = $('#keyword').val();
        pageToken = '';

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function () {
            if (keyword)
                search(keyword)
            else {
                $("#result-list").empty();
                $(".loader").css("opacity", "0")
            }
        }
            , 1000);
    })
});


function search(keyword) {
    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${pageToken}`,
        type: 'GET',
        success: function (result) {
            console.log(result)            
            pageToken = result.nextPageToken ? result.nextPageToken : null;
            for (var i = 0; i < result.items.length; i++) {
                if (result.items[i].id.kind == "youtube#video") {
                    $("#result-list").append(`
                        <a class="result col-md-12" href="https://www.youtube.com/watch?v=${result.items[i].id.videoId}?autoplay=true" target="_blank">
                            <img src="${result.items[i].snippet.thumbnails.medium.url}" alt"">
                            <div class="${result.items[i].snippet}">
                                <h2 class="title"> ${result.items[i].snippet.title}</h2>
                                <p class="description">${result.items[i].snippet.description}</p>
                                <span>View>></span>
                            </div>
                        </a>
                    `)
                }
            }
            isLoading = false;
        }
    });
}

$(window).on("scroll", function () {
    if ($(document).height() - $(window).height() - $(window).scrollTop() < 300) {
        if (pageToken && !isLoading) {
            isLoading = true;
            //keyword = $("#search").val();
            search(keyword);
        }
    }
})

var promiseFuntion = function () {

}

