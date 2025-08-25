import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { CartProvider } from "./contexts/CartContext"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import CustomerDashboard from "./pages/CustomerDashboard"
import OrderConfirmation from "./pages/OrderConfirmation"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Shop from "./pages/Shop"
import ShopDetails from "./pages/ShopDetails"
import BusinessDirectory from "./pages/BusinessDirectory"
import BusinessDetails from "./pages/BusinessDetails"
import Shareholders from "./pages/Shareholders"
import Notice from "./pages/Notice"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
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
                <Route path="/shop/product/:id" element={<ShopDetails />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />

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
      </CartProvider>
    </HelmetProvider>
  )
}

export default App
