/* eslint-disable jsx-a11y/alt-text */
import { usePlayContext } from "contexts/PlayContext";
import { useCurrentUser } from "contexts/UserContext";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import request from "utils/request";

const MyPlaylist = () => {
  const {currentUser} = useCurrentUser();
  const {songs, setSongs, playing, PlaySong, ClosePlay, PlayList, NextSong, PreviousSong} = usePlayContext();

  const [data, setData] = useState([]);
  const [render, setRender] = useState(0)

  useEffect(()=> {
    request({
      url: '/api/update/get-list-music',
      params: {
        userDetail: currentUser
      }
    }).then(res=>{
      console.log(res);
      if(res.status === 200){
        setData(res.list_music)
      }else{
        toast.error("Something went wrong!")
      }
    })
  },[render]);

  const RemoveSong = (id) => {
    request({
      url: `/api/update/delete-music/${id}`,
        method: 'DELETE'
    }).then(res=>{
      if(res.status === 200){
        setRender(Date.now())
        toast.success('Xóa thành công!');
      }else{
        toast.error("Something went wrong!")
      }
    })
  }

  return (
    <div className="w-full ">
      <div className="flex lg:w-8/12 mt-5 w-full  shadow-md rounded-lg overflow-hidden mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex flex-col p-5">
            <div className="border-b pb-1 flex justify-between items-center mb-2">
              <span className=" text-base font-semibold uppercase text-gray-700">
                {" "}
                Play list
              </span>
              <button
              onClick={()=>{
                PlayList(data)
              }}
              >
                Play all
              </button>
            </div>
            {data.length <= 0 && <div>Chưa có bài hát nào</div>}
            {data.length > 0 &&
              data.map((item, index) => (
                <div onClick={()=>{
                  PlaySong(item)
                  setSongs(data)
                }} key={index} className="flex justify-between items-center border-b py-3 cursor-pointer hover:shadow-md px-2 ">
                  <div className="flex">
                    <img
                      className="w-10 h-10 object-cover rounded-lg"
                      alt="User avatar"
                      src={item.links.images[0].url}
                    />
                    <div className="flex flex-col px-2 w-full">
                      <span className={`text-sm ${playing._id === item._id ? 'text-green-500' : 'text-red-500 ' } capitalize font-semibold pt-1`}>
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-500 uppercase font-medium ">
                        - {item.author}
                      </span>
                    </div>
                  </div>
                  <button onClick={(e)=>{
                    e.stopPropagation();
                    RemoveSong(item._id)
                  }}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_632_10823)">
                        <path
                          d="M25 7.5C25.3186 7.50035 25.625 7.62235 25.8567 7.84106C26.0884 8.05977 26.2278 8.35869 26.2465 8.67674C26.2651 8.9948 26.1617 9.30797 25.9572 9.55229C25.7527 9.79661 25.4626 9.95362 25.1463 9.99125L25 10H24.8988L23.75 23.75C23.7501 24.7065 23.3846 25.6269 22.7284 26.3228C22.0722 27.0188 21.1749 27.4376 20.22 27.4938L20 27.5H10C8.0025 27.5 6.37 25.9388 6.26 24.0625L6.25375 23.8538L5.1 10H5C4.6814 9.99965 4.37496 9.87765 4.14329 9.65894C3.91162 9.44023 3.77221 9.14131 3.75354 8.82326C3.73487 8.5052 3.83835 8.19203 4.04283 7.94771C4.24732 7.70339 4.53738 7.54638 4.85375 7.50875L5 7.5H25ZM13.1388 13.925C12.8769 13.7691 12.567 13.7143 12.2675 13.7708C11.968 13.8273 11.6995 13.9913 11.5124 14.232C11.3254 14.4726 11.2327 14.7733 11.2518 15.0775C11.2709 15.3817 11.4005 15.6684 11.6163 15.8837L13.2313 17.5L11.6163 19.1163L11.5125 19.2338C11.3182 19.485 11.2269 19.8008 11.257 20.1169C11.2871 20.4331 11.4364 20.7259 11.6747 20.9359C11.9129 21.146 12.2221 21.2575 12.5395 21.2478C12.857 21.2381 13.1588 21.1079 13.3838 20.8838L15 19.2687L16.6163 20.8838L16.7338 20.9875C16.985 21.1818 17.3008 21.2731 17.6169 21.243C17.9331 21.2129 18.2259 21.0636 18.4359 20.8253C18.646 20.5871 18.7575 20.2779 18.7478 19.9605C18.7381 19.643 18.6079 19.3412 18.3838 19.1163L16.7688 17.5L18.3838 15.8837L18.4875 15.7662C18.6818 15.515 18.7731 15.1992 18.743 14.8831C18.7129 14.5669 18.5636 14.2741 18.3254 14.0641C18.0871 13.854 17.7779 13.7425 17.4605 13.7522C17.143 13.7619 16.8412 13.8921 16.6163 14.1163L15 15.7313L13.3838 14.1163L13.2663 14.0125L13.1388 13.925ZM17.5 2.5C18.163 2.5 18.7989 2.76339 19.2678 3.23223C19.7366 3.70107 20 4.33696 20 5C19.9996 5.3186 19.8777 5.62504 19.6589 5.85671C19.4402 6.08838 19.1413 6.22779 18.8233 6.24646C18.5052 6.26514 18.192 6.16166 17.9477 5.95717C17.7034 5.75268 17.5464 5.46262 17.5088 5.14625L17.5 5H12.5L12.4913 5.14625C12.4536 5.46262 12.2966 5.75268 12.0523 5.95717C11.808 6.16166 11.4948 6.26514 11.1767 6.24646C10.8587 6.22779 10.5598 6.08838 10.3411 5.85671C10.1224 5.62504 10.0004 5.3186 10 5C9.9998 4.36928 10.238 3.76179 10.6669 3.29931C11.0957 2.83684 11.6836 2.55355 12.3125 2.50625L12.5 2.5H17.5Z"
                          fill="#323232"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_632_10823">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylist;
