import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import './global.css';
/*  import Header from './components/Header/header';  */

import { About } from './pages/About/About';
import { Continents } from './pages/Continents/Continents';
import { Gallery } from './pages/Gallery/Gallery';
import { HomePage } from './pages/Homepage/HomePage';
import { Monument } from './pages/Monument/Monument';
import { Saved } from './pages/Saved/Saved';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/continents" element={<Continents />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/about" element={<About />} />
        <Route path="/monument/:id" element={<Monument />} />
        <Route path="/hello" element={<div>Hello World</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
