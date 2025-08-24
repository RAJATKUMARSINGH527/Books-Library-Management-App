import { useBooks } from "../contexts/BooksContext";
import BookCard from "../components/BookCard";

export default function Home() {
  const { books, loading } = useBooks();
  const booksList = Array.isArray(books) ? books : [];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-purple-700 dark:text-yellow-300 mb-12 text-center drop-shadow-lg transition-colors">
        Explore Our Magical Book Collection
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-28">
          <p className="text-pink-600 dark:text-yellow-400 text-3xl font-extrabold animate-pulse">
            Loading books...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {booksList.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
