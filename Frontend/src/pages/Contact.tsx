"use client"

import type React from "react"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, Users, CheckCircle } from "lucide-react"

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form submitted:", formData)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 5000)
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "CTC Mall, Sundhara, Kathmandu, Nepal",
      color: "from-[#07730E] to-green-700",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+977-1-4441234",
      color: "from-[#07730E] to-green-700",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "constellationscc@gmail.com",
      color: "from-[#07730E] to-green-700",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Sun-Fri: 10:00 AM - 5:00 PM",
      color: "from-[#07730E] to-green-700",
    },
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - Constellation Saving & Credit Cooperative</title>
        <meta
          name="description"
          content="Get in touch with Constellation Cooperative. Visit our office or contact us via phone, email, or our contact form."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-green-100" />
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                We'd love to hear from you. Whether you have questions about our services or just want to say hello,
                feel free to reach out.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => {
              const IconComponent = info.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-[#07730E] hover:transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-gradient-to-r from-[#07730E] to-green-700 mb-4">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.details}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#07730E]">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-[#07730E] to-green-700 rounded-full flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Message Sent Successfully!</h3>
                    <p className="text-sm text-green-700">We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07730E] focus:border-[#07730E] transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07730E] focus:border-[#07730E] transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07730E] focus:border-[#07730E] transition-all duration-300"
                    placeholder="+977-1-1234567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07730E] focus:border-[#07730E] transition-all duration-300"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07730E] focus:border-[#07730E] transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#07730E] to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Map and Office Info */}
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#07730E]">
                <div className="w-full h-96 bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4982891234567!2d85.31055117616!3d27.697838699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1981be77a867%3A0x1de926e1d48a55ce!2sCTC%20Mall!5e0!3m2!1sen!2snp!4v1693123456789!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CTC Mall Location - Kathmandu, Nepal"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Office Location</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-[#07730E] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Address</p>
                        <p className="text-gray-600">CTC Mall, Sundhara, Kathmandu, Nepal</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-[#07730E] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Business Hours</p>
                        <p className="text-gray-600">Sunday - Friday: 10:00 AM - 5:00 PM</p>
                        <p className="text-gray-600">Saturday: Closed</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/place/CTC+Mall/@27.6978387,85.3105512,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1981be77a867:0x1de926e1d48a55ce!8m2!3d27.697834!4d85.3131261!16s%2Fg%2F11jd74pr0n?hl=en&entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-[#07730E] text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-[#07730E] to-green-800 text-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-green-100">Phone</p>
                      <a href="tel:014441234" className="font-semibold hover:underline">
                        +977-1-4441234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-green-100">Email</p>
                      <a href="mailto:info@constellation.com.np" className="font-semibold hover:underline">
                        constellationscc@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-green-100">Available</p>
                      <p className="font-semibold">Mon-Fri 10AM - 5PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-[#07730E] bg-opacity-5 to-green-800 bg-opacity-5 py-16 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#07730E]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are your service hours?</h3>
                <p className="text-gray-600">
                  We are open Monday to Friday from 10:00 AM to 5:00 PM. We are closed on Saturdays and Sundays.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#07730E]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How can I become a member?</h3>
                <p className="text-gray-600">
                  You can visit our office or download the member application form from our website. Our team will guide
                  you through the process.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#07730E]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What loan options do you offer?</h3>
                <p className="text-gray-600">
                  We offer various loan options including personal loans, business loans, and emergency loans. Contact us
                  for detailed information.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#07730E]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How do I track my application?</h3>
                <p className="text-gray-600">
                  You can track your application status by calling us at +977-1-4441234 or visiting our office with your
                  application reference number.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#07730E] to-green-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect?</h2>
            <p className="text-xl text-green-100 mb-8">
              Have any questions or need assistance? Our team is here to help you with anything you need.
            </p>
            <button className="bg-white text-[#07730E] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start a Conversation
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact