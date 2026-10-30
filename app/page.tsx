'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        // Conexión a json-server
        const res = await fetch('http://localhost:4000/pizzas');
        if (!res.ok) throw new Error('Error al conectar con la API');
        
        const data = await res.json();
        
        // Maneja tanto arreglos directos [...] como objetos { pizzas: [...] }
        const listaPizzas = Array.isArray(data) ? data : data.pizzas || [];
        setPizzas(listaPizzas.slice(0, 3)); // Toma solo las primeras 3 destacadas
      } catch (error) {
        console.error('Error cargando la pantalla principal:', error);
        setPizzas([]); // Evita que la aplicación falle si el servidor está apagado
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div className="container my-5 text-center">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <h1 className="display-4 fw-bold text-danger">¡Las mejores pizzas de la ciudad!</h1>
        <p className="fs-4 text-muted">Ingredientes frescos y masa artesanal horneada al instante.</p>
        <Link href="/menu" className="btn btn-danger btn-lg mt-3">
          Ver Menú Completo
        </Link>
      </div>

      <h3 className="fw-bold mb-4">🔥 Pizzas Destacadas</h3>

      {loading ? (
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : pizzas.length === 0 ? (
        <p className="text-muted">No se pudieron cargar las pizzas destacadas en este momento.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {pizzas.map((p) => (
            <div key={p.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={p.img}
                  className="card-img-top"
                  alt={p.nombre}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{p.nombre}</h5>
                  <p className="card-text text-muted">{p.desc}</p>
                  <span className="fs-5 fw-bold text-danger">${p.precio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}