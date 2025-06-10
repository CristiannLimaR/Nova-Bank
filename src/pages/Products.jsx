import React, { useState } from 'react';
import { Search, Plus, ShoppingBag, Star, CreditCard, Shield, Gift, Coffee, BookOpen, Heart, Sparkles, Scissors, GraduationCap, Ticket, Briefcase, Dumbbell, Tv, GamepadIcon, Utensils, Plane, Wine } from 'lucide-react';
import { Button } from '../components/ui/Button';

const products = [
  // Productos Físicos - Ropa y Accesorios
  {
    id: 'pf1',
    title: 'Zapatos Premium',
    description: 'Zapatos de alta calidad y diseño exclusivo',
    price: 199.99,
    category: 'Ropa y Accesorios',
    features: ['Cuero genuino', 'Diseño exclusivo', 'Comodidad garantizada'],
    icon: <ShoppingBag className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'pf2',
    title: 'Camisas Exclusivas',
    description: 'Camisas de diseño único y materiales premium',
    price: 89.99,
    category: 'Ropa y Accesorios',
    features: ['Algodón premium', 'Diseño único', 'Múltiples tallas'],
    icon: <ShoppingBag className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'pf3',
    title: 'Carteras de Lujo',
    description: 'Carteras artesanales de alta calidad',
    price: 299.99,
    category: 'Ropa y Accesorios',
    features: ['Cuero italiano', 'Diseño artesanal', 'Espacio amplio'],
    icon: <ShoppingBag className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'pf4',
    title: 'Relojes Exclusivos',
    description: 'Relojes de lujo con diseño único',
    price: 499.99,
    category: 'Ropa y Accesorios',
    features: ['Movimiento suizo', 'Cristal de zafiro', 'Resistente al agua'],
    icon: <ShoppingBag className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'pf5',
    title: 'Gafas de Sol',
    description: 'Gafas de sol de diseño exclusivo',
    price: 159.99,
    category: 'Ropa y Accesorios',
    features: ['Protección UV', 'Diseño exclusivo', 'Estuche premium'],
    icon: <ShoppingBag className="h-5 w-5 text-purple-400" />,
  },

  // Productos Físicos - Tecnología
  {
    id: 'pf6',
    title: 'Auriculares Premium',
    description: 'Auriculares inalámbricos de alta fidelidad',
    price: 299.99,
    category: 'Tecnología',
    features: ['Cancelación de ruido', 'Batería de larga duración', 'Sonido premium'],
    icon: <CreditCard className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'pf7',
    title: 'Cargador Portátil',
    description: 'Cargador de alta capacidad y diseño compacto',
    price: 79.99,
    category: 'Tecnología',
    features: ['20,000 mAh', 'Carga rápida', 'Múltiples puertos'],
    icon: <CreditCard className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'pf8',
    title: 'Fundas para Celular',
    description: 'Fundas protectoras de diseño exclusivo',
    price: 39.99,
    category: 'Tecnología',
    features: ['Protección premium', 'Diseño único', 'Materiales de calidad'],
    icon: <CreditCard className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'pf9',
    title: 'Mouse Inalámbrico',
    description: 'Mouse ergonómico de alta precisión',
    price: 59.99,
    category: 'Tecnología',
    features: ['Sensor de alta precisión', 'Batería de larga duración', 'Diseño ergonómico'],
    icon: <CreditCard className="h-5 w-5 text-blue-400" />,
  },

  // Productos Físicos - Hogar
  {
    id: 'pf10',
    title: 'Tazas Personalizadas',
    description: 'Tazas de cerámica con diseños exclusivos',
    price: 24.99,
    category: 'Hogar',
    features: ['Cerámica premium', 'Diseño personalizado', 'Resistente al calor'],
    icon: <Heart className="h-5 w-5 text-red-400" />,
  },
  {
    id: 'pf11',
    title: 'Almohadas Premium',
    description: 'Almohadas de alta calidad para mejor descanso',
    price: 49.99,
    category: 'Hogar',
    features: ['Material hipoalergénico', 'Soporte cervical', 'Lavable'],
    icon: <Heart className="h-5 w-5 text-red-400" />,
  },
  {
    id: 'pf12',
    title: 'Plantas Decorativas',
    description: 'Plantas de interior con macetas exclusivas',
    price: 39.99,
    category: 'Hogar',
    features: ['Plantas seleccionadas', 'Macetas exclusivas', 'Guía de cuidados'],
    icon: <Heart className="h-5 w-5 text-red-400" />,
  },
  {
    id: 'pf13',
    title: 'Velas Aromáticas',
    description: 'Velas artesanales con fragancias exclusivas',
    price: 29.99,
    category: 'Hogar',
    features: ['Cera natural', 'Fragancias exclusivas', 'Duración extendida'],
    icon: <Heart className="h-5 w-5 text-red-400" />,
  },

  // Productos Físicos - Alimentación
  {
    id: 'pf14',
    title: 'Café Premium',
    description: 'Café de origen único y tostado especial',
    price: 34.99,
    category: 'Alimentación',
    features: ['Origen único', 'Tostado especial', 'Empaque premium'],
    icon: <Coffee className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: 'pf15',
    title: 'Chocolates Gourmet',
    description: 'Chocolates artesanales de alta calidad',
    price: 44.99,
    category: 'Alimentación',
    features: ['Cacao premium', 'Sabores exclusivos', 'Presentación de lujo'],
    icon: <Coffee className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: 'pf16',
    title: 'Snacks Saludables',
    description: 'Snacks nutritivos y deliciosos',
    price: 19.99,
    category: 'Alimentación',
    features: ['Ingredientes naturales', 'Sin conservantes', 'Ricos en proteínas'],
    icon: <Coffee className="h-5 w-5 text-yellow-400" />,
  },

  // Productos Físicos - Papelería
  {
    id: 'pf17',
    title: 'Agendas Exclusivas',
    description: 'Agendas de diseño único y alta calidad',
    price: 49.99,
    category: 'Papelería',
    features: ['Cuero genuino', 'Papel premium', 'Diseño personalizado'],
    icon: <BookOpen className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'pf18',
    title: 'Bolígrafos de Lujo',
    description: 'Bolígrafos de alta calidad y diseño exclusivo',
    price: 89.99,
    category: 'Papelería',
    features: ['Diseño exclusivo', 'Tinta premium', 'Estuche de regalo'],
    icon: <BookOpen className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'pf19',
    title: 'Libretas Personalizadas',
    description: 'Libretas de diseño único y papel premium',
    price: 29.99,
    category: 'Papelería',
    features: ['Papel premium', 'Diseño personalizado', 'Encuadernación de lujo'],
    icon: <BookOpen className="h-5 w-5 text-green-400" />,
  },

  // Servicios - Belleza y Cuidado Personal
  {
    id: 's1',
    title: 'Corte de Cabello Premium',
    description: 'Servicio de peluquería de alta calidad',
    price: 45.00,
    category: 'Belleza y Cuidado Personal',
    features: ['Estilista experto', 'Productos premium', 'Consulta personalizada'],
    icon: <Scissors className="h-5 w-5 text-pink-400" />,
  },
  {
    id: 's2',
    title: 'Manicure y Pedicure',
    description: 'Servicio completo de uñas',
    price: 35.00,
    category: 'Belleza y Cuidado Personal',
    features: ['Productos premium', 'Diseño personalizado', 'Tratamiento completo'],
    icon: <Scissors className="h-5 w-5 text-pink-400" />,
  },
  {
    id: 's3',
    title: 'Masaje Relajante',
    description: 'Sesión de masaje profesional',
    price: 80.00,
    category: 'Belleza y Cuidado Personal',
    features: ['Terapeuta certificado', 'Aceites premium', 'Ambiente relajante'],
    icon: <Scissors className="h-5 w-5 text-pink-400" />,
  },

  // Servicios - Educación
  {
    id: 's4',
    title: 'Curso de Inglés',
    description: 'Clases personalizadas de inglés',
    price: 299.99,
    category: 'Educación',
    features: ['Profesor nativo', 'Material exclusivo', 'Certificación'],
    icon: <GraduationCap className="h-5 w-5 text-indigo-400" />,
  },
  {
    id: 's5',
    title: 'Taller de Cocina',
    description: 'Clases de cocina gourmet',
    price: 149.99,
    category: 'Educación',
    features: ['Chef profesional', 'Ingredientes premium', 'Recetario exclusivo'],
    icon: <GraduationCap className="h-5 w-5 text-indigo-400" />,
  },
  {
    id: 's6',
    title: 'Clases de Yoga',
    description: 'Sesiones personalizadas de yoga',
    price: 79.99,
    category: 'Educación',
    features: ['Instructor certificado', 'Grupos pequeños', 'Material incluido'],
    icon: <GraduationCap className="h-5 w-5 text-indigo-400" />,
  },

  // Servicios - Entretenimiento
  {
    id: 's7',
    title: 'Boletos de Cine Premium',
    description: 'Entradas para sala VIP',
    price: 25.00,
    category: 'Entretenimiento',
    features: ['Asientos reclinables', 'Servicio a la butaca', 'Snacks premium'],
    icon: <Ticket className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: 's8',
    title: 'Conciertos Exclusivos',
    description: 'Acceso a eventos musicales premium',
    price: 150.00,
    category: 'Entretenimiento',
    features: ['Zona VIP', 'Meet & Greet', 'Merchandising exclusivo'],
    icon: <Ticket className="h-5 w-5 text-yellow-400" />,
  },

  // Servicios - Profesionales
  {
    id: 's9',
    title: 'Asesoría Legal',
    description: 'Consulta legal personalizada',
    price: 200.00,
    category: 'Servicios Profesionales',
    features: ['Abogado especializado', 'Consulta detallada', 'Seguimiento'],
    icon: <Briefcase className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 's10',
    title: 'Consultoría Contable',
    description: 'Asesoría financiera personalizada',
    price: 180.00,
    category: 'Servicios Profesionales',
    features: ['Contador certificado', 'Análisis detallado', 'Planificación fiscal'],
    icon: <Briefcase className="h-5 w-5 text-blue-400" />,
  },

  // Servicios - Bienestar
  {
    id: 's11',
    title: 'Sesión de Spa',
    description: 'Tratamiento completo de spa',
    price: 120.00,
    category: 'Bienestar',
    features: ['Masaje completo', 'Tratamiento facial', 'Acceso a instalaciones'],
    icon: <Heart className="h-5 w-5 text-red-400" />,
  },
  {
    id: 's12',
    title: 'Consulta Nutricional',
    description: 'Plan nutricional personalizado',
    price: 90.00,
    category: 'Bienestar',
    features: ['Nutriólogo certificado', 'Plan personalizado', 'Seguimiento'],
    icon: <Heart className="h-5 w-5 text-red-400" />,
  },

  // Servicios Digitales - Suscripciones
  {
    id: 'sd1',
    title: 'Netflix Premium',
    description: 'Suscripción anual a Netflix',
    price: 199.99,
    category: 'Suscripciones',
    features: ['4K Ultra HD', '4 pantallas', 'Sin anuncios'],
    icon: <Tv className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'sd2',
    title: 'Spotify Premium',
    description: 'Suscripción anual a Spotify',
    price: 99.99,
    category: 'Suscripciones',
    features: ['Música sin anuncios', 'Descarga offline', 'Calidad alta'],
    icon: <Tv className="h-5 w-5 text-purple-400" />,
  },

  // Servicios Digitales - Gaming
  {
    id: 'sd3',
    title: 'Tarjeta Steam',
    description: 'Tarjeta de regalo para Steam',
    price: 50.00,
    category: 'Gaming',
    features: ['Código digital', 'Entrega inmediata', 'Sin expiración'],
    icon: <GamepadIcon className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'sd4',
    title: 'Xbox Live Gold',
    description: 'Suscripción anual a Xbox Live',
    price: 59.99,
    category: 'Gaming',
    features: ['Juegos mensuales', 'Multijugador', 'Ofertas exclusivas'],
    icon: <GamepadIcon className="h-5 w-5 text-green-400" />,
  },

  // Servicios Digitales - Delivery
  {
    id: 'sd5',
    title: 'Cupón Restaurante',
    description: 'Vale para restaurante premium',
    price: 100.00,
    category: 'Delivery',
    features: ['Restaurantes seleccionados', 'Válido 6 meses', 'Sin restricciones'],
    icon: <Utensils className="h-5 w-5 text-orange-400" />,
  },

  // Experiencias Exclusivas - Viajes
  {
    id: 'e1',
    title: 'Tour Local Premium',
    description: 'Tour guiado por la ciudad',
    price: 150.00,
    category: 'Viajes',
    features: ['Guía experto', 'Transporte privado', 'Entradas incluidas'],
    icon: <Plane className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'e2',
    title: 'Paquete Fin de Semana',
    description: 'Escape de fin de semana completo',
    price: 499.99,
    category: 'Viajes',
    features: ['Hotel premium', 'Actividades incluidas', 'Transporte privado'],
    icon: <Plane className="h-5 w-5 text-blue-400" />,
  },

  // Experiencias Exclusivas - Eventos
  {
    id: 'e3',
    title: 'Cena Exclusiva',
    description: 'Cena gourmet con chef personal',
    price: 299.99,
    category: 'Eventos',
    features: ['Chef personal', 'Menú degustación', 'Vinos seleccionados'],
    icon: <Wine className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'e4',
    title: 'Degustación de Vinos',
    description: 'Experiencia de cata de vinos premium',
    price: 199.99,
    category: 'Eventos',
    features: ['Sommelier experto', 'Vinos premium', 'Maridaje incluido'],
    icon: <Wine className="h-5 w-5 text-purple-400" />,
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-white">Productos y Servicios</h1>
        <Button leftIcon={<Plus size={16} />} size="sm">
          Solicitar Producto
        </Button>
      </div>

      <div className="mb-6 rounded-lg bg-gray-900 p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-white">Catálogo de Productos</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md border-0 bg-gray-800 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary md:w-64"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-10 rounded-md border-0 bg-gray-800 px-3 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? 'Todas las Categorías' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="rounded-lg bg-gray-800 p-6">
              <div className="mb-4 flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                  {product.icon}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">{product.title}</h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </div>
              </div>
              <p className="mb-4 text-sm text-gray-300">{product.description}</p>
              <div className="mb-4 space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300">
                    <svg className="mr-2 h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-white">
                  {product.price === 0 ? 'Gratis' : `$${product.price.toFixed(2)}`}
                </p>
                <Button size="sm">Solicitar</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products; 