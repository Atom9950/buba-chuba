"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  // In a real app, you would manage cart state with context or a state management library
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Great Adventure",
      author: "Jane Smith",
      price: 24.99,
      coverImage: "/placeholder.svg?height=150&width=100&text=Book+1",
      quantity: 1,
    },
    {
      id: 3,
      title: "Cooking Masterclass",
      author: "Chef Gordon",
      price: 19.99,
      coverImage: "/placeholder.svg?height=150&width=100&text=Book+3",
      quantity: 2,
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any books to your cart yet.</p>
          <Link href="/books">
            <Button>Browse Books</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.coverImage || "/placeholder.svg"}
                      alt={item.title}
                      className="w-20 h-30 object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <Link href={`/books/${item.id}`} className="font-semibold hover:underline">
                      {item.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.author}</p>
                    <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/books" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-6">Proceed to Checkout</Button>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>We accept:</p>
                <div className="flex gap-2 mt-2">
                  <div className="w-10 h-6 bg-muted rounded"></div>
                  <div className="w-10 h-6 bg-muted rounded"></div>
                  <div className="w-10 h-6 bg-muted rounded"></div>
                  <div className="w-10 h-6 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

