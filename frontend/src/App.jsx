<<<<<<< HEAD
import { Routes, Route } from "react-router-dom"
import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar"
import Shop from "./pages/Shop/Shop"
import ProductDetails from "./pages/ProductDetail/ProductDetail"

const App = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Shop limit={8} showFilters={false} title="Featured Products" />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
=======
>>>>>>> 9353f1a9cd21f3d866d8accb4dcecf9826c1150c
