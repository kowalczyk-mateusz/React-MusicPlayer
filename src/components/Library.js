import React from 'react';
import LibrarySong from './LibrarySong';


const Library = ({songs, setCurrentSong, setSongs, audioRef, isPlaying, libraryStatus, setLibraryStatus}) => {

  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
        <h2>Library</h2>
        <div className="library-songs">
            {songs.map((song) =>(
                <LibrarySong isPlaying={isPlaying} id={song.id} song={song} setCurrentSong={setCurrentSong} key={song.id}
                audioRef={audioRef} k songs={songs} setSongs={setSongs} />
            ))}
      </div>
    </div>
  );
}

export default Library;
 