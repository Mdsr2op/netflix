import logo from './logo.svg';
import './App.scss';
import Home from "./Components/Home.jsx"
import Header from "./Components/Header/Header.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
       <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
