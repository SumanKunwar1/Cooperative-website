import type React from "react"
import Header from "../components/layout/Header"

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Constellation Saving & Credit Cooperative
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted financial partner for savings, loans, and cooperative services. Explore our shop with improved
            navigation and discover all our categories.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Page
