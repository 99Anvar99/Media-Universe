// declaring variables
var searchbutton = document.getElementById("searchButton");
var searchMusic = document.getElementById("searchMusic");
var search = document.getElementById("search");

var musicContainer= document.getElementById("musicContainer")
var albumEl = document.getElementById("album")
var notFound= document.getElementById("not-found")
var poster = document.querySelectorAll("poster");

// search movies
async function searchMovies() {
    var input = document.getElementById("search").value;
    var apiKey = "f8e8a149"; //OMDB API key
    var url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(input)}`;
    try {
      var response = await fetch(url);
      var data = await response.json();
      if (data.Response === "True") {
        var movies = data.Search;
        var movieContainer = document.getElementById("movieContainer");
        movieContainer.innerHTML = ""; // Clear previous search results
        document.getElementById("notFound").style.display = "none";
        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];
          var movieElement = createMovieElement(movie);
          movieContainer.appendChild(movieElement);
        }
      } else {
        document.getElementById("movieContainer").innerHTML = "";
        document.getElementById("notFound").style.display = "block";
      }
    } catch (error) {
      console.log(error);
    }
  }

  const options = {
    method: 'GET',
     headers: {
         'X-RapidAPI-Key': '2793edbe56mshf3425b4a4cd084bp11eda4jsn941d9a233e12',
         'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
     }
 };
 function album(){
   musicContainer.innerHTML = "";
     const url =  `https://spotify23.p.rapidapi.com/search/?q=%3C${search.value}%3E&type=multi&offset=0&limit=9&numberOfTopResults=9`;
     fetch (url, options).then(function(response){
         if(response.ok){
             response.json()
             .then(function(data){
                 console.log(data);
                 var albums = data.albums.items;
                 console.log(albums);
         
                 for (var i = 0; i < albums.length; i++) {
           
                     var element = albums[i];
                     var albumName = element.data.name;
                     var artistName = element.data.artists.items[0].profile.name;
                     var imgSrc = element.data.coverArt.sources[0].url;
                     var albumTitle = albumName.Title;
                      // Create a div for whole part
                     var albumDiv = document.createElement("div");
                     albumDiv.classList.add("album");
                     // create a div for title
                     var title = document.createElement("h2");
                     title.textContent = albumName + "  :   "+  (artistName);
                     albumDiv.appendChild(title);
                     // get images
                     var img = document.createElement("img");
                     img.alt = albumTitle;
                     img.src = imgSrc;
                     // Link to spotify
                     var linkElement = document.createElement("a");
                    linkElement.href = element.data.uri;
                    linkElement.appendChild(img);
                     albumDiv.appendChild(linkElement);
           musicContainer.appendChild(albumDiv);
         }
                
               })
             }
         })
     }
 albumEl.addEventListener("click", album);

 
  // event listener when clicking search
  searchbutton.addEventListener("click", searchMovies);

// create movie element
function createMovieElement(movie) {
  var movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  var img = document.createElement("img");
  img.src = movie.Poster;
  img.alt = movie.Title;
  var titleContainer = document.createElement("div");
  var title = document.createElement("h2");
  title.textContent = movie.Title;
  var heartIcon = document.createElement("i");
  heartIcon.classList.add("fas", "fa-heart");
  heartIcon.style.color = isMovieInFavorites(movie.Title) ? "red" : "black";
  titleContainer.appendChild(title);
  titleContainer.appendChild(heartIcon);
  movieDiv.appendChild(img);
  movieDiv.appendChild(titleContainer);

  // Event listener for movie title click
  title.addEventListener("click", function () {
    // Create the Google search URL for the movie title
    var searchQuery = "https://www.google.com/search?q=" + encodeURIComponent(movie.Title);
    // Open the Google search in a new tab
    window.open(searchQuery, "_blank");
  });

  // Event listener for heart icon click
  heartIcon.addEventListener("click", function () {
    if (heartIcon.style.color === "red") {
      // Heart is already red, toggle it back to black
      heartIcon.style.color = "black";
      removeMovieFromFavorites(movie.Title);
    } else {
      // Heart is black, toggle it to red
      heartIcon.style.color = "red";
      saveMovieToFavorites(movie.Title);
    }
  });

  return movieDiv;
}


// Save movie to favorites in local storage
function saveMovieToFavorites(movieTitle) {
  var favorites = localStorage.getItem("favorites") || "";
  favorites += movieTitle + ",";
  localStorage.setItem("favorites", favorites);
}

// Remove movie from favorites in local storage
function removeMovieFromFavorites(movieTitle) {
  var favorites = localStorage.getItem("favorites") || "";
  favorites = favorites.replace(movieTitle + ",", "");
  localStorage.setItem("favorites", favorites);
}

// Check if movie is in favorites in local storage
function isMovieInFavorites(movieTitle) {
  var favorites = localStorage.getItem("favorites") || "";
  return favorites.includes(movieTitle + ",");
}