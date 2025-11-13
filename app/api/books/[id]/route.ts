import type { Book } from "@/lib/types"

const books: Book[] = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' },
]

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const book = books.find((book) => book.id === Number(id))

  if (!book) {
    return Response.json({ error: 'Book not found' }, { status: 404 })
  }
  
  return Response.json(book)
}