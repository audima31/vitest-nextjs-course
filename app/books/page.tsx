'use client'

import { useEffect, useState } from 'react'
import type { Book } from '@/lib/types'
import BookList from '@/components/BookList/BookList'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        setBooks(data)
      } catch (err) {
        setError('There was an error fetching the books.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])
  
  return (
    <div className="books-page">
      <h1>My Reading List</h1>

      {isLoading && <p>Loading books...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && books.length === 0 && <p>No books found.</p>}
      {books.length > 0 && <BookList books={books} />}
      
    </div>
  )
}
