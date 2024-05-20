import './App.css'
import { ApplicationContext } from "./context/context.ts";
import { LayoutWrapper } from "./components/layoutWrapper/LayoutWrapper.tsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*import Main from "./components/Main/Main.tsx";
import Events from "./components/Events/Events.tsx";
import Contact from "./components/Contact/Contact.tsx";*/
import { LoginPage } from "./pages/Login/Login.tsx";

import { RepertoirePage } from "./pages/Repertoire/Repertoire.tsx";
import EventsPage from "./pages/Events/Events.tsx";
import { RegistrationPage } from "./pages/Registration/Registration.tsx";
import { ContactPage } from "./pages/Contact/Contact.tsx";
import { AdministrationPage } from "./pages/Administration/Administration.tsx";

export default function App() {
  return (
    <ApplicationContext.Provider value={{
      user: null,
      setUser: () => {},
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWrapper/>}>
            <Route path="administracja" element={<AdministrationPage />} />
            <Route path="repertuar" element={<RepertoirePage />} />
            <Route path="wydarzenia" element={<EventsPage />}/>
            <Route path="kontakt" element={<ContactPage />}/>
            <Route path="logowanie" element={<LoginPage />} />
            <Route path="rejestracja" element={<RegistrationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApplicationContext.Provider>
  )
}
