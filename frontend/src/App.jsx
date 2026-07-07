import AnnouncementBar from "./components/layout/AnnouncementBar/AnnouncementBar";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Home from "./pages/Home/Home";
import "./styles/variables.css";
import "./styles/index.css";

const App = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Home />
      <Footer />
    </>
  );
};

export default App;
