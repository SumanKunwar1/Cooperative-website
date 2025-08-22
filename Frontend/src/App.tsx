import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"

// Layout Components
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Shop from "./pages/Shop"
import BusinessDirectory from "./pages/BusinessDirectory"
import BusinessDetails from "./pages/BusinessDetails"
import Shareholders from "./pages/Shareholders"
import Notice from "./pages/Notice"

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/category/:category" element={<Shop />} />
              <Route path="/shop/category/:category/:subcategory" element={<Shop />} />

              <Route path="/business-directory" element={<BusinessDirectory />} />
              <Route path="/business-directory/:id" element={<BusinessDetails />} />

              <Route path="/shareholders" element={<Shareholders />} />

              {/* Notice page route */}
              <Route path="/notice" element={<Notice />} />

              {/* Placeholder routes - to be implemented */}
              <Route
                path="/membership"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl">Membership Page - Coming Soon</h1>
                  </div>
                }
              />
              <Route
                path="/events"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl">Events - Coming Soon</h1>
                  </div>
                }
              />
              <Route
                path="/contact"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl">Contact - Coming Soon</h1>
                  </div>
                }
              />
              <Route
                path="/business-registration"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl">Business Registration - Coming Soon</h1>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
