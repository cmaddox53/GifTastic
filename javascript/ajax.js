window.onload = function any_function_name()
{


var blurb = ["Bye-Felicia", "Oh Word", "Hello",];

// function DisplayBlurb(){

// var blurbEntered = $(this).attr("data-blurb");


// }


function renderButtons(){

  $("#buttons-view").empty();


  for(var i = 0; i< blurb.length; i++){
    var a = $("<button>");
    a.addClass("blurbs");
    a.attr("data-blurb", blurb[i]);
    a.text(blurb[i]);
    $("#buttons-view").append(a);
  }
}

  $("#add-blurb").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var userBlurb = $("#blurb-input").val().trim();

        // The movie from the textbox is then added to our array
        blurb.push(userBlurb);
        console.log(blurb);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        ajax();

      });



 


renderButtons();



function ajax(){
$("button").on("click", function() {
      var topics = $(this).attr("data-blurb");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topics + "&api_key=eDDY2WUDBy4UoWDKvrPxPJcnmc8y0bgA&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

      	console.log(response);

      	var results = response.data;


      	for (var i = 0; i < results.length; i++) {



      		var topicsDiv = $("<div class='item' data-state='still'>");

      		var rating = results[i].rating;

      		var p = $("<p>").text("Rating: " + rating);

      		var gifImage = $("<img>");

          gifImage.attr("src", results[i].images.fixed_height_still.url);
          gifImage.attr("id", "gif-Image");
          gifImage.attr("data-animate", results[i].images.fixed_height.url);
          gifImage.attr("data-still", results[i].images.fixed_height_still.url);
          gifImage.attr("data-state", "still");
          topicsDiv.attr("id", "topics-Div");
          topicsDiv.append(p);
          topicsDiv.append(gifImage);

          $("#gifs-here").prepend(topicsDiv);

          $("#gif-Image").on("click", function(){
          var state = $(this).attr('data-state');

         if (state === "still"){
          $(this).attr("src", $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
          console.log(state);
        } else{
          $(this).attr("src", $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
        }
      });



      	};

        
      	});

  });

}

ajax();


// 
state();

}