import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import BookDetails from './pages/Bookdetails';
import BookReader from './pages/BookReader';

function App() {
  return (
   <BrowserRouter basename="/Bookworm">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;