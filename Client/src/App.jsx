import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './pages/Register/Index';
import Login from './pages/Login';
import Home from './pages/Home';
import '@ant-design/v5-patch-for-react-19';
import MovieDetail from './pages/MovieDetail.jsx';
import BookShow from './pages/BookShow/index.jsx';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/movie/:movieId" element={<MovieDetail/>}/>
        <Route path='/book-show/:showId' element={<BookShow/>} />
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
