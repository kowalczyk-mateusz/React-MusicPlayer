import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';
const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, setCurrentSong, setSongs}) => {

    useEffect(()=>{
      const newSongs = songs.map((song) =>{
        if(song.id === currentSong.id){
          return{
            ...song,
            active: true,
          };
        }
          else{
            return{
    
            
          ...song,
          active: false,
        };}
      });
      setSongs(newSongs);
    },[currentSong]);


  const playSongHandler = () =>{
    if(isPlaying)
    {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);

    }
    else
    {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
    
  }


  const getTime = (time) =>{
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const dragHandler = (e) =>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value});

  }

  const skipTrackHandler = async (direction) =>{

    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if(direction === 'skip-forward'){
     await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }

    if(direction === 'skip-back'){
      if((currentIndex -1) % songs.length === -1){
        await setCurrentSong(songs[songs.length -1]);
        if(isPlaying) audioRef.current.play()
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1)% songs.length]);
    }
    if(isPlaying) audioRef.current.play()
  };


    const trackAnim = {
      transform: `translateX(${songInfo.animationPercentage}%)`
    }

  return (
    <div className="player">
      <div className="time-controler">
      <p>{getTime(songInfo.currentTime)}</p>
      <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
          <input min={0} max={songInfo.duration || 0.00} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
            <div style={trackAnim} className="animate-track"></div>
            </div>
          <p>{getTime(songInfo.duration || 0.00 )}</p>

      </div>

      <div className="play-control">
          <FontAwesomeIcon className="skip-back" onClick={()=> skipTrackHandler('skip-back')}icon={faAngleLeft} size="2x"/>
          <FontAwesomeIcon onClick={playSongHandler} className="play" icon={isPlaying ? faPause : faPlay} size="2x"/>
          <FontAwesomeIcon className="skip-forward" onClick={() => skipTrackHandler('skip-forward')} icon={faAngleRight} size="2x"/>


      
      </div>
    </div>
  );
};

export default Player;

