import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar"
import Shop from "./pages/Shop/Shop"
// import ProductCard from "./pages/ProductCard/ProductCard"

const App = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Shop/>
      {/* <ProductCard/> */}
      <Footer />
    </>
  )
}

export default App