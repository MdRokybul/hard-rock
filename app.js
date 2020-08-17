const inputTitle = document.getElementById('input-title');


document.getElementById('search').addEventListener('click', function(){
    fetch('https://api.lyrics.ovh/suggest/'+inputTitle.value+'')
    .then(Response => Response.json())
    .then(data => displayData(data))
    // .then(data => console.log(data.data[0].album))
    // .then(data => console.log(data))
})

function displayData(single){
    const song = single.data.map(singleSong => singleSong);
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
    for (let index = 0; index < song.length; index++) {
        const id = song[index].album.id;
        const  name = song[index].artist.name;
        const title = song[index].album.title;
        if (index <10) {
            songList.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                <h3 class="lyrics-name"> ${name} </h3>
                                <p class="author lead">Album by <span> ${title} </span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button>
                                </div>
                                </div>`;    
        }   
    }
}

function getLyrics(lyrics) {
    fetch('https://api.lyrics.ovh/suggest/'+inputTitle.value+'')
    .then(Response => Response.json())
    .then(data => {
        const song = data.data.map(singleSong => singleSong);
        for (let index = 0; index < song.length; index++) {
            const id = song[index].album.id;
            const name = song[index].artist.name;
            const title = song[index].album.title;
            const songLyrics = document.getElementById('lyrics');
            
        if( id == lyrics){
                fetch('https://api.lyrics.ovh/v1/'+name+'/'+title+'')
                .then(res => res.json())
                .then(data => {
                    
                    const result = data.lyrics;
                    const getData = result.replace(/(\r\n|\r|\n)/g,'<br>');
                    if(result == undefined){
                        alert('This song has no lyrics');
                    }
                    else{
                        songLyrics.innerHTML += `<div class="col-md-9">
                                            <h3 class="lyrics-name text-center" > ${name} </h3>
                                            <p class="author-lead text-center">Album by <span> ${title} </span></p>
                                            
                                            <p class="text-center"> ${getData} </p>
                                            </div>`;
                    }
                    
                })
            }
        }
    })
}


