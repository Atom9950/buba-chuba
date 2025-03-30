"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import BookCard from "@/components/book-card"

export default function FeaturedBooks() {
  // In a real app, you would fetch featured books from an API or database
  const featuredBooks = [
    {
      id: 1,
      title: "The Great Adventure",
      author: "Jane Smith",
      price: 24.99,
      coverImage: "/placeholder.svg?height=300&width=200&text=Book+1",
    },
    {
      id: 2,
      title: "Business Strategies",
      author: "John Doe",
      price: 29.99,
      coverImage: "/placeholder.svg?height=300&width=200&text=Book+2",
    },
    {
      id: 3,
      title: "Cooking Masterclass",
      author: "Chef Gordon",
      price: 19.99,
      coverImage: "/placeholder.svg?height=300&width=200&text=Book+3",
    },
    {
      id: 4,
      title: "History of Europe",
      author: "Prof. Williams",
      price: 34.99,
      coverImage: "/placeholder.svg?height=300&width=200&text=Book+4",
    },
    {
      id: 5,
      title: "Science Explained",
      author: "Dr. Einstein",
      price: 27.99,
      coverImage: "/placeholder.svg?height=300&width=200&text=Book+5",
    },
    {
      id: 6,
      title: "Poetry Collection",
      author: "Emily Verse",
      price: 15.99,
      coverImage: "/placeholder.svg?height=300&width=200&text=Book+6",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4
  const totalPages = Math.ceil(featuredBooks.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= featuredBooks.length ? 0 : prevIndex + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? Math.max(0, featuredBooks.length - itemsPerPage) : prevIndex - itemsPerPage,
    )
  }

  const visibleBooks = featuredBooks.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleBooks.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            coverImage={book.coverImage}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  )
}

