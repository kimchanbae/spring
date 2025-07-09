import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Hello from './Hello';
import Sample from './Sample';
import User from './User';

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
      	<BrowserRouter>
          	<Routes>
		  		<Route path="/" element={<Hello />} />
				<Route path="/hello" element={<Hello />} />  
            	<Route path="/sample" element={<Sample />}/>
        	</Routes>
      	</BrowserRouter>
	</div>
  );
}

export default App;
