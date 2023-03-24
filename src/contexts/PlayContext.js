import React, { useState } from 'react'


export const PlayContext = React.createContext({})

export const PlayProvider = ({children}) => {
    const [songs, setSongs] = useState([]);
    const [playing, setPlaying] = useState();

    const PlaySong = (song) => {
        setPlaying(song);
        setSongs([songs]);
    }

    const ClosePlay = () => {
        setPlaying();
        setSongs([])
    }

    const PlayList = (list) => {
        setSongs(list);
        setPlaying(list[0]);
    }

    const NextSong = () => {
        // find Index in playlist
        const currentIndex = songs.findIndex(item => item._id === playing._id);
        if(currentIndex === - 1 ) return;
        if(songs.length - 1 > currentIndex){
            setPlaying(songs[currentIndex + 1])
        }else{
            setPlaying(songs[0]);
        }
    }

    const PreviousSong = () => {
        // find Index in playlist
        const currentIndex = songs.findIndex(item => item._id === playing._id);
        if(currentIndex === - 1 ) return;
        if(currentIndex === 0){
            setPlaying(songs.length > 0 ? songs[songs.length - 1] : songs[0]);
        }else{
            setPlaying(songs[currentIndex - 1]);
        }
    }

    return (
        <PlayContext.Provider value={{ songs, setSongs, playing, PlaySong, ClosePlay, PlayList, NextSong, PreviousSong }}>
            {children}
        </PlayContext.Provider>
    );
}

export const usePlayContext = () => React.useContext(PlayContext);