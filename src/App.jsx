import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './tailwind/settings/tailwindSettings.css';

import ScrollToTop from './components/ScrollOnTop/ScrollOnTop.jsx';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Course from './pages/Course/Course.jsx';
import InformativeCourse from './pages/Course/InformativeCourse.jsx';
import Partners from './pages/Partners/Partners.jsx';
import Transparency from './pages/Transparency/Transparency.jsx';
import Footer from './components/Footer/Footer.jsx';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<Course />} />
            <Route path="/cursos/:id" element={<InformativeCourse />} />
            <Route path="/parceiros" element={<Partners />} />
            <Route path="/transparencia" element={<Transparency />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </Router>
    </React.Fragment>
  );
};

export default App;
