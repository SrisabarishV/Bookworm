import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const res = await fetch(`https://gutendex.com/books/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id]);

  if (loading) return <div className="text-center p-20 text-purple-600 text-xl">Loading...</div>;
  if (!book) return <div className="text-center p-20 text-red-500">Book not found.</div>;

  return (
    <div className="min-h-screen py-8 px-4 md:px-10">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 px-6 py-2 bg-white text-purple-700 font-semibold rounded-full shadow hover:bg-purple-100 transition"
      >
        ← Back to Library
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
        <div className="md:flex">
          {/* Cover Image */}
          <div className="md:w-1/3 bg-purple-50 p-8 flex justify-center items-center">
             <div className="shadow-2xl rounded-lg overflow-hidden rotate-1 transform hover:rotate-0 transition duration-500">
                <img src={book.formats["image/jpeg"]} alt={book.title} className="w-64 object-cover" />
             </div>
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-purple-600 mb-6 font-medium">
              by {book.authors.map(a => a.name).join(", ")}
            </p>

            <div className="space-y-6 text-gray-600 leading-relaxed">
               <p>{book.summaries?.[0] || "No summary available for this title."}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
               {book.subjects.slice(0, 4).map((sub, i) => (
                 <span key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                   {sub.split(" -- ")[0]}
                 </span>
               ))}
            </div>

            <div className="mt-10">
              <a 
                href={book.formats["text/html"] || book.formats["text/plain; charset=utf-8"]} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-linear-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
              >
                Read Now 
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;