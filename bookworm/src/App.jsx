import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import BookDetails from './pages/Bookdetails';
import BookReader from './pages/BookReader';

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is outside Routes so it stays on every page */}
      <Navbar />
      <Routes>
       <Route path="/" element={<><Home /></>} />
        <Route path="/book/:id" element={<><BookDetails /></>} />
        <Route path="/read/:id" element={<BookReader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;