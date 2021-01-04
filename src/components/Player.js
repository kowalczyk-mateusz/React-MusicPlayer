import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo}) => {


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

  return (
    <div className="player">
      <div className="time-controler">
      <p>{getTime(songInfo.currentTime)}</p>
          <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
          <p>{getTime(songInfo.duration) || 0}</p>
      </div>

      <div className="play-control">
          <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x"/>
          <FontAwesomeIcon onClick={playSongHandler} className="play" icon={isPlaying ? faPause : faPlay} size="2x"/>
          <FontAwesomeIcon className="skip-forward" icon={faAngleRight} size="2x"/>


      
      </div>
    </div>
  );
};

export default Player;

