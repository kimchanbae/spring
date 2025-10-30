import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import Hello from './Hello';
import Sample from './Sample';
import User from './components/User';
// import UserView from './api/user/UserView';
// import Video from './api/video/Video';
// import File from './common/file/File';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
        <div className='grid grid-cols-6 md:grid-cols-8 gap-4 text-gray-600'>
          <Link to="/">홈화면</Link>
          <Link to="/hello">hello</Link>
          <Link to="/sample">샘플</Link>
          <Link to="/user">사용자정보</Link>
          {/* <Link to="/video">영화정보</Link>
          <Link to="/file">파일정보</Link> */}
				</div>
        {/* <div className='p8 bg-gray-100'>
					  <h1 className='text-2xl font-bold text-blue-600'>tailwindcss 적용 테스트</h1>
					  <button className='mt-4 px-4 py-2 bg-blue-500 text-black round hover:bg-blue-600 bg-blue-500'>클릭</button>
				</div> */}
      </div>

      <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hello" element={<Hello />} />
				<Route path="/sample" element={<Sample />} />
				<Route path="/user" element={<User />} />
				{/* <Route path="/user/view" element={<UserView />} />
				<Route path="/video" element={<Video />} />  
				<Route path="/file" element={<File />} />   */}
			</Routes>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
