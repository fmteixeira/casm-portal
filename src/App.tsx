import { useEffect, useRef } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import ComoParticipar from './pages/ComoParticipar'
import Contactos from './pages/Contactos'
import EventoDetalhe from './pages/EventoDetalhe'
import Eventos from './pages/Eventos'
import Galeria from './pages/Galeria'
import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'
import Sobre from './pages/Sobre'

/** Scrolls to the top on page changes, but not when opening or stepping through the gallery viewer. */
function ScrollToTop() {
  const { pathname } = useLocation()
  const prev = useRef(pathname)
  useEffect(() => {
    const inGallery = (p: string) => p.startsWith('/galeria')
    if (!(inGallery(prev.current) && inGallery(pathname))) window.scrollTo(0, 0)
    prev.current = pathname
  }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="eventos/:slug" element={<EventoDetalhe />} />
        <Route path="como-participar" element={<ComoParticipar />} />
        <Route path="galeria" element={<Galeria />} />
        <Route path="galeria/:album/:item" element={<Galeria />} />
        <Route path="contactos" element={<Contactos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
