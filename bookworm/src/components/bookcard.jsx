import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Link 
      to={`/book/${book.id}`} 
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-purple-100"
    >
      {/* Image Container - Fixed Aspect Ratio (2:3) */}
      <div className="w-full aspect-2/2 bg-gray-200 relative overflow-hidden">
        <img 
          src={book.formats["image/jpeg"]} 
          alt={book.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white text-sm font-medium">View Details →</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight mb-1" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-purple-600 font-medium">
          {book.authors[0]?.name || "Unknown Author"}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;