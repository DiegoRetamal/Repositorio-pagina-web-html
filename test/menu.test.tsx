import { render, screen, fireEvent } from '@testing-library/react';
import MenuPage from '../app/menu/page';

// Mock de navegación para evitar errores si usas useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Pruebas unitarias para MenuPage', () => {
  beforeEach(() => {
    // Limpiamos el localStorage antes de cada prueba
    localStorage.clear();
  });

  test('1. Renderiza correctamente el menú inicial de pizzas', () => {
    render(<MenuPage />);

    // Verificar que las pizzas por defecto aparezcan en pantalla
    expect(screen.getByText('Pepperoni Suprema')).toBeInTheDocument();
    expect(screen.getByText('Cuatro Quesos')).toBeInTheDocument();
  });

  test('2. Filtra correctamente las pizzas por ingrediente usando la búsqueda', () => {
    render(<MenuPage />);

    const inputBusqueda = screen.getByPlaceholderText(/Buscar por ingrediente/i);

    // Simulamos que el usuario escribe "pollo"
    fireEvent.change(inputBusqueda, { target: { value: 'pollo' } });

    // La pizza con pollo debe estar visible
    expect(screen.getByText('BBQ Chicken')).toBeInTheDocument();

    // Las pizzas que no tienen pollo no deben aparecer
    expect(screen.queryByText('Pepperoni Suprema')).not.toBeInTheDocument();
    expect(screen.queryByText('Cuatro Quesos')).not.toBeInTheDocument();
  });

  test('3. Muestra mensaje "sin resultados" si el ingrediente no existe', () => {
    render(<MenuPage />);

    const inputBusqueda = screen.getByPlaceholderText(/Buscar por ingrediente/i);

    // Escribimos un ingrediente inexistente
    fireEvent.change(inputBusqueda, { target: { value: 'piña verde' } });

    expect(screen.getByText(/No encontramos pizzas con el ingrediente/i)).toBeInTheDocument();
  });

  test('4. Guarda el producto en localStorage al hacer clic en "Agregar"', () => {
    render(<MenuPage />);

    // Buscar todos los botones de "Agregar" y presionar el primero
    const botonesAgregar = screen.getAllByRole('button', { name: /agregar/i });
    fireEvent.click(botonesAgregar[0]);

    // Consultar el estado simulado de localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    expect(cart.length).toBe(1);
    expect(cart[0].nombre).toBe('Pepperoni Suprema');
    expect(cart[0].quantity).toBe(1);
  });
});