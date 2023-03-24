import React from 'react';

export default function UserHome({ userData }) {
	const logOut = () => {
		window.localStorage.clear();
		window.location.href = './sign-in';
	};
	return (
		<div
			className={window.localStorage.getItem('token') ? 'text-white absolute top-0 right-5 flex mt-[-10px]' : 'hidden'}
		>
			<h1>{window.localStorage.getItem('email')}</h1>
			<br />
			<p className="text-white text-xl mt-[-2px] mr-3 ml-3">|</p>
			<button onClick={logOut} className="btn btn-primary">
				Log Out
			</button>
		</div>
	);
}
