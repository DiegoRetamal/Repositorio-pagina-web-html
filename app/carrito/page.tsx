'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CarritoPage() {
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = () => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(data);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    let updated = [...cart];
    const item = updated.find((i) => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        updated = updated.filter((i) => i.id !== id);
      }
    }
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const total = cart.reduce((sum, item) => sum + item.precio_nuevo * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">🛒 Tu Pedido</h2>
      <div className="row">
        <div className="col-lg-8">
          <div className="table-responsive bg-white rounded shadow-sm p-3">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      Tu carrito está vacío 🍕
                    </td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </td>
                      <td className="fw-bold">{item.nombre}</td>
                      <td>${item.precio_nuevo}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span className="btn btn-light disabled fw-bold">{item.quantity}</span>
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </td>
                      <td className="fw-bold">${item.precio_nuevo * item.quantity}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card border-0 shadow-sm p-3">
            <div className="card-body">
              <h4 className="card-title fw-bold mb-3">Resumen de Compra</h4>
              <hr />
              <div className="d-flex justify-content-between fs-5 mb-3">
                <span>Total a pagar:</span>
                <strong className="text-danger">${total}</strong>
              </div>
              <div className="d-grid gap-2">
                <Link href="/comprar" className={`btn btn-danger btn-lg fw-bold ${cart.length === 0 ? 'disabled' : ''}`}>
                  Proceder al Pago
                </Link>
                <button className="btn btn-outline-secondary" onClick={clearCart} disabled={cart.length === 0}>
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}