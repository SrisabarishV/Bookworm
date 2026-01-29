import { useState, useEffect } from "react";
import BookCard from "../components/bookcard";

// Popular categories to filter by
const CATEGORIES = [
  "Fiction", "Mystery", "Thriller", "Romance", "Fantasy", 
  "Science Fiction", "History", "Horror", "Adventure"
];

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Unified fetch function
  const fetchBooks = async (query = "", topic = "") => {
    setLoading(true);
    try {
      let url = "https://gutendex.com/books/";
      
      // Build URL based on what we are looking for
      if (query) {
        url += `?search=${encodeURIComponent(query)}`;
      } else if (topic) {
        url += `?topic=${encodeURIComponent(topic)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.results);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedCategory(""); // Clear category if searching
    fetchBooks(search, "");
  };

  // Handle Category Click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch(""); // Clear search if clicking category
    fetchBooks("", category);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-purple-700 py-12 px-4 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">Find Your Next Adventure</h1>
        <p className="text-purple-200 mb-8 text-lg">Browse thousands of free public domain books.</p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
          <input 
            type="text" 
            placeholder="Search by title or author..." 
            className="bg-purple-200 flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-xl transition transform hover:scale-105">
            Search
          </button>
        </form>
      </div>

      {/* Category Pills */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button 
             onClick={() => { setSelectedCategory(""); fetchBooks(); }}
             className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
               selectedCategory === "" 
               ? "bg-purple-600 text-white shadow-md" 
               : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-100"
             }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === cat 
                ? "bg-purple-600 text-white shadow-md" 
                : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-6xl mx-auto px-7 pb-16">
        {loading ? (
          <div className="text-center text-purple-600 text-xl mt-10 animate-pulse">Loading Library...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div> 
        )}
      </div>
    </div>
  );
}

export default Home;