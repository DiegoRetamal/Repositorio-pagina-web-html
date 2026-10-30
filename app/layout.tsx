'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState<number>(0);

  const updateCartBadge = () => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartCount(count);
    }
  };

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js' as any);
    updateCartBadge();

    window.addEventListener('cartUpdated', updateCartBadge);
    return () => window.removeEventListener('cartUpdated', updateCartBadge);
  }, []);

  return (
    <html lang="es">
      <body>
        {/* Navbar Global */}
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
          <div className="container">
            <Link className="navbar-brand fw-bold text-danger fs-3" href="/">
              🍕 Bella Pizza
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto ms-3">
                <li className="nav-item">
                  <Link className="nav-link" href="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/menu">Menú</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/carrito">Carrito</Link>
                </li>
              </ul>
              <Link href="/carrito" className="btn btn-warning fw-bold">
                <i className="bi bi-cart4"></i> Carrito
                <span className="badge bg-danger ms-1">{cartCount}</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenido Dinámico */}
        <main>{children}</main>

        {/* Footer Global */}
        <footer className="bg-dark text-light py-4 text-center mt-5">
          <p className="mb-0">🍕 Bella Pizza &copy; 2026 - Creado con Next.js</p>
        </footer>
      </body>
    </html>
  );
}