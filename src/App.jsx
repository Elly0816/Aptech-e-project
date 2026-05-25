import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import './global.css';
/*  import Header from './components/Header/header';  */

import { HomePage } from './pages/Homepage/HomePage';
import { Continents } from './pages/Continents/Continents';
import { Gallery } from './pages/Gallery/Gallery';
import { Saved } from './pages/Saved/Saved';
import { About } from './pages/About/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/continents" element={<Continents />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/about" element={<About />} />
        <Route path="/hello" element={<div>Hello World</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;