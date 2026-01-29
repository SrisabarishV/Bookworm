import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookReader = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`https://gutendex.com/books/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <div className="text-center p-20 text-purple-600">Loading Reader...</div>;
  if (!book) return <div className="text-center p-20 text-red-500">Book not found.</div>;

  // Determine the best format to use (HTML is best, then plain text)
  const bookUrl = book.formats["text/html"] || book.formats["text/plain; charset=utf-8"];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Reader Header */}
      <div className="bg-purple-900 text-white p-4 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-4">
          <Link 
            to={`/book/${id}`} 
            className="text-sm bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded transition"
          >
            ← Exit Reader
          </Link>
          <h1 className="font-bold truncate max-w-md hidden sm:block">
            Reading: {book.title}
          </h1>
        </div>
        
        {/* Fallback Button in case Iframe is blocked */}
        <a 
          href={bookUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded font-bold transition"
        >
          Open in New Tab ↗
        </a>
      </div>

      {/* The Book Content */}
      <div className="grow w-full relative">
        {bookUrl ? (
          <iframe 
            src={bookUrl} 
            title={book.title}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin" // Security best practice
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No readable format available for this book.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReader;