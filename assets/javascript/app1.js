// //=======================

// //GLOBAL VARIABLES

// //=======================




var giphy = {

  searchValue: "",

  countries: [

            "Canada", "United States of America", "Switzerland", "China", "France", "Germany", "Ireland", "Scotland", "Spain", "Portugal", "Netherlands", "Norway", "Denmark", "Hungary", "Austria", "Greece", "Italy", "Japan", "Hong Kong", "Thailand", "Malaysia", "Singapore", "Laos", "Burma", "Philippines", "Indonesia", "Vatican City", "Dominican Republic", "Costa Rica"]

}





//=======================

//FUNCTIONS

//=======================



function init() {

  for(i=0; i < giphy.countries.length; i++){

    console.log(giphy.countries[i]);

    $("#topics").append("<button class='btn-primary topic-btn'>" + giphy.countries[i] + "</button>");

  };

};



function search() {

  //Empty the html giphy-area after each search

  $("#giphy-area").html("");

  giphy.searchValue = $("#search").val().trim();

  //Set queryURL for AJAX Request

  var queryURL= "https://api.giphy.com/v1/gifs/search?q="+ giphy.searchValue +"&api_key=XTD2QIleof4xLyh8zHWCGfA1OExJXaGZ&limit=10";



  //AJAX Request

  $.ajax({

    url: queryURL,

    method: 'GET',

  }).done((response) => {

    console.log(response);

    for(i = 0; i < response.data.length; i++){

      //Add raiting and img to html

      $("#giphy-area").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.original.url + " src= " + response.data[i].images.original_still.url + " class= 'gif-img'></div>");

    };

  });

  //Empty the countries array & create new button

  giphy.countries= [];

  //Add new country to the array

  giphy.countries.push(giphy.searchValue);

  //Clear #search

  $("#search").val("")

  //Run init()

  init();

};



function pressTopicBtn () {

  $("#giphy-area").html("");

  var topicBtnValue = $(this).text();

  var queryURL= "https://api.giphy.com/v1/gifs/search?q="+ topicBtnValue +"&api_key=XTD2QIleof4xLyh8zHWCGfA1OExJXaGZ&limit=10";

  $.ajax({

    url: queryURL,

    method: 'GET'

  }).done((response) => {

    console.log(response);

    for(i = 0; i < response.data.length; i++){

      //Add rating and img to html

      $("#giphy-area").append("<div class= 'gif-div'>Rating: " + response.data[i].rating.toUpperCase() + "<br>" + "<img data-name= " + response.data[i].images.original.url + " src= " + response.data[i].images.original_still.url + " class= 'gif-img'></div>");

    };

  });

};



//In creating each image, I added a data-name containing the gif url. Here I swap that with the still image url being used in the src.

function changeImage() {

    var temp = $(this).attr("data-name");

    $(this).attr("data-name", $(this).attr("src"));

    $(this).attr("src", temp);

  };







//=======================

//MAIN PROCESS

//=======================

//Initialize on start

init();



//When the Submit button is clicked the search function is called

$("#search-btn").on("click", search);

//When the Country buttons are clicked, the presstopicBtn function is called

$(document).on("click", ".topic-btn", pressTopicBtn);

//When the gif images are clicked, changeImage function is called

$(document).on("click", ".gif-img", changeImage);