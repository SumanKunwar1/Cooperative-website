import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import { AdminProvider } from "./contexts/AdminContext"
import { ApplicationProvider } from "./contexts/ApplicationContext"
import RootWrapper from "./components/layout/RootWrapper"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import CustomerDashboard from "./pages/CustomerDashboard"
import BusinessDashboard from "./pages/BusinessDashboard"
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
import ReportsBulletin from "./pages/ReportsBulletin"
import Downloads from "./pages/Downloads"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"

//footer
import Team from "./pages/footer/Team"
import Gallery from "./pages/footer/Gallery"

import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminBusinesses from "./pages/admin/AdminBusinesses"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminNotices from "./pages/admin/AdminNotices"
import AdminServices from "./pages/admin/AdminServices"
import AdminShareholders from "./pages/admin/AdminShareholders"
import AdminAbout from "./pages/admin/AdminAbout"
import AdminTeam from "./pages/admin/AdminTeam"
import AdminAccountApplications from "./pages/admin/AdminAccountApplication"
import AdminLoanApplications from "./pages/admin/AdminLoanApplication"
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminGallery from "./pages/admin/AdminGallery"
import AdminHeroSection from "./pages/admin/AdminHero"

import AccountOpeningForm from "./components/form/AccountOpeningForm"
import LoanApplicationForm from "./components/form/LoanApplicationForm"

// Notice Modal imports
import { useState, useEffect, useRef } from "react"
import NoticeModal from "./pages/NoticeModal"
import { noticeModalService } from "./services/NoticeModalService"

function AccountOpeningWrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedScheme = location.state?.selectedScheme

  const handleBack = () => {
    navigate("/services")
  }

  return <AccountOpeningForm onBack={handleBack} selectedScheme={selectedScheme} />
}

function LoanApplicationWrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedLoanType = location.state?.selectedLoanType

  const handleBack = () => {
    navigate("/services")
  }

  return <LoanApplicationForm onBack={handleBack} selectedLoanType={selectedLoanType} />
}

function ServicesWrapper() {
  const navigate = useNavigate()

  const handleOpenAccount = (scheme?: string) => {
    navigate("/open-account", { state: { selectedScheme: scheme } })
  }

  const handleApplyLoan = (loanType?: string) => {
    navigate("/apply-loan", { state: { selectedLoanType: loanType } })
  }

  return <Services onOpenAccount={handleOpenAccount} onApplyLoan={handleApplyLoan} />
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">{title}</h1>
    </div>
  )
}

function AppContent() {
  const [showNoticeModal, setShowNoticeModal] = useState(false)
  const [hasCheckedModal, setHasCheckedModal] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const hasShownModalRef = useRef(false)
  const location = useLocation()

  // Track if we're in admin section
  const isAdminSection = location.pathname.startsWith('/admin')

  useEffect(() => {
    // Initialize modal service on app start
    noticeModalService.initialize()
    setIsInitialized(true)
    
    console.log('App started - checking for modal')
    
    return () => {
      // Clean up on unmount
      hasShownModalRef.current = false
    }
  }, [])

  // Effect to check and show modal ONLY on initial load
  useEffect(() => {
    // Skip if already checked or in admin section
    if (hasCheckedModal || isAdminSection || hasShownModalRef.current) {
      return
    }

    const checkAndShowModal = async () => {
      console.log('=== Initial modal check (ONLY ONCE) ===')
      
      // Wait a bit for everything to load
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if modal should be shown
      const shouldShow = noticeModalService.shouldShowModal()
      console.log('Should show modal on initial load?', shouldShow)
      
      if (shouldShow) {
        console.log('✅ Showing modal on initial load')
        setShowNoticeModal(true)
        noticeModalService.markAsShownInSession()
        hasShownModalRef.current = true
      }
      
      setHasCheckedModal(true)
    }

    if (isInitialized) {
      checkAndShowModal()
    }
  }, [isInitialized, hasCheckedModal, isAdminSection])

  // Reset modal check when user navigates to home page (optional)
  useEffect(() => {
    // If user navigates to home page, we could reset after some time
    // But for now, we keep it simple - only show on initial load
    console.log('Route changed to:', location.pathname)
    
    // If modal is open and user navigates, close it
    if (showNoticeModal && location.pathname !== '/') {
      console.log('Route changed, closing modal')
      setShowNoticeModal(false)
    }
  }, [location.pathname])

  const handleCloseNoticeModal = () => {
    console.log('User closed the modal')
    setShowNoticeModal(false)
    noticeModalService.markAsClosed()
  }

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute requiredPermission="users">
              <AdminUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/businesses"
          element={
            <ProtectedAdminRoute requiredPermission="businesses">
              <AdminBusinesses />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute requiredPermission="products">
              <AdminProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedAdminRoute requiredPermission="services">
              <AdminServices />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/notices"
          element={
            <ProtectedAdminRoute requiredPermission="notices">
              <AdminNotices />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute requiredPermission="orders">
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/hero-section"
          element={
            <ProtectedAdminRoute>
              <AdminHeroSection />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedAdminRoute requiredPermission="orders">
              <AdminGallery />
            </ProtectedAdminRoute>
          }
        />
        
        <Route
          path="/admin/teams"
          element={
            <ProtectedAdminRoute requiredPermission="team">
              <AdminTeam />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <ProtectedAdminRoute requiredPermission="content">
              <AdminAbout />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard currentSection="analytics">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                  <p className="text-gray-600 mt-2">Coming Soon</p>
                </div>
              </AdminDashboard>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard currentSection="content">
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
                  <p className="text-gray-600 mt-2">Coming Soon</p>
                </div>
              </AdminDashboard>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/shareholders"
          element={
            <ProtectedAdminRoute requiredPermission="shareholders">
              <AdminShareholders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/account-applications"
          element={
            <ProtectedAdminRoute>
              <AdminAccountApplications />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/loan-applications"
          element={
            <ProtectedAdminRoute>
              <AdminLoanApplications />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/*"
          element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<ServicesWrapper />} />
                  <Route path="/open-account" element={<AccountOpeningWrapper />} />
                  <Route path="/apply-loan" element={<LoanApplicationWrapper />} />
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
                  <Route path="/business-directory/:businessName" element={<BusinessDetails />} />
                  <Route path="/reports-bulletin" element={<ReportsBulletin />} />
                  <Route path="/downloads" element={<Downloads />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/shareholders" element={<Shareholders />} />
                  <Route path="/notice" element={<Notice />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard/:name" element={<CustomerDashboard />} />
                  <Route path="/business-dashboard/:name" element={<BusinessDashboard />} />
                  <Route path="/teams" element={<Team />} />
                  <Route path="/gallery" element={<Gallery />} />

                  <Route path="/membership" element={<PlaceholderPage title="Membership Page" />} />
                  <Route path="/events" element={<PlaceholderPage title="Events" />} />
                  <Route path="/business-registration" element={<PlaceholderPage title="Business Registration" />} />
                  <Route path="/forgot-password" element={<PlaceholderPage title="Forgot Password" />} />
                  <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
                  <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
                </Routes>
              </main>
              <Footer />
              
              {/* Show modal only if showNoticeModal is true */}
              {showNoticeModal && (
                <NoticeModal 
                  isEnabled={true}
                  onClose={handleCloseNoticeModal}
                />
              )}
              
              {/* Hidden button to manually show modal (for testing) */}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={() => {
                    console.log('Manual modal trigger')
                    setShowNoticeModal(true)
                  }}
                  className="fixed bottom-4 left-4 bg-green-600 text-white p-2 rounded z-50 text-xs opacity-50 hover:opacity-100"
                  title="Show Modal (Dev)"
                >
                  Show Modal
                </button>
              )}
            </>
          }
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <RootWrapper>
        <AuthProvider>
          <AdminProvider>
            <ApplicationProvider>
              <CartProvider>
                <Router>
                  <AppContent />
                </Router>
              </CartProvider>
            </ApplicationProvider>
          </AdminProvider>
        </AuthProvider>
      </RootWrapper>
    </HelmetProvider>
  )
}

export default App