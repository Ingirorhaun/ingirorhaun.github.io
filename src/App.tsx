import { Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView();
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
