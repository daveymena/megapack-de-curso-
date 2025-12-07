"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Download, CheckCircle, Gift, Zap, Users, Award } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import MegaPackCard from "@/components/MegaPackCard";

const megaPacks = [
  {
    id: 1,
    title: "MEGA PACK 1 – CURSOS ADOBE",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80",
    courses: [
      "Curso Adobe Photoshop",
      "Curso Adobe Illustrator",
      "Curso Adobe InDesign",
      "Curso Completo de Corel Draw",
      "Curso Completo de Premiere pro CC",
      "Curso Completo de After Effects cc",
      "Curso Completo de Lightroom"
    ],
    description: "Aprende muy fácil, crea lo imposible, aprendizaje garantizado, no dejes pasar esta oportunidad, el diseño gráfico digital es el arte de la nueva era."
  },
  {
    id: 2,
    title: "MEGA PACK 2 – CURSOS OFFICE",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    courses: [
      "Excel – Curso completo",
      "Word – Curso Completo",
      "Power Point – Curso completo",
      "Access – Curso Completo",
      "Project – Curso Completo"
    ]
  },
  {
    id: 3,
    title: "MEGA PACK 3 – CURSOS INGLÉS",
    icon: "🌍",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    courses: [
      "Curso de inglés definitivo",
      "Inglés sin barreras",
      "Inglés en 100 días",
      "Inglés para dummies",
      "El mundo de inglés de Disney"
    ]
  },
  {
    id: 4,
    title: "MEGA PACK 4 – EXCEL",
    icon: "📈",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    courses: [
      "Excel Básico: 5 cursos (220 vídeos)",
      "Excel Intermedio: 5 cursos (180 vídeos)",
      "Excel Avanzado: 5 cursos (200 vídeos)",
      "Excel Experto: 5 cursos (200 vídeos)",
      "Excel Financiero: 5 cursos (170 vídeos)"
    ],
    bonus: "+100 plantillas PREMIUM"
  },
  {
    id: 5,
    title: "MEGA PACK 5 – HACKING ÉTICO",
    icon: "🔒",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    courses: [
      "El arte del espionaje",
      "Hacking Enterprise",
      "Hacking Forensics",
      "Hacking Wi Fi PRO",
      "Hacking de Celulares",
      "System Hacking",
      "Hacking Ético",
      "Hacking Páginas web",
      "Hacking Redes Sociales"
    ]
  },
  {
    id: 6,
    title: "MEGA PACK 6 – INFOGRAFÍAS",
    icon: "📊",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "PAQUETE INFOGRAFÍAS CON 3000 PLANTILLAS EDITABLES",
    courses: [
      "Descarga y modifica miles de plantillas infográficas para tus proyectos",
      "PowerPoint",
      "Keynote",
      "Google Slides"
    ]
  },
  {
    id: 7,
    title: "MEGA PACK 7 – DISEÑO GRÁFICO",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    description: "Paquete 6×1 con más de 600GB de archivos",
    courses: [
      "Plantillas editables Corel Draw (300mil)",
      "Plantillas editables Photoshop (900mil)",
      "30.000+ Elementos Gráficos Listos Para Usar",
      "+3000 Diseños de Polos",
      "+1000 Diseños de Mascarillas",
      "Tarjetas de Presentación y mucho más…"
    ],
    bonus: "Pack de logotipos Editables, Pack presentaciones de Powerpoint, Pack de Vectores, Pack Tarjetas de presentación digital interactiva, Pack de estampado completo, Pack de Stories Animados",
    idealFor: ["Publicistas, Diseñadores", "Ecommerce", "Bienes Raíces", "Médicos, Odontólogos", "Abogados, Contadores", "Ingenieros, Arquitectos, Constructoras"]
  },
  {
    id: 8,
    title: "MEGA PACK 8 – MARKETING DIGITAL",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    courses: [
      "Marketing digital",
      "Facebook ADS de cero a experto(Aprenderás hacer Anuncios en Facebook)",
      "Aprende a crear promociones",
      "Comercio Electrónico"
    ]
  },
  {
    id: 9,
    title: "MEGA PACK 9 – INSTALADORES",
    icon: "💿",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    description: "TODOS LOS INSTALADORES",
    courses: [
      "Adobe Acrobat DC", "Adobe After Effects", "Adobe Animate", "Adobe Audition", "Adobe Bridge",
      "Adobe Character Animator", "Adobe Dimension", "Adobe Dreamweaver", "Adobe Illustrator",
      "Adobe InCopy", "Adobe InDesign", "Adobe Lightroom Classic", "Adobe Media Encoder",
      "Adobe Photoshop", "Adobe Prelude", "Adobe Premiere Pro", "Adobe XD", "Adobe Creative Cloud Core",
      "Adobe CoreSync", "Adobe CCX Process", "Adobe CC Library"
    ]
  },
  {
    id: 10,
    title: "MEGA PACK 10 – KID IMPRIMIBLE",
    icon: "🎈",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
    description: "ARMA LA FIESTA TEMÁTICA QUE SE TE OCURRA!!",
    courses: [
      "DISEÑO PROFESIONAL",
      "Con este kit recibirás los mejores KITS PRE-DISEÑADOS, PATRONES, IMÁGENES, LETRAS, MOLDES Y PLANTILLAS para poder imprimir",
      "Este kit imprimible, te permitirá ambientar tu fiesta, desde la decoración del lugar, hasta la mesa dulce y los souvenires. Absolutamente todo"
    ]
  },
  {
    id: 11,
    title: "MEGA PACK 11 – CUADROS EDITABLES",
    icon: "🖼️",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
    description: "PACK DE CUADROS EDITABLES EN PHOTOSHOP",
    courses: [
      "MÁS DE 160 DISEÑOS",
      "Día del Padre", "Día del Profesor", "Aniversario de Bodas", "Enamorados", "Cumpleaños",
      "Baby Shower", "Collage", "Infantiles", "Mucho más…"
    ],
    bonus: "Más de 12000 Fonts, Más de 20 Diseños en Illustrator, 18 Modelos de Mockups para tus diseños"
  },
  {
    id: 12,
    title: "MEGA PACK 12 – PORTADAS EDITABLES PARA Facebook",
    icon: "📘",
    image: "https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?w=800&q=80",
    courses: [
      "Pack de 100 portadas de Facebook 100% editables en photoshop"
    ]
  },
  {
    id: 13,
    title: "MEGA PACK 13 – LIBROS",
    icon: "📚",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
    courses: [
      "+ 3700 Libros Digitales en PDF"
    ]
  },
  {
    id: 14,
    title: "MEGA PACK 14 – GASTRONOMÍA",
    icon: "🍳",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80",
    description: "Ponemos a tu disposición nuestra mega colección de 5,500 libros de gastronomía internacional, cocina saludable, coctelería, carnes, bocadillos, repostería y más!",
    courses: [
      "Gastronomía Internacional: Mexicana, italiana, española, portuguesa, argentina, peruana, africana, oriental, venezolana, cubana, francesa, costarricense, ecuatoriana, griega, prehispánica",
      "Cocina molecular, cocina saludable, cocina vegana y vegetariana",
      "Bocadillos, carnes, barista café, desayunos, coctelería bartender",
      "Emprende en la cocina",
      "Emplatados y técnicas de corte",
      "Respostería, gluten free, keto, infantil, conservas y mermeladas",
      "Bonus Pack: Colección de libros de jugos y licuados"
    ]
  },
  {
    id: 15,
    title: "MEGA PACK 15 – SUPER MEMORIA",
    icon: "🧠",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    courses: [
      "SUPER CEREBRO – JIM KWIK",
      "Libera tu cerebro de todo límite y desarrolla una Super Memoria en solo 30 días con el Curso Super Cerebro de Jim Kwik en Español",
      "3 LIBROS POR SEMANA – Sistema de Lectura Veloz Avanzada",
      "Gabriel Blanco, Récord Mundial por Leer 1,000 Libros en 1,000 Días Revela Su Método de Lectura Que Le Permite a Cualquier Persona Convertirse en Un Lector Veloz y Llegar a Más de 1,000 PPM con 100% de Comprensión en 30 Días o Menos",
      "MEJORA TU VELOCIDAD & COMPRENSIÓN LECTORA e INCREMENTA TU PODER, IMPACTO E INFLUENCIA",
      "MEMORIA ÁGIL – RAMÓN CAMPAYO",
      "Aprende las técnicas de los 12 memorizadores más rápidos del mundo"
    ]
  },
  {
    id: 16,
    title: "MEGA PACK 16 – SUBLIMADOS",
    icon: "👕",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    courses: [
      "+3000 Diseños de Tazas",
      "Almohadas",
      "Polos",
      "Fuentes"
    ]
  },
  {
    id: 17,
    title: "MEGA PACK 17 – SUPER FX PREMIERE+ 4600 SOUND FX",
    icon: "🎬",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    description: "FX Presets está diseñado para ayudarlo a sorprender a su audiencia y exigir atención con nuestra gama de transiciones sorprendentes. Hay muchas opciones para elegir, todas clasificadas en categorías para que le resulte más fácil encontrar exactamente lo que está buscando.",
    courses: [
      "FX Presets para transiciones sorprendentes",
      "4600 efectos de sonido",
      "Categorías organizadas para fácil acceso",
      "Compatible con Adobe Premiere"
    ]
  },
  {
    id: 18,
    title: "MEGA PACK 18 – PROGRAMAS PARA DJ",
    icon: "🎧",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    courses: [
      "Adobe Audition",
      "Dj Server Pro",
      "Studio One",
      "Stereo Tool",
      "Track Studio",
      "Etc…"
    ]
  },
  {
    id: 19,
    title: "MEGA PACK 19 – PROYECTOS",
    icon: "📐",
    image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=800&q=80",
    courses: [
      "Autocad",
      "Costos y presupuestos",
      "Archicad",
      "Diseño y cálculo de instalaciones sanitarias para edificaciones",
      "Matlab",
      "Programación de obras con Ms Project",
      "Ms Project",
      "Residencia y supervisión de obras sanitarias",
      "Etc."
    ]
  },
  {
    id: 20,
    title: "MEGA PACK 20 – ARQUITECTURA",
    icon: "🏗️",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    courses: [
      "Autocad", "Archicad", "Tekla Structures", "Esat & Bim", "Watercad", "InfraWorks",
      "Cypecad", "Sketchup", "Valoración y liquidación de obra", "ArcGis"
    ]
  },
  {
    id: 21,
    title: "MEGA PACK 21 – REPARACIÓN DE CELULARES",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1609621838510-5ad474b7d25d?w=800&q=80",
    courses: [
      "APRENDE PASO A PASO COMO REPARAR EQUIPOS MÓVILES",
      "GUIAS EN PDF PARA UN RÁPIDO APRENDIZAJE"
    ]
  },
  {
    id: 22,
    title: "MEGA PACK 22 – DESARROLLO WEB",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    courses: [
      "Desarrollo Web Completo con HTML5, CSS3, JS AJAX PHP y MySQL",
      "Aprende Desarrollo Web con este curso 100% práctico, paso a paso y sin conocimientos previos"
    ]
  },
  {
    id: 23,
    title: "MEGA PACK 23 – MEGAPACK DE LIBROS",
    icon: "📚",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    courses: [
      "BIOGRAFIAS",
      "+16000 Libros",
      "AUTORES SELECTOS",
      "KIT COQUITO (PARA NIÑOS)",
      "FINANZAS Y MARKETING",
      "NETWORKMARKETING",
      "SEDUCCIÓN CONQUISTA y ATRACCIÓN",
      "NUTRICiCIÓN Y FITNESS",
      "Etc"
    ]
  },
  {
    id: 24,
    title: "MEGA PACK 24 – INGENIERÍA",
    icon: "⚙️",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    courses: [
      "Autocad 2D y 3D", "Ms Project", "Revit Estructural", "Revit Fontanería", "Revit Met",
      "Revit Arquitectura", "Ms. Excel", "Costos y presupuestos", "Metrados en edificaciones",
      "Lectura de planos"
    ]
  },
  {
    id: 25,
    title: "MEGA PACK 25 - CURSO ARMADO PC GAMER PROFESIONAL",
    icon: "🎮",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
    description: "de Cero a Experto",
    courses: [
      "BASICO: 7 Niveles donde aprenderás a elegir, seleccionar y comparar precio-calidad de componentes, errores que todos cometen al comprar, hacer conexiones y demás. Examen para ver si aprendiste",
      "INTERMEDIO: 7 Niveles donde aprenderás a configurar, ensamblar, instalar desde cero tu pc GAMER o de uso PROFESIONAL. Examen para ver si aprendiste",
      "AVANZADO: 7 Niveles donde aprenderás a repotenciar tu pc, hacer modificaciones a tu gusto, mantenimientos nivel profesional, configuraciones Y TIPS SECRETOS calidad A1"
    ]
  },
  {
    id: 26,
    title: "MEGA PACK 26 - GUITARRA ACÚSTICA desde cero",
    icon: "🎸",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80",
    courses: [
      "Afinación", "Ejercicios de Coordinación", "Acordes disonantes", "Videocursos, PDF's",
      "Arpegios", "Ritmos", "Acordes Naturales", "Escalas mayores", "Diapasón",
      "Acordes con novenas", "Acordes con sextas", "Acordes con cuartas", "Posiciones Abiertas",
      "Progresiones", "Acordes disminuidos"
    ]
  },
  {
    id: 27,
    title: "MEGA PACK 27 - PACK PRE UNIVERSITARIO",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    description: "30 MIL PDF",
    courses: [
      "BIBLIOTECA PREUNIVERSITARIA: Libros de distintas academias, boletines de todos los cursos, Exámenes, varios niveles, Diapositivas 2021, Simulacros de admisión, Editoriales y productos, Todas las academias (Aduni, Cepre UNI, Atlas, ACEM, Pitágoras, San Marcos)",
      "Materiales de las academias más famosas y reconocidas del país",
      "+ de 15 000 archivos descargables en PDF"
    ],
    subjects: [
      "Aritmética", "Algebra", "Trigonometría", "Geometría", "Física", "Química",
      "Geografía", "Psicología", "Historia", "Biología", "Raz. matemático", "Raz. verbal"
    ]
  },
  {
    id: 28,
    title: "MEGA PACK 28: FOTOGRAFÍA PROFESIONAL",
    icon: "📷",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
    courses: [
      "Fotografía desde 0",
      "Técnicas para la Fotografía",
      "Conceptos sobre la Fotografía"
    ]
  },
  {
    id: 29,
    title: "MEGA PACK 29: AULA VIRTUAL + regalos extras",
    icon: "🏫",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    courses: [
      "Curso para crear un CV exitoso",
      "Extras"
    ]
  },
  {
    id: 30,
    title: "MEGA PACK 30: PSICOLOGÍA PROFESIONAL",
    icon: "🧠",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    courses: [
      "Introducción a la Psicología",
      "Psicología nivel 1",
      "Psicología nivel 2",
      "Psicología nivel 3",
      "Etc... Y mucho más"
    ]
  },
  {
    id: 31,
    title: "MEGA PACK 31 - CURSOS DE MÚSICA",
    icon: "🎵",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    courses: [
      "Teoría musical completa",
      "Piano desde cero",
      "Guitarra eléctrica",
      "Composición musical",
      "Producción musical"
    ]
  },
  {
    id: 32,
    title: "MEGA PACK 32 - CURSOS DE FOTOGRAFÍA AVANZADA",
    icon: "📷",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80",
    courses: [
      "Fotografía de retrato",
      "Fotografía de paisajes",
      "Edición digital con Lightroom",
      "Fotografía de producto",
      "Fotografía de eventos"
    ]
  },
  {
    id: 33,
    title: "MEGA PACK 33 - CURSOS DE VIDEO MARKETING",
    icon: "📹",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    courses: [
      "Creación de videos virales",
      "Edición para redes sociales",
      "Marketing con videos",
      "Producción de contenido",
      "Monetización de videos"
    ]
  },
  {
    id: 34,
    title: "MEGA PACK 34 - CURSOS DE BLOCKCHAIN",
    icon: "⛓️",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
    courses: [
      "Introducción a Blockchain",
      "Programación Smart Contracts",
      "Criptomonedas",
      "Minería digital",
      "Seguridad Blockchain"
    ]
  },
  {
    id: 35,
    title: "MEGA PACK 35 - CURSOS DE IA Y MACHINE LEARNING",
    icon: "🤖",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    courses: [
      "Inteligencia Artificial desde cero",
      "Machine Learning con Python",
      "Redes Neuronales",
      "Procesamiento de Lenguaje Natural",
      "Visión por Computadora"
    ]
  },
  {
    id: 36,
    title: "MEGA PACK 36 - CURSOS DE NEGOCIOS DIGITALES",
    icon: "💼",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    courses: [
      "Emprendimiento digital",
      "E-commerce completo",
      "Dropshipping",
      "Marketing de afiliados",
      "Creación de marca personal"
    ]
  },
  {
    id: 37,
    title: "MEGA PACK 37 - CURSOS DE SALUD Y BIENESTAR",
    icon: "🧘",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    courses: [
      "Nutrición deportiva",
      "Yoga y meditación",
      "Entrenamiento personal",
      "Salud mental",
      "Hábitos saludables"
    ]
  },
  {
    id: 38,
    title: "MEGA PACK 38 - CURSOS DE FINANZAS PERSONALES",
    icon: "💰",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    courses: [
      "Inversión en bolsa",
      "Cripto inversiones",
      "Planificación financiera",
      "Libertad financiera",
      "Pasivos a ingresos"
    ]
  },
  {
    id: 39,
    title: "MEGA PACK 39 - CURSOS DE REDACCIÓN",
    icon: "✍️",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    courses: [
      "Redacción creativa",
      "Copywriting persuasivo",
      "Redacción web",
      "Guiones para videos",
      "Edición de textos"
    ]
  },
  {
    id: 40,
    title: "MEGA PACK 40 - CURSOS DE IDIOMAS",
    icon: "🌐",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    courses: [
      "Francés completo",
      "Alemán desde cero",
      "Italiano básico",
      "Portugués conversacional",
      "Mandarín introductorio"
    ]
  }
];

