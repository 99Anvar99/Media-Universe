// MUSIC

var cardSongs=[];
var cardSongsOuterLenght=0;
var searchMusic = document.getElementById("searchMusic");
var search = document.getElementById("search");
var musicContainer = document.getElementById("musicContainer")
var albumEl = document.getElementById("album")
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
                    var tableSongs=[];
                    var cardSongs=[];
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
                        title.textContent = albumName + "  :   " + artistName + likeBtnEl;
                        albumDiv.appendChild(title);

                        
                        var likeBtnEl = document.createElement("div");
                        likeBtnEl.setAttribute("data-song-index",i);             
                        likeBtnEl.classList.add("fa", "fa-heart");
                        likeBtnEl.addEventListener('click', heartTouch);
                        title.append(likeBtnEl);
                        


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
                        tableSongs.push(albumName);
                    }


                        var extractChrome=localStorage.getItem(`cardSongsB`);
                        var arrayChrome=JSON.parse(extractChrome);

                        if (arrayChrome!=null ) {
                        for (var k=0; k<arrayChrome.length; k++) {
                        cardSongs.push(arrayChrome[k]);
                        }
                        }


                        function heartTouch(event) {
                            var songIndex = event.target.getAttribute("data-song-index");
                            cardSongs.push(tableSongs[songIndex]);
                            localStorage.setItem(`cardSongsB`, JSON.stringify(cardSongs));
                            cardSongsOuterLenght=(cardSongs.length);
                           
                        }

                        document.addEventListener("click", tableSavedSongs);
                        function tableSavedSongs() {
                        document.getElementById("demo").innerHTML = "SAVED songs:";
                        for (let j=0; j<cardSongs.length; j++) {
                            var listCardSongs=document.createElement("ul");
                            listCardSongs.innerHTML=cardSongs[j];
                            document.getElementById("demo").appendChild(listCardSongs);
                        }

                       }

                })
        }
    })
}
albumEl.addEventListener("click", album);