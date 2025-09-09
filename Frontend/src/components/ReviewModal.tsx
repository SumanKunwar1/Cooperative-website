"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Star } from "lucide-react"
import { useOrders } from "../contexts/OrderContext"
import { useAuth } from "../contexts/AuthContext"
import Button from "./ui/Button"
import Card from "./ui/Card"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  orderId: string
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, productId, productName, orderId }) => {
  const { addReview } = useOrders()
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || !user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      addReview({
        userId: user.id,
        userName: user.businessName,
        productId,
        orderId,
        rating,
        comment: comment.trim(),
      })

      // Reset form
      setRating(0)
      setComment("")
      onClose()
      alert("Review submitted successfully!")
    } catch (error) {
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Write a Review</h3>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-2">{productName}</h4>
            <p className="text-sm text-muted-foreground">Share your experience with this product</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Comment (Optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell others about your experience with this product..."
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">{comment.length}/500 characters</p>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={rating === 0 || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default ReviewModal
