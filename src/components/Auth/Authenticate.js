/* eslint-disable jsx-a11y/anchor-is-valid */
import Modal from "components/Modal";
import { useState } from "react";
import requestGuest from "utils/request-guest";
import { toast } from 'react-toastify';
import {useCurrentUser} from "contexts/UserContext"
import "./Logo.css";

export default function Authenticate({padding}) {
  const [show, setShow] = useState(1);
  const tab = (e) => {
    setShow(e);
  };

  return (
    <div>
      <div className={`${!padding && 'flex' }`}>
        <button className={`${padding && ' p-5 ' } text-white`} onClick={() => tab(2)}>
          Sign In
        </button>
        <p className="text-white text-xl mt-[-2px] mr-3 ml-3">|</p>
        <button className={`${padding && ' p-5 ' }  text-white`} onClick={() => tab(3)}>
          Sign Up
        </button>
      </div>
      {show === 2 && <Login tab={tab} />}
      {show === 3 && <Register tab={tab} />}

      {/* Sign Up */}
    </div>
  );
}

const Login = ({ tab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setRefresh} = useCurrentUser();

  function handleSubmit(e) {
    e.preventDefault();
    requestGuest({
      url: "/api/users/signin",
      method: "POST",
      data: JSON.stringify({
        email,
        password,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast.success('Đăng nhập thành công');
        await localStorage.setItem("token", res.accessToken);
        await localStorage.setItem("1", 1);
        await tab(1);
        window.location.reload();
        setRefresh(Date.now())
      }
    }).catch(e=>{
      if(e.response.data.error.status === 401){
        toast.error("Sai tài khoản hoặc mật khẩu vui lòng kiểm tra lại");
      }
    });
  }
  return (
    <Modal title={'Đăng nhập'} classContent={'lg:w-[30%] w-[80%]'} onClose={()=>tab(1)}>
      <form onSubmit={handleSubmit} className="w-[100%]">
      <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                </div>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Sign in</button>
            </div>
            <button className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                <div className="px-4 py-3">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                    </svg>
                </div>
                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
            </button>
      </form>
    </Modal>
  );
};

const Register = ({ tab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const {setRefresh} = useCurrentUser();

  const handleSubmit = (e) => {
    if (password !== checkPassword) {
      e.preventDefault();
      toast.warn("Mật khẩu nhập lại không đúng");
    } else {
      e.preventDefault();
      requestGuest({
        url: "/api/users/signup",
        method: "POST",
        data: JSON.stringify({
          email,
          password,
        }),
      }).then((data) => {
        if (data.status === 200) {
          toast.success("Đăng ký thành công");
          tab(1);
        } else if (data.status === 409) {
          toast.warning("User này đã tồn tại");
        } else {
          toast.error("Có lỗi, vui lòng thử lại");
        }
      }).catch(e=>{
        if(e.response.data.error.status === 409){
          toast.warning("User này đã tồn tại");
        }
      });
    }
  };
  return (
    <Modal title={'Đăng ký'} classContent={'lg:w-[30%] w-[80%]'} onClose={()=>tab(1)}>
      <form onSubmit={handleSubmit} className="w-[100%]">
      <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                </div>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">RePassword</label>
                </div>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"  onChange={(e) => setCheckPassword(e.target.value)}/>
            </div>
            <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Sign Up</button>
            </div>
            <div className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                <div className="px-4 py-3">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                    </svg>
                </div>
                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign up with Google</h1>
            </div>
      </form>
    </Modal>
  );
};