export default function Home() {
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-banner.jpg" 
            alt="Cursos y Recursos Digitales"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <Badge className="mb-4 bg-yellow-500 text-black hover:bg-yellow-400">
            <Clock className="w-4 h-4 mr-2" />
            OFERTA POR TIEMPO LIMITADO
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            40 MEGAPACKS POR $15.00 USD O 40.000 COP
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
            ¡La oferta más completa de cursos y recursos digitales! Aprende, crea y crece con nuestra mega colección.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black text-lg px-8 py-3" asChild>
              <a href="/payment">
                <Zap className="w-5 h-5 mr-2" />
                ¡QUIERO LOS 40 MEGAPACKS AHORA!
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              Ver todos los paquetes
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">40</div>
              <div className="text-gray-600">Megapacks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">2000+</div>
              <div className="text-gray-600">Cursos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">1TB+</div>
              <div className="text-gray-600">Contenido</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">$15</div>
              <div className="text-gray-600">Precio único</div>
            </div>
          </div>
        </div>
      </section>

      {/* MegaPacks Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">NUESTROS 40 MEGAPACKS</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explora nuestra increíble colección de cursos y recursos digitales diseñados para impulsar tu aprendizaje y creatividad.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="design">Diseño</TabsTrigger>
              <TabsTrigger value="tech">Tecnología</TabsTrigger>
              <TabsTrigger value="education">Educación</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {megaPacks.map((pack) => (
                  <MegaPackCard 
                    key={pack.id} 
                    pack={pack} 
                    onClick={() => setSelectedPack(pack.id)} 
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {megaPacks.filter(pack => [1, 6, 7, 11, 12, 16].includes(pack.id)).map((pack) => (
                  <MegaPackCard 
                    key={pack.id} 
                    pack={pack} 
                    onClick={() => setSelectedPack(pack.id)} 
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tech" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {megaPacks.filter(pack => [5, 9, 18, 19, 20, 21, 22, 24, 25].includes(pack.id)).map((pack) => (
                  <MegaPackCard 
                    key={pack.id} 
                    pack={pack} 
                    onClick={() => setSelectedPack(pack.id)} 
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {megaPacks.filter(pack => [2, 3, 4, 8, 13, 14, 15, 23, 26, 27, 28, 29, 30].includes(pack.id)).map((pack) => (
                  <MegaPackCard 
                    key={pack.id} 
                    pack={pack} 
                    onClick={() => setSelectedPack(pack.id)} 
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿POR QUÉ ELEGIR NUESTROS MEGAPACKS?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre las ventajas de nuestra oferta única y por qué miles de personas ya están aprendiendo con nosotros.
            </p>
          </div>

          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/images/benefits.jpg" 
              alt="Beneficios de nuestros megapacks"
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Acceso Inmediato</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Descarga todos los contenidos al instante. Sin esperas, sin complicaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Calidad Garantizada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cursos y recursos creados por profesionales con años de experiencia.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Para Todos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Desde principiantes hasta expertos. Hay contenido para cada nivel de conocimiento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/cta-banner.jpg" 
            alt="Oferta especial de megapacks"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            ¡NO ESPERES MÁS! OBTÉN LOS 40 MEGAPACKS AHORA
          </h2>
          <p className="text-xl mb-8 text-white">
            Por solo $15.00 USD o 40.000 COP tendrás acceso a toda esta increíble colección de cursos y recursos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black text-lg px-8 py-3" asChild>
              <a href="/payment">
                <Zap className="w-5 h-5 mr-2" />
                COMPRAR AHORA
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              Ver más detalles
            </Button>
          </div>
          <p className="mt-6 text-sm text-white opacity-80">
            ⚠️ Oferta por tiempo limitado. No te quedes sin esta oportunidad única.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/images/contact.jpg" 
                  alt="Soporte al cliente"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿TIENES DUDAS?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Consultas al interno o al WhatsApp:
              </p>
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  3042748687
                </div>
                <p className="text-gray-600 mb-6">
                  Nuestro equipo está disponible para ayudarte con cualquier pregunta sobre nuestros megapacks.
                </p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600"
                  onClick={() => window.open('https://wa.me/3042748687?text=Hola, estoy interesado en los 40 MEGAPACKS. ¿Podrían darme más información?', '_blank')}
                >
                  Contactar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MEGAPACKS</h3>
              <p className="text-gray-400">
                La mejor colección de cursos y recursos digitales al mejor precio.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Todos los Paquetes</a></li>
                <li><a href="#" className="hover:text-white">Ofertas</a></li>
                <li><a href="#" className="hover:text-white">Testimonios</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Diseño</a></li>
                <li><a href="#" className="hover:text-white">Tecnología</a></li>
                <li><a href="#" className="hover:text-white">Educación</a></li>
                <li><a href="#" className="hover:text-white">Marketing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Reembolsos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MEGAPACKS. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
}