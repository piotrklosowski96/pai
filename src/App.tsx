import './App.css'
import { ApplicationContext } from "./context/context.ts";
import { LayoutWrapper } from "./components/layoutWrapper/LayoutWrapper.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*import Main from "./components/Main/Main.tsx";
import Events from "./components/Events/Events.tsx";
import Contact from "./components/Contact/Contact.tsx";*/
import { Login } from "./pages/Login/Login.tsx";
import {RegisterPage} from "./components/registerPage/RegisterPage.tsx";

import { RepertoirePage } from "./pages/Repertoire/Repertoire.tsx";
import EventsPage from "./pages/Events/Events.tsx";

export default function App() {
  return (
    <ApplicationContext.Provider value={{
      user: null,
      setUser: () => {},
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWrapper/>}>
            <Route path="repertuar" element={<RepertoirePage />} />
            <Route path="wydarzenia" element={<EventsPage />}/>
            <Route path="kontakt" element={<Contact />}/>
            <Route path="logowanie" element={<Login />} />
            <Route path="rejestracja" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApplicationContext.Provider>
  )
}
