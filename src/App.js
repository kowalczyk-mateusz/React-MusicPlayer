import React, {useState, useRef} from 'react';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from "./components/Nav";
import './styles/app.scss';
import data from "./data";

function App() {
  const autoPlayHandler = () =>{
    if(isPlaying){
      audioRef.current.play();
    }
  }
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    
    const roundedCurrent = Math.round(current);
    const rounderDuration = Math.round(duration);
    const animate = Math.round((roundedCurrent / rounderDuration) * 100 );
   

    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animate,
    });

  }
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercetage: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false);
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const songEndHandler = async () =>{

    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await  setCurrentSong(songs[(currentIndex + 1) % songs.length]);
       if(isPlaying) audioRef.current.play();
  }
  return (
    <div className={`App ${libraryStatus ? `library-active` : ``}`}>
      <Nav libraryStatus={libraryStatus}
       setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player songInfo={songInfo} 
      setSongInfo={setSongInfo}
       currentSong={currentSong} 
       audioRef={audioRef} 
       isPlaying={isPlaying} 
       setIsPlaying={setIsPlaying} 
       songs={songs}
       setCurrentSong={setCurrentSong}
       setSongs={setSongs}
       />

      <Library isPlaying={isPlaying}
       audioRef={audioRef} songs={songs} 
       setCurrentSong={setCurrentSong} 
       setSongs={setSongs} 
       libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}/>

      <audio onLoadedData={autoPlayHandler}
       onLoadedMetadata={timeUpdateHandler} 
       onTimeUpdate={timeUpdateHandler} 
       ref={audioRef} 
       onEnded={songEndHandler}
       src={currentSong.audio}></audio>

    </div>
  );
}

export default App;
