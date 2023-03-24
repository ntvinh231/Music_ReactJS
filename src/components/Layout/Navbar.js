/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Authenticate from "components/Auth/Authenticate";
import { useCurrentUser } from "contexts/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [openBar, setOpenBar] = useState(false);
  return (
    <>
      <section className="fixed h-20 overflow-hidden z-[99] mx-auto">
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <Link to={"/"}>
              <div className="lg:text-3xl text-xl font-bold font-heading">
                Music ReactJS
              </div>
            </Link>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <Link to={"/"}>
                <li>
                  <div className="hover:text-gray-200">Home</div>
                </li>
              </Link>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Catagory
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="#">
                  Collections
                </a>
              </li>
            </ul>
            {/* < />!-- Header Icons --> */}
            <div className="hidden xl:flex space-x-5 items-center">
              {/* < />!-- Sign In / Register      --> */}
              {!currentUser && <Authenticate />}
              {/* Logout */}
              {currentUser && (
                <>
                  <Link to={"/my-playlist"} className="hover:text-gray-200">
                    <button className="flex gap-x-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <div>My playlist</div>
                    </button>
                  </Link>
                  <div>{currentUser.email}</div>

                  <button
                    onClick={() => {
                      setCurrentUser();
                      localStorage.removeItem("token");
                    }}
                    className="text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          {/* < />!-- Responsive navbar --> */}
          <button
            className="navbar-burger self-center mr-12 xl:hidden"
            onClick={() => {
              setOpenBar(!openBar);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </section>
      {openBar && (
        <div className="xl:hidden fixed top-20 -mt-2 bg-slate-800 w-full text-white border-b">
          {!currentUser && <Authenticate padding={true} />}
          {/* Logout */}
          {currentUser && (
            <>
              <Link
                to={"/my-playlist"}
                className="hover:text-gray-200"
                href="#"
              >
                <button className="flex gap-x-2 p-5 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <div>My playlist</div>
                </button>
              </Link>
              <div className="p-5">{currentUser.email}</div>

              <button
                onClick={() => {
                  setCurrentUser();
                  localStorage.removeItem("token");
                }}
                className="text-white p-5"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
