import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import { AdminProvider } from "./contexts/AdminContext"
import { ApplicationProvider } from "./contexts/ApplicationContext"
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

// i18n import
import { useTranslation } from "react-i18next"
import "./pages/i18n"

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

function PlaceholderPage({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">{t(titleKey)}</h1>
    </div>
  )
}

function AppContent() {
  const [showNoticeModal, setShowNoticeModal] = useState(false)
  const [modalChecked, setModalChecked] = useState(false)

  useEffect(() => {
    // Only check modal on initial app load (mount)
    const checkModal = () => {
      const shouldShow = noticeModalService.shouldShowModal()
      console.log('Should show modal:', shouldShow)
      console.log('Modal settings:', noticeModalService.getSettings())
      
      if (shouldShow) {
        setShowNoticeModal(true)
        noticeModalService.markAsShownInSession()
      }
      setModalChecked(true)
    }

    // Only run this once when component first mounts
    if (!modalChecked) {
      checkModal()
    }

    // Listen for manual trigger from header/admin
    const handleShowNoticeModal = () => {
      // Reset session flag when manually triggered
      setShowNoticeModal(true)
    }

    window.addEventListener('showNoticeModal', handleShowNoticeModal)
    
    return () => {
      window.removeEventListener('showNoticeModal', handleShowNoticeModal)
    }
  }, [modalChecked])

  const handleCloseNoticeModal = () => {
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

                  {/* Business Directory Routes */}
                  <Route path="/business-directory" element={<BusinessDirectory />} />
                  <Route path="/business-directory/:businessName" element={<BusinessDetails />} />

                  <Route path="/shareholders" element={<Shareholders />} />
                  <Route path="/notice" element={<Notice />} />

                  <Route path="/dashboard/:name" element={<CustomerDashboard />} />
                  <Route path="/business-dashboard/:name" element={<BusinessDashboard />} />
                  <Route path="/teams" element={<Team />} />
                  <Route path="/gallery" element={<Gallery />} />

                  {/* Placeholder routes with translations */}
                  <Route path="/membership" element={<PlaceholderPage titleKey="membershipPage" />} />
                  <Route path="/events" element={<PlaceholderPage titleKey="events" />} />
                  <Route path="/contact" element={<PlaceholderPage titleKey="contact" />} />
                  <Route path="/business-registration" element={<PlaceholderPage titleKey="businessRegistration" />} />
                  <Route path="/forgot-password" element={<PlaceholderPage titleKey="forgotPassword" />} />
                  <Route path="/terms" element={<PlaceholderPage titleKey="termsOfService" />} />
                  <Route path="/privacy" element={<PlaceholderPage titleKey="privacyPolicy" />} />
                </Routes>
              </main>
              <Footer />
              
              {/* Notice Modal - Show only once per session */}
              <NoticeModal 
                isEnabled={showNoticeModal}
                onClose={handleCloseNoticeModal}
              />
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
    </HelmetProvider>
  )
}

export default App