import React from 'react';

const Navigation = ({onSigninClick, isSignedIn}) =>{
	return(
			isSignedIn?
			<nav style={{display:'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onSigninClick('signin')} className="f3 link dim black underline pa3 pointer">Logout</p>
			</nav>
			:
			<nav style={{display:'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onSigninClick('signin')} className="f3 link dim black underline pa3 pointer">Signin</p>
				<p onClick={() => onSigninClick('register')} className="f3 link dim black underline pa3 pointer">Register</p>
			</nav>

		);
};

export default Navigation;