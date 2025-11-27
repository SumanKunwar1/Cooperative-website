"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

interface Shareholder {
  id: number
  name: string
  picture: string
  position: string
  companyName: string
  email: string
  phoneNumber: string
}

const shareholdersData: Shareholder[] = [
  {
    id: 1,
    name: "Ram Bahadur Shrestha",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Chairman",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "ram.shrestha@constellation.com",
    phoneNumber: "+977-01-4254939",
  },
  {
    id: 2,
    name: "Sita Devi Maharjan",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Vice Chairman",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "sita.maharjan@constellation.com",
    phoneNumber: "+977-01-4254940",
  },
  {
    id: 3,
    name: "Krishna Kumar Tamang",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Secretary",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "krishna.tamang@constellation.com",
    phoneNumber: "+977-01-4254941",
  },
  {
    id: 4,
    name: "Maya Gurung",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Treasurer",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "maya.gurung@constellation.com",
    phoneNumber: "+977-01-4254942",
  },
  {
    id: 5,
    name: "Bikash Thapa",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Board Member",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "bikash.thapa@constellation.com",
    phoneNumber: "+977-01-4254943",
  },
  {
    id: 6,
    name: "Sunita Rai",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Board Member",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "sunita.rai@constellation.com",
    phoneNumber: "+977-01-4254944",
  },
  {
    id: 7,
    name: "Rajesh Poudel",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Board Member",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "rajesh.poudel@constellation.com",
    phoneNumber: "+977-01-4254945",
  },
  {
    id: 8,
    name: "Kamala Sharma",
    picture: "/placeholder.svg?height=200&width=200",
    position: "Board Member",
    companyName: "Constellation Saving & Credit Cooperative Ltd.",
    email: "kamala.sharma@constellation.com",
    phoneNumber: "+977-01-4254946",
  },
]

const Shareholders: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>Shareholders - Constellation Saving & Credit Cooperative Ltd.</title>
        <meta
          name="description"
          content="Meet our dedicated shareholders who guide Constellation Saving & Credit Cooperative Ltd. towards financial excellence and community growth."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Shareholders</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Meet the dedicated leaders who guide our cooperative towards financial excellence and community growth
            </p>
          </div>
        </section>

        {/* Shareholders Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {shareholdersData.map((shareholder) => (
                <div
                  key={shareholder.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    hoveredCard === shareholder.id ? "ring-4 ring-green-500 ring-opacity-50" : ""
                  }`}
                  onMouseEnter={() => setHoveredCard(shareholder.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Profile Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={shareholder.picture || "/placeholder.svg"}
                      alt={shareholder.name}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{shareholder.name}</h3>
                    <p className="text-green-600 font-semibold mb-3">{shareholder.position}</p>
                    <p className="text-gray-600 text-sm mb-4">{shareholder.companyName}</p>

                    {/* Contact Information */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <a
                          href={`mailto:${shareholder.email}`}
                          className="hover:text-green-600 transition-colors duration-200"
                        >
                          {shareholder.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <a
                          href={`tel:${shareholder.phoneNumber}`}
                          className="hover:text-green-600 transition-colors duration-200"
                        >
                          {shareholder.phoneNumber}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Become a shareholder and be part of our growing cooperative family. Enjoy exclusive benefits and
              contribute to our community's financial growth.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Become a Shareholder
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Shareholders
