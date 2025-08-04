import React from 'react';
import '/src/App.css'
import './common/css/Custorom.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Hello from './Hello';
import Sample from './Sample';
import User from './api/user/User';
import UserView from './api/user/UserView';
import Video from './api/video/Video';

function App() {
	return (
		<div className='App'>
			<nav>
				<div>
					<ul className="top-ul-list">
						<li>	
						<Link to="/" className='nav-link'>홈화면</Link>
						<Link to="/hello" className='nav-link'>hello</Link>
						<Link to="/sample" className='nav-link'>샘플</Link>
						<Link to="/user" className='nav-link'>사용자정보</Link>
						<Link to="/video" className='nav-link'>영화정보</Link>	
						</li>
					</ul>
				</div>
			</nav>
			
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hello" element={<Hello />} />
				<Route path="/user" element={<User />} />
				<Route path="/user/view" element={<UserView />} />
				<Route path="/video" element={<Video />} />  
				<Route path="/sample" element={<Sample />} />  
			</Routes>
		</div> 
  	);
}

export default App;
