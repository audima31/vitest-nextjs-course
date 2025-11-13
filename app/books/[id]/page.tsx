'use client'

import { useParams, notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Book } from '@/lib/types'

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(true)
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    setIsLoading(true)

    const fetchBook = async () => {
      const response = await fetch(`/api/books/${id}`)

      if (response.status === 404) {
        notFound()
      }

      const book: Book = await response.json()

      setIsLoading(false)
      setBook(book)
    }

    fetchBook()
  }, [id])

  return (
    <div className="max-w-3xl mx-auto p-8">
      {isLoading && <p>Loading...</p>}
      {book && (
        <article className="space-y-6">
          <header>
            <h1>{book.title}</h1>
            <p>by {book.author}</p>
          </header>

          <section className="prose">
            <h2>Summary</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </section>
        </article>
      )}
    </div>
  )
}
