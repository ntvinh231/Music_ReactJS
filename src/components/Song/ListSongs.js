import React, { useEffect, useState } from 'react';
import { useSongContext } from 'contexts/SongContext';
import { useCurrentUser } from 'contexts/UserContext';
import { toast } from 'react-toastify';
import request from 'utils/request';
import { usePlayContext } from 'contexts/PlayContext';
export default function ListSongs() {
	const { DataSongs, handleSetSong } = useSongContext();
  const {songs, setSongs, playing, PlaySong, ClosePlay, PlayList, NextSong, PreviousSong} = usePlayContext();

  const {currentUser} = useCurrentUser();

	const handlePlaySong = (song) => {
		PlaySong(song)
    setSongs(DataSongs)
	};
	return (
    <div className="row-span-4 mt-0 overflow-y-scroll md:border-t-4">
      <table className="table-auto w-full">
        <thead className="text-white h-12">
          <tr>
            <th className="w-[5%]"></th>
            <th className="w-[5%]">No.</th>
            <th className="text-left">Title</th>
            <th className="w-[10%]">Author</th>
            <th className="w-[10%]">
              <i className="fa fa-download"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {DataSongs.map((song, index) => (
            <tr
              key={index}
              className={`md:cursor-pointer bg-slate-800 h-12 text-white hover:bg-gray-600`}
              onClick={() => handlePlaySong(song)}
            >
              <td className="text-center group">
                <button onClick={(e)=> {
                  e.stopPropagation();
                  if(!currentUser){
                    toast.warn('Vui lòng đăng nhập')
                    return;
                  }
                  request({
                    url: '/api/update/add-music',
                    method: 'post',
                    data: song
                  }).then(res=>{
                    if(res.status === 200){
                      toast.success('Thêm bài hát vào danh sách yêu thích thành công')
                    }  
                  }).catch(e=>{
                    if(e.response.data.error.status === 409){
                      toast.warn('Bài hát đã có trong danh sách yêu thích')
                    }else{
                      toast.error('Có lỗi xảy ra')
                    }
                  })
                }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#a83f39"
                  >
                    <path
                      className="group-hover:fill-[#a83f39] group-hover:animate-pulse transition-all"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </td>
              <td className="text-center">{index + 1}</td>
              <td>{song.name}</td>
              <td className="text-center">{song.author}</td>
              <td className="text-center">
                <a href={song.url}>
                  <i className="fa fa-download"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
