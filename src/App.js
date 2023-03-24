import Navbar from "components/Layout/Navbar";
import Play from "components/Layout/Play";
import NotFound from "components/NotFound";
import { PlayProvider, usePlayContext } from "contexts/PlayContext";
import { SongProvider } from "contexts/SongContext";
import { useCurrentUser, UserProvider } from "contexts/UserContext";
import HomePage from "pages/Home";
import MyPlaylist from "pages/MyPlaylist";
import UserDataPage from "pages/UserData";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const AppRoute = () => {
  const {currentUser} = useCurrentUser();

  // logged in
  if(currentUser){
    return (
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-data" element={<UserDataPage />} />
          <Route path="/my-playlist" element={<MyPlaylist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
  // guest
  return (
    <div className="pt-20">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const PlayingWrapper = () => {
  const {playing} = usePlayContext();
  return (
    <>
      {playing && (
        <div className="fixed w-full bottom-0 left-0 bg-slate-900 lg:h-[15%]  overflow-hidden">
          <Play />
        </div>
      )}
    </>
  );
}
function App() {
  return (
    <PlayProvider>
      <UserProvider>
        <SongProvider>
          <ToastContainer />
          <BrowserRouter>
            <div className="relative">
              <Navbar />
              <AppRoute />
              <PlayingWrapper/>
            </div>
          </BrowserRouter>
        </SongProvider>
      </UserProvider>
    </PlayProvider>
  );
}

export default App;
