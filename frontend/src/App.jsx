import Header from "./components/layout/Header/Header"
import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar"
import Footer from "./components/layout/Footer/Footer"
// import Checkout from "./pages/Whishlist/Whishlist"
import Wishlist from "./pages/Wishlist/WishList"
const App = () => {
    return (
        <>
            <AnnouncementBar />
            <Header />
            <Wishlist/>
            <Footer />
            
        </>
    )
}

export default App