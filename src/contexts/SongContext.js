import React, { useState } from 'react'
import DataSongs from 'data/songs.json';

export const Songs = React.createContext({})

export const SongProvider = ({children}) => {
    const [song, setSong] = useState(DataSongs[0]);

	const handleSetSong = (idSong) => {
		const song = DataSongs.find((song) => song.id === idSong);
		if (!song) setSong(DataSongs[0]);
		else setSong(song);
	};
    return (
        <Songs.Provider value={{ DataSongs, song, handleSetSong }}>
            {children}
        </Songs.Provider>
    );
}

export const useSongContext = () => React.useContext(Songs);