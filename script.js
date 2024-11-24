console.log("Lets write javascrite");

let currentSong=new Audio();

function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds<0){
        return "Invalid Input";
    }

    const minutes = Math.floor(seconds/60)
    const remainingSeconds = Math.floor(seconds%60)

    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/spotifyproject/index1.html")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith("mp3")) {
            songs.push(element.href.split("/spotifyproject/")[1])
        }
    }
    return songs
}
const playMusic = (track,pause=false) => {    
    // let audio = new Audio("http://127.0.0.1:5500/spotifyproject/ADELE%20-%20Skyfall%20(lyrics)%20(128%20%20kbps).mp3")  
    // currentSong.src="http://127.0.0.1:5500/spotifyproject/ADELE%20-%20Skyfall%20(lyrics)%20(128%20%20kbps).mp3" 
    currentSong.src="ADELE%20-%20Skyfall%20(lyrics)%20(128%20%20kbps).mp3" 
    if(!pause){
        currentSong.play()
        play.src="pause.svg" 
    }
    document.querySelector(".songname").innerHTML=decodeURI(track)
    let ab=document.querySelector(".songtime").innerHTML="00:00/00:00"
}
async function main() {
    let songs = await getSongs()
    playMusic(songs[0],true)

    let songsUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songsUL.innerHTML = songsUL.innerHTML + `<li class="lisst flex">
        <div class="conin flex" >
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", "")}</div>
                <div>Ankit Amg</div>
            </div>
        </div>
        <div class="playnow flex">
            <div>Play now</div>
            <img class="invert" src="play.svg" alt="">
        </div>
    </li>
        </li>`
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element=>{
            playMusic(e.querySelector(".info").firstElementChild.innerHTML)
       
        })
    })

    play.addEventListener("click",()=>{
        if (currentSong.paused) {
            currentSong.play()
            play.src="pause.svg" 
        }else{
            currentSong.pause()
            play.src="play.svg"
        }
    })

    currentSong.addEventListener("timeupdate",()=>
    {
        document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
    })

    document.querySelector(".seek").addEventListener("click",(e)=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent+"%";
        currentSong.currentTime=((currentSong.duration)*percent)/100
    })

    document.querySelector(".ham").addEventListener("click",()=>{
        document.querySelector(".left-box").style.left="0"
    })

    document.querySelector(".cross").addEventListener("click",()=>{
        document.querySelector(".left-box").style.left="-100%"
    })
}         
main()