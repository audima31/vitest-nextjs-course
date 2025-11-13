import Link from 'next/link'
import type { Book } from '@/lib/types'

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  return (
    <ul className="books-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <Link href={`/books/${book.id}`} className="book-item-link">
            View Details
          </Link>
        </li>
      ))}
    </ul>
  )
}
