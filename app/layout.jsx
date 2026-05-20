import "./globals.css";

export const metadata = {
  title: "Matcher de Estampas - Copa 2026",
  description: "Webapp para controlar álbum Panini y generar intercambios."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
