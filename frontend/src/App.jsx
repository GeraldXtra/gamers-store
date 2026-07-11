import Header from "./components/layout/Header/Header"
import Footer from "./components/layout/Footer/Footer"
import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar"
import About from "./pages/About/About"

const App = () => (
  (
    <>
      <AnnouncementBar />
      <Header />
      <About />
      <Footer />
    </>
  )
)

export default App