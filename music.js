// MUSIC
var searchMusic = document.getElementById("searchMusic");
var search = document.getElementById("search");

var musicContainer = document.getElementById("musicContainer")
var albumEl = document.getElementById("album")
var notFound = document.getElementById("not-found")
var poster = document.querySelectorAll("poster");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2793edbe56mshf3425b4a4cd084bp11eda4jsn941d9a233e12',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
};
function album() {
    musicContainer.innerHTML = "";
    const url = `https://spotify23.p.rapidapi.com/search/?q=%3C${search.value}%3E&type=multi&offset=0&limit=9&numberOfTopResults=9`;
    fetch(url, options).then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (data) {
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
                        title.textContent = albumName + "  :   " + (artistName);
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