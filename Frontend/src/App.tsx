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
import { useState, useEffect } from "react"
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

  useEffect(() => {
    // Initialize modal service on app start
    noticeModalService.initialize()
    setIsInitialized(true)
    
    // Add debug helpers with TypeScript safe approach
    if (typeof window !== 'undefined') {
      // Create a type-safe assignment
      (window as any).__noticeModal = {
        show: () => setShowNoticeModal(true),
        hide: () => setShowNoticeModal(false),
        reset: () => {
          noticeModalService.resetForDevice()
          setHasCheckedModal(false)
          setShowNoticeModal(false)
        },
        getSettings: () => noticeModalService.getSettings(),
        forceShow: () => {
          if (noticeModalService.forceShowModal()) {
            setShowNoticeModal(true)
          }
        }
      };
      
      console.log('NoticeModal debug helpers added to window.__noticeModal')
    }
    
    // Set a timeout to ensure modal shows even if checks fail
    const safetyTimer = setTimeout(() => {
      if (!showNoticeModal && !hasCheckedModal) {
        console.log('Safety timer triggered - forcing modal to show')
        setShowNoticeModal(true)
      }
    }, 2000); // 2 second safety timeout
    
    return () => {
      clearTimeout(safetyTimer)
      if (typeof window !== 'undefined') {
        delete (window as any).__noticeModal
      }
    }
  }, [])

  useEffect(() => {
    // Only check modal ONCE when component first mounts (app starts)
    const checkAndShowModal = async () => {
      if (!isInitialized) return
      
      console.log('=== Initial modal check on app load ===')
      console.log('Current URL:', window.location.href)
      
      // Check if we're in admin section - don't show modal there
      if (window.location.pathname.startsWith('/admin')) {
        console.log('In admin section, skipping modal')
        setHasCheckedModal(true)
        return
      }
      
      // Add small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // FORCE SHOW FOR EVERYONE - REMOVE COMPLEX CHECKS
      console.log('🟢 FORCING MODAL TO SHOW FOR ALL VISITORS')
      setShowNoticeModal(true)
      noticeModalService.markAsShownInSession()
      
      // If you want to keep some logic, use this simplified version:
      /*
      const shouldShow = noticeModalService.shouldShowModal()
      console.log('Final decision - Should show modal:', shouldShow)
      
      if (shouldShow) {
        console.log('✅ Setting modal to show')
        setShowNoticeModal(true)
        noticeModalService.markAsShownInSession()
      } else {
        console.log('❌ Modal will not be shown - but showing anyway for testing')
        // FOR TESTING - REMOVE IN PRODUCTION
        setShowNoticeModal(true)
      }
      */
      
      setHasCheckedModal(true)
    }

    if (isInitialized && !hasCheckedModal) {
      checkAndShowModal()
    }
  }, [hasCheckedModal, isInitialized])

  useEffect(() => {
    // Listen for manual trigger from header/admin
    const handleShowNoticeModal = () => {
      console.log('Manual notice modal trigger')
      setShowNoticeModal(true)
    }

    window.addEventListener('showNoticeModal', handleShowNoticeModal)
    
    return () => {
      window.removeEventListener('showNoticeModal', handleShowNoticeModal)
    }
  }, [])

  const handleCloseNoticeModal = () => {
    console.log('Closing notice modal')
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
              
              {/* SIMPLIFIED: ALWAYS show modal if showNoticeModal is true */}
              {showNoticeModal && (
                <NoticeModal 
                  isEnabled={true}
                  onClose={handleCloseNoticeModal}
                />
              )}
              
              {/* Add debug button in development */}
              {process.env.NODE_ENV === 'development' && (
                <button
                  onClick={() => {
                    noticeModalService.resetForDevice()
                    setHasCheckedModal(false)
                    setShowNoticeModal(true)
                  }}
                  className="fixed bottom-4 left-4 bg-red-500 text-white p-2 rounded z-50 text-xs shadow-lg"
                >
                  
                </button>
              )}
              
              {/* Add a permanent test button that's visible in all environments */}
              <button
                onClick={() => setShowNoticeModal(true)}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full z-50 shadow-lg hover:bg-blue-600 transition-colors"
                title="Test Modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
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