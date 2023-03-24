import { usePlayContext } from 'contexts/PlayContext';
import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Play = () => {
  const {songs, setSongs, playing, PlaySong, ClosePlay, PlayList, NextSong, PreviousSong} = usePlayContext();

  return (
    <div className="h-full lg:flex">
      <div className="lg:w-[20%] w-full flex p-5 border-b border-[#413d3d93]">
        <img
          className="w-20 h-20 object-cover"
          alt="User avatar"
          src={playing.links.images[0].url}
        />
        <div className="flex justify-between flex-col px-2 w-full">
          <span className="text-xs text-gray-300 uppercase font-medium ">
            now playing
          </span>
          <div className="flex flex-col">
            <span className="text-sm text-red-500 capitalize font-semibold pt-1">
              {playing.name}
            </span>
            <span className="text-xs text-gray-500 uppercase font-medium ">
              - {playing.author}
            </span>
          </div>
        </div>
      </div>
      <div className='lg:w-[80%] w-full lg:px-10'>
        <AudioPlayer
          className="player-music"
          src={playing.url}
          layout="stacked-reverse"
          showSkipControls={true}
          showJumpControls={false}
          onClickNext={NextSong}
          onClickPrevious={PreviousSong}
        />
      </div>
    </div>
  );
}

export default Play