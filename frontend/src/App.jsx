import Header from "./components/layout/Header/Header"
import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar"
import Footer from "./components/layout/Footer/Footer"
import Checkout from "./pages/Wishlist/Wishlist"
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