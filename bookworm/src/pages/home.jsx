import { useState, useEffect } from "react";
import BookCard from "../components/bookcard";

// 📚 Organized Category Data
const CATEGORY_DATA = {
  "Literature": [
    "Adventure", "American Literature", "British Literature", "French Literature", 
    "German Literature", "Russian Literature", "Classics of Literature", 
    "Biographies", "Novels", "Short Stories", "Poetry", "Plays", 
    "Romance", "Science Fiction", "Fantasy", "Mystery", 
    "Mythology", "Humor", "Children"
  ],
  "Science & Tech": [
    "Science", "Technology", "Engineering", "Mathematics", 
    "Physics", "Chemistry", "Biology", "Geology"
  ],
  "History": [
    "History", "Ancient History", "Medieval", "Modern History", 
    "Military History", "American History", "European History"
  ],
  "Society & Culture": [
    "Social Science", "Economics", "Law", "Psychology", 
    "Politics", "Philosophy", "Religion", "Education"
  ],
  "Lifestyle": [
    "Cooking", "Travel", "Art", "Music", "Nature", "Health"
  ]
};

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // 📄 Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // <--- NEW: Track total pages
  const [totalBooks, setTotalBooks] = useState(0); // <--- NEW: Track total count

  // Unified fetch function
  const fetchBooks = async (query = "", topic = "", pageNum = 1) => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      let url = `https://gutendex.com/books/?page=${pageNum}`;
      
      if (query) {
        url += `&search=${encodeURIComponent(query)}`;
      } 
      if (topic) {
        url += `&topic=${encodeURIComponent(topic)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      setBooks(data.results);
      setTotalBooks(data.count); // Save total books count
      // Gutendex returns 32 items per page by default
      setTotalPages(Math.ceil(data.count / 32)); 
      
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("", "", 1);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBooks(search, selectedCategory, 1);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSearch(""); 
    setPage(1);
    fetchBooks("", category, 1);
  };

  const handlePageChange = (direction) => {
    const newPage = direction === "next" ? page + 1 : page - 1;
    if (newPage < 1 || newPage > totalPages) return; // Prevent going past limits
    setPage(newPage);
    fetchBooks(search, selectedCategory, newPage);
  };

  return (
    <div className="min-h-screen pb-10">
      {/* Hero Section */}
      <div className="bg-purple-700 py-10 px-4 text-center text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
          Find Your Next Adventure
        </h1>
        <p className="text-purple-200 mb-8 text-lg">
          Browse thousands of free public domain books.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center">
          <input 
            type="text" 
            placeholder="Search title or author..." 
            className="bg-purple-100 w-full md:w-auto flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select 
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-purple-100 w-full md:w-auto px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-xl cursor-pointer"
          >
            <option value="">All Categories</option>
            {Object.entries(CATEGORY_DATA).map(([group, topics]) => (
              <optgroup label={group} key={group}>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <button type="submit" className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-xl transition transform hover:scale-105">
            Search
          </button>
        </form>
      </div>

      {/* Results Info - Now shows Total Pages */}
      <div className="max-w-7xl mx-auto px-6 pt-8 text-gray-500 text-sm flex justify-between items-center font-medium">
        <span>
          {totalBooks.toLocaleString()} books found
          {selectedCategory && ` in ${selectedCategory}`}
        </span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          Page {page} of {totalPages}
        </span>
          <button 
                  onClick={() => handlePageChange("next")}
                  disabled={page >= totalPages}
                  className={`px-6 py-3 rounded-full font-bold shadow transition ${
                    page >= totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  Next →
                </button>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
            <p className="text-purple-600 mt-4 text-lg font-medium">Loading Page {page}...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {books.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No books found. Try a different search or category.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-12 items-center">
                <button 
                  onClick={() => handlePageChange("prev")}
                  disabled={page === 1}
                  className={`px-6 py-3 rounded-full font-bold shadow transition ${
                    page === 1 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-white text-purple-700 hover:bg-purple-100 border border-purple-200"
                  }`}
                >
                  ← Previous
                </button>
                
                <span className="text-gray-600 font-mono text-lg">
                  {page} / {totalPages}
                </span>

                <button 
                  onClick={() => handlePageChange("next")}
                  disabled={page >= totalPages}
                  className={`px-6 py-3 rounded-full font-bold shadow transition ${
                    page >= totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;