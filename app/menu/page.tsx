'use client';

import { useState } from 'react';

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const pizzas = [
    { id: 1, nombre: 'Pepperoni Suprema', precio: 8990, desc: 'Doble pepperoni con queso mozzarella.', img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80' },
    { id: 2, nombre: 'Cuatro Quesos', precio: 9490, desc: 'Mozzarella, Gorgonzola, Parmesano y Provolone.', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80' },
    { id: 3, nombre: 'Margarita Italiana', precio: 7990, desc: 'Tomates frescos, albahaca y aceite de oliva.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80' },
    { id: 4, nombre: 'BBQ Chicken', precio: 9990, desc: 'Pollo a la parrilla, cebolla morada y salsa BBQ.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
    { id: 5, nombre: 'Hawaiiana Especial', precio: 8490, desc: 'Jamón acaramelado y trozos de piña fresca.', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80' },
    { id: 6, nombre: 'Vegetariana Garden', precio: 8290, desc: 'Pimentón, champiñones, aceitunas y choclo.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80' },
  ];

  const agregarAlCarrito = (pizza: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exist = cart.find((item: any) => item.id === pizza.id);
    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({
        id: pizza.id,
        nombre: pizza.nombre,
        precio_nuevo: pizza.precio,
        imagen: pizza.img,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    //alert(`¡${pizza.nombre} agregada al carrito!`);
  };

  // Filtrar por nombre o ingredientes descritos en la pizza
  const filteredPizzas = pizzas.filter((pizza) => {
    const term = searchTerm.toLowerCase().trim();
    const matchNombre = pizza.nombre.toLowerCase().includes(term);
    const matchIngredientes = pizza.desc.toLowerCase().includes(term);
    return matchNombre || matchIngredientes;
  });

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">🍕 Nuestro Menú de Pizzas</h2>

      {/* Bar de Búsqueda con Lupa */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-danger text-white border-danger">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-danger"
              placeholder="Buscar por ingrediente (ej. pollo, queso, pimentón)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearchTerm('')}
                title="Limpiar búsqueda"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resultados de la búsqueda */}
      {filteredPizzas.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-emoji-frown display-1 text-muted"></i>
          <h4 className="mt-3 text-muted">
            No encontramos pizzas con el ingrediente "{searchTerm}"
          </h4>
          <p className="text-secondary">
            Prueba buscando otro ingrediente como pepperoni, piña, champiñones o albahaca.
          </p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredPizzas.map((p) => (
            <div key={p.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={p.img}
                  className="card-img-top"
                  alt={p.nombre}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{p.nombre}</h5>
                  <p className="card-text text-muted flex-grow-1">{p.desc}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fs-5 fw-bold text-danger">${p.precio}</span>
                    <button className="btn btn-danger" onClick={() => agregarAlCarrito(p)}>
                      <i className="bi bi-cart-plus me-1"></i> Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}