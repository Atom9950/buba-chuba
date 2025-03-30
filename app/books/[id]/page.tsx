import Link from "next/link"
import { ArrowLeft, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function BookDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch book details from an API or database based on the ID
  const book = {
    id: Number.parseInt(params.id),
    title: `Book Title ${params.id}`,
    author: `Author Name ${params.id}`,
    price: 24.99,
    coverImage: `/placeholder.svg?height=600&width=400&text=Book+${params.id}`,
    description:
      "This is a detailed description of the book. It would contain information about the plot, characters, and other relevant details that would help the reader decide if they want to purchase this book.",
    publishDate: "January 15, 2023",
    pages: 320,
    isbn: `978-1-23456-789-${params.id}`,
    language: "English",
  }

  return (
    <div className="container py-8">
      <Link href="/books" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Books
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            className="rounded-lg object-cover max-h-[600px]"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-xl text-muted-foreground">by {book.author}</p>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${book.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">(Free shipping)</span>
          </div>

          <Button className="w-full sm:w-auto">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <dt className="text-sm text-muted-foreground">Published</dt>
                <dd>{book.publishDate}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Pages</dt>
                <dd>{book.pages}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">ISBN</dt>
                <dd>{book.isbn}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Language</dt>
                <dd>{book.language}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

