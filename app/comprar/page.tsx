'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ComprarPage() {
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalSum = cart.reduce((sum: number, item: any) => sum + item.precio_nuevo * item.quantity, 0);
    setTotal(totalSum);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu compra! Tu pizza ya se está preparando en el horno. 🍕🔥');
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    router.push('/');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="fw-bold mb-3">📍 Datos para la Entrega</h3>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellidos</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Teléfono de contacto</label>
                  <input type="tel" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="col-12">
                  <label className="form-label">Dirección (Calle y Número)</label>
                  <input type="text" className="form-control" required />
                </div>
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">Total del Pedido:</h4>
                <h3 className="text-danger fw-bold mb-0">${total}</h3>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100 fw-bold">
                Confirmar y Pagar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}