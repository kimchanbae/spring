import React from 'react';
import '/src/App.css'
import '/css/Custorom.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Hello from './Hello';
import Sample from './Sample';
import User from '/src/api/User';
import UserView from '/src/api/UserView';
import Video from '/src/api/Video';

function App() {
	return (
		<div className='App'>
			<nav>
				<div><ul className="top-ul"><li>	
					<Link to="/" className='nav-link'>홈화면</Link>
					<Link to="/hello" className='nav-link'>hello</Link>
					<Link to="/sample" className='nav-link'>샘플</Link>
					<Link to="/user" className='nav-link'>사용자정보</Link>
					<Link to="/video" className='nav-link'>영화정보</Link>
				</li></ul></div>
			</nav>
			
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hello" element={<Hello />} />
				<Route path="/sample" element={<Sample />} />  
				<Route path="/user" element={<User />} />
				<Route path="/user/view" element={<UserView />} />
				<Route path="/video" element={<Video />} />  
			</Routes>
		</div> 
  	);
}

export default App;
