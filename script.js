document.getElementById('btn').addEventListener('click', searchForMovie)
async function searchForMovie(){
    const userInput = document.getElementById('search_bar').value;
    const url = `https://www.omdbapi.com/?t=${userInput}&apikey=57c19a37`;
    
  
    var data = await fetch(url);
  
    

    data = await data.text();

    let response = JSON.parse(data);

    if (response.Response !== "False"){

        document.getElementById('container').style.display = 'block';
        
        document.getElementById('title').innerHTML = response.Title;
        document.getElementById('poster').style.backgroundImage = `url(${response.Poster})`;
        setContainerThemeFromPoster(response.Poster);
        document.getElementById('plot').innerHTML = response.Plot + ' ' + `(${response.Type})`;
        document.getElementById('released').innerHTML = 'Released: ' + response.Released;
        
        let actors = response.Actors;
        let txt = '';
        for (let i in actors){
            txt += actors[i];
        }

        // Dynamically set container background color to match movie poster
        function setContainerThemeFromPoster(posterUrl) {
            const posterImg = new window.Image();
            posterImg.crossOrigin = "Anonymous";
            posterImg.src = posterUrl;
            posterImg.onload = function() {
                if (window.ColorThief) {
                    const colorThief = new window.ColorThief();
                    try {
                        const dominantColor = colorThief.getColor(posterImg);
                        document.getElementById('container').style.background = `rgba(${dominantColor.join(',')}, 0.85)`;
                    } catch (e) {
                        // fallback: keep default background
                    }
                }
            };
        }
        document.getElementById('a-header').style.display = 'inline';
        document.getElementById('actors').innerHTML = txt.replace( /,/g ,' <br>')
    
        let genre = response.Genre;
        let genreText = '';
        for (let j in genre){
            genreText += genre[j]
        }
        document.getElementById('genre').innerHTML = genreText + ' ';
        document.getElementById('writer').innerHTML = 'Writer(s) ' + response.Writer; 
        document.getElementById('movie-not-found').style.display = "none";
        
    } else {
        document.getElementById('movie-not-found').style.display = "block";
        document.getElementById('container').style.display = 'none';
    }
    }

    

