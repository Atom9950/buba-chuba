"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function BookFilter() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [isOpen, setIsOpen] = useState({
    categories: true,
    price: true,
    format: true,
    language: true,
  })

  const categories = [
    { id: "fiction", label: "Fiction" },
    { id: "non-fiction", label: "Non-Fiction" },
    { id: "science", label: "Science" },
    { id: "history", label: "History" },
    { id: "biography", label: "Biography" },
    { id: "business", label: "Business" },
    { id: "cooking", label: "Cooking" },
    { id: "art", label: "Art & Photography" },
  ]

  const formats = [
    { id: "hardcover", label: "Hardcover" },
    { id: "paperback", label: "Paperback" },
    { id: "ebook", label: "E-Book" },
    { id: "audiobook", label: "Audiobook" },
  ]

  const languages = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
  ]

  const toggle = (section: keyof typeof isOpen) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm">
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <Collapsible open={isOpen.categories} onOpenChange={() => toggle("categories")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="font-medium">Categories</h3>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen.categories ? "transform rotate-180" : ""}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id} className="text-sm cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Collapsible open={isOpen.price} onOpenChange={() => toggle("price")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="font-medium">Price Range</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen.price ? "transform rotate-180" : ""}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <Slider
              defaultValue={[0, 100]}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm mr-1">$</span>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                  className="w-16 h-8"
                />
              </div>
              <span className="text-sm">to</span>
              <div className="flex items-center">
                <span className="text-sm mr-1">$</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                  className="w-16 h-8"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Collapsible open={isOpen.format} onOpenChange={() => toggle("format")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="font-medium">Format</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen.format ? "transform rotate-180" : ""}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {formats.map((format) => (
              <div key={format.id} className="flex items-center space-x-2">
                <Checkbox id={format.id} />
                <Label htmlFor={format.id} className="text-sm cursor-pointer">
                  {format.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Collapsible open={isOpen.language} onOpenChange={() => toggle("language")}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <h3 className="font-medium">Language</h3>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen.language ? "transform rotate-180" : ""}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {languages.map((language) => (
              <div key={language.id} className="flex items-center space-x-2">
                <Checkbox id={language.id} />
                <Label htmlFor={language.id} className="text-sm cursor-pointer">
                  {language.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

