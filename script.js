console.log("wellcome to spotify clone.");

//initialize the variables.
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItemcontainer = document.getElementById('songItemContainer');

let songs = [
    { songId: "0", songName: "Yaari", filePath: "songs/Yaari.mp3", coverPath: "covers/Yaari.jpg", songDuration: "3:14" },
    { songId: "1", songName: "Dill-Ton-Black", filePath: "songs/Dill-Ton-Black.mp3", coverPath: "covers/dil-to-black.jpg", songDuration: "3:13" },
    { songId: "2", songName: "Arcade", filePath: "songs/Arcade.mp3", coverPath: "covers/arcade.jpg", songDuration: "5:14" },
    { songId: "3", songName: "Ek-Onkaar", filePath: "songs/Ek-Onkaar.mp3", coverPath: "covers/Ek-Onkaar.jpg", songDuration: "1:03" },
    { songId: "4", songName: "Ek-Toh-Kum-Zindagani", filePath: "songs/Ek-Toh-Kum-Zindagani.mp3", coverPath: "covers/Ek-Toh-Kum-Zindagani.jpg", songDuration: "3:10" },
    { songId: "5", songName: "Filhall", filePath: "songs/Filhall.mp3", coverPath: "covers/Filhall.jpg", songDuration: "4:15" },
    { songId: "6", songName: "Gajban-Pani-Ne-Chali", filePath: "songs/Gajban-Pani-Ne-Chali.mp3", coverPath: "covers/Gajban-Pani-Ne-Chali.jpg", songDuration: "3:23" },
    { songId: "7", songName: "GAL-KARKE", filePath: "songs/GAL-KARKE.mp3", coverPath: "covers/GAL-KARKE.jpg", songDuration: "3:23" },
    { songId: "8", songName: "Garmi-Song", filePath: "songs/Garmi-Song.mp3", coverPath: "covers/Garmi-Song.jpg", songDuration: "2:40" },
    { songId: "9", songName: "Ja-Ja-Ja", filePath: "songs/Ja-Ja-Ja.mp3", coverPath: "covers/Ja-Ja-Ja.jpg", songDuration: "3:43" },
]

let i = 1;
songs.forEach((element) => {
    songItemcontainer.insertAdjacentHTML('beforeend', `<div class='songItem'><img src='${element.coverPath}' alt='${i}' data_filepath='${element.filePath}'>
                                                            <span class='songName' data_id='${element.songId}'>${element.songName}</span>
                                                            <span class='songlistplay'>
                                                                <span class='timestemp'>${element.songDuration} <i class='playsong fa fa-play-circle' aria-hidden='true'></i></span>
                                                            </span>
                                                        </div>`);
    i++;
})

let songName = Array.from(document.getElementsByClassName('songName'));
// console.log(songName);

let audioElement = new Audio(songs[0].filePath);
audioElement.value = songs[0].songId;
let mainFileName = document.getElementById('mainFileName');
mainFileName.innerHTML = songs[0].songName;

//select song and play.
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playsong')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('playsong')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.currentTime = 0;
        audioElement.src = e.target.parentNode.parentNode.parentNode.childNodes[0].attributes.data_filepath.value;
        audioElement.play();
        audioElement.value = e.target.parentNode.parentNode.parentNode.childNodes[2].attributes.data_id.value;
        mainFileName.innerHTML = e.target.parentNode.parentNode.parentNode.childNodes[2].innerText
            // console.log(e.target.parentNode.parentNode.parentNode.childNodes[2].innerText);

        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        gif.style.opacity = 1;
    })
})

//previous song.
let previousSong = document.getElementById('previousSong');
previousSong.addEventListener('click', () => {
    let valueId = parseInt(audioElement.value) - 1;
    songs.forEach((element) => {
        if (element.songId == valueId) {
            makeAllPlays();
            masterPlay.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            gif.style.opacity = 1;
            Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
                if (element.childNodes[2].attributes.data_id.value == valueId) {
                    element.childNodes[4].firstElementChild.firstElementChild.classList.remove('fa-play-circle');
                    element.childNodes[4].firstElementChild.firstElementChild.classList.add('fa-pause-circle');
                }
            })

            audioElement.currentTime = 0;
            audioElement.src = element.filePath;
            audioElement.play();
            audioElement.value = element.songId;
            mainFileName.innerHTML = element.songName;

        }
    })
})

//next song.
let nextSong = document.getElementById('nextSong');
nextSong.addEventListener('click', () => {
    let valueId = parseInt(audioElement.value) + 1;
    songs.forEach((element) => {
        if (element.songId == valueId) {
            makeAllPlays();
            masterPlay.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            gif.style.opacity = 1;
            Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
                if (element.childNodes[2].attributes.data_id.value == valueId) {
                    element.childNodes[4].firstElementChild.firstElementChild.classList.remove('fa-play-circle');
                    element.childNodes[4].firstElementChild.firstElementChild.classList.add('fa-pause-circle');
                }
            })

            audioElement.currentTime = 0;
            audioElement.src = element.filePath;
            audioElement.play();
            audioElement.value = element.songId;
            mainFileName.innerHTML = element.songName;

        }
    })
})


//handle paly/pause click.
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        songName.forEach((element) => {
            if (element.attributes[1].value == audioElement.value) {
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.remove('fa-play-circle');
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.add('fa-pause-circle');
            }
        });

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        songName.forEach((element) => {
            if (element.attributes[1].value == audioElement.value) {
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.remove('fa-pause-circle');
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.add('fa-play-circle');
            }
        });
    }

    if (myProgressBar.value == 100) {
        myProgressBar.value = 0;
    }
})

// Listen to Events.
audioElement.addEventListener('timeupdate', () => {
    //update seekbar.
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    if (myProgressBar.value == 100) {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        songName.forEach((element) => {
            if (element.attributes[1].value == audioElement.value) {
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.remove('fa-pause-circle');
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.add('fa-play-circle');
            }
        });
    }
})

//change progress bar to handle song.
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
    if (myProgressBar.value == 100) {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        songName.forEach((element) => {
            if (element.attributes[1].value == audioElement.value) {
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.remove('fa-pause-circle');
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.add('fa-play-circle');
            }
        });
    } else {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        songName.forEach((element) => {
            if (element.attributes[1].value == audioElement.value) {
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.remove('fa-play-circle');
                element.parentElement.childNodes[4].childNodes[1].firstElementChild.classList.add('fa-pause-circle');
            }
        });
    }
})