import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '/src/App.css'
import '/css/Custorom.css';
import TopContent from '/src/TopContent';
import Hello from './Hello';
import Sample from './Sample';
import User from '/src/api/User';
import UserView from '/src/api/UserView';
import Video from '/src/api/Video';

function App() {
	/*const [hello, setHello] = useState('');
  	const [error, setError] = useState('');*/
  	
	/*const [data, setData] = useState([]);*/
	
	/*useEffect(() => {
    	axios.get('/hello')
        .then((res) => {
          	setData(res.data);
        })
        .catch((err) => {
          	setError(err.message);
        });
  	}, []);*/
	
	/*useEffect(() => {
	   	fetch("/hello")
       	.then((res) => {
         	return res.json();
       	})
       	.then(function (result) {
           	setData(result);
     	})
	 },[]); */ 
	
	return (
    /*<div className="App">
		백엔드에서 받은 데이터: {hellohtt
		{error && <p>Error: {error}</p>}
    </div>*/
	
	<div>
		<TopContent />
		<BrowserRouter>
	      	<Routes>
				<Route path="/" element={<Hello />} />
				<Route path="/sample" element={<Sample />} /> 
				<Route path="/user" element={<User />} />
				<Route path="/user/view" element={<UserView />} />
				<Route path="/video" element={<Video />} />  
	    	</Routes>
		</BrowserRouter>
	</div> 
  );
}

export default App;
