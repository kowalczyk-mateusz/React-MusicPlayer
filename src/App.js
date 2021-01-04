import React, {useState, useRef} from 'react';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from "./components/Nav";
import './styles/app.scss';
import data from "./util";

function App() {
  const autoPlayHandler = () =>{
    if(isPlaying){
      audioRef.current.play();
    }
  }
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration
    })
  }
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false);
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player songInfo={songInfo} setSongInfo={setSongInfo} currentSong={currentSong} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <audio onLoadedData={autoPlayHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

    </div>
  );
}

export default App;
