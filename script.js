document.getElementById('btn').addEventListener('click', searchForMovie)
async function searchForMovie(){
    const userInput = document.getElementById('search_bar').value;
    const url = `https://www.omdbapi.com/?t=${userInput}&apikey=57c19a37`;
    
    let data = await fetch(url);
    data = await data.text();
    let response = JSON.parse(data);

    document.getElementById('title').innerHTML = 'Title: ' + response.Title;
    document.getElementById('poster').style.backgroundImage = `url(${response.Poster})`;
    document.getElementById('plot').innerHTML = response.Plot + ' ' + `(${response.Type})`;
    document.getElementById('released').innerHTML = 'Released: ' + response.Released;
    
    let actors = response.Actors;
    let txt = '';
    for (let i in actors){
        txt += actors[i];
    }
    document.getElementById('a-header').style.display = 'inline';
    document.getElementById('actors').innerHTML = txt.replace( /,/g ,' <br>')

    let genre = response.Genre;
    let gxt = '';
    for (let j in genre){
        gxt += genre[j]
    }
    document.getElementById('genre').innerHTML = gxt + ' ';
    document.getElementById('writer').innerHTML = 'Writer(s) ' + response.Writer; 
    
    
}
