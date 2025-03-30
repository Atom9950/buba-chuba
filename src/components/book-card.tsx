import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface BookCardProps {
  id: number
  title: string
  author: string
  price: number
  coverImage: string
}

export default function BookCard({ id, title, author, price, coverImage }: BookCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/books/${id}`} className="block overflow-hidden">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={coverImage || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/books/${id}`} className="hover:underline">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{author}</p>
        <p className="mt-2 font-medium">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

