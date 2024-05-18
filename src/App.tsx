import './App.css'
import { ApplicationContext } from "./context/context.ts";
import { LayoutWrapper } from "./components/layoutWrapper/LayoutWrapper.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from "./components/mainPage/MainPage.tsx";
import Events from "./components/events/Events.tsx";
import Contact from "./components/contact/Contact.tsx";

export default function App() {
  return (
    <ApplicationContext.Provider value={{
      user: null,
      setUser: () => {},
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWrapper/>}>
            <Route path="repertuar" element={<MainPage />}/>
            <Route path="wydarzenia" element={<Events />}/>
            <Route path="kontakt" element={<Contact />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ApplicationContext.Provider>
  )
}
