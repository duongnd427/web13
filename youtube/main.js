$(document).ready(function () {
    $("#search").on("submit", function (event) {
        event.preventDefault();

        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q='+$('#keyword').val()+'&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',
            type: 'GET',            
            success: function (result) {
                console.log(result)   
                $("#result-list").empty();
                for(var i=0; i<result.items.length;i++)
                {
                    $("#result-list").append(`
                    <div class="col-md-12">
                        <a class="result col-md-12" hnerf="https://www.youtube.com/watch?v=${result.items[i].id.videoId}?autoplay=true" target="_blank">
                            <img src="${result.items[i].snippet.thumbnails.medium.url}" alt"">
                            <div class="${result.items[i].snippet}">
                                <h2 class="title"> ${result.items[i].snippet.title}</h2>
                                <p class="description">${result.items[i].snippet.description}</p>
                                <span>View>></span>
                            </div>
                        </a>
                    </div>
                    `)       
                }
                $(window).scroll(function() {
                    if($(window).scrollTop() + $(window).height() == $(document).height()) {
                        var j=i;
                        i+=25;
                        var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='+i+'&q='+$('#keyword').val()+'&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw';;
                        $.ajax({
                            url: url,
                            type: 'GET',            
                            success: function (result) {
                                console.log(result)                                
                                for(j; j<result.items.length;j++)
                                {
                                    $("#result-list").append(`
                                    <div class="col-md-12">
                                        <a class="result col-md-12" hnerf="https://www.youtube.com/watch?v=${result.items[j].id.videoId}?autoplay=true" target="_blank">
                                            <img src="${result.items[j].snippet.thumbnails.medium.url}" alt"">
                                            <div class="${result.items[j].snippet}">
                                                <h2 class="title"> ${result.items[j].snippet.title}</h2>
                                                <p class="description">${result.items[j].snippet.description}</p>
                                                <span>View>></span>
                                            </div>
                                        </a>
                                    </div>
                                    `)       
                                }                                        
                            },
                             error: function() {
                                alert("Hết video liên quan !!");
                            }
                        });
                    }
                });                         
            }
        });
    });
});


