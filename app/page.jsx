import Script from "next/script";
import AuthPopupWrapper from "./components/AuthPopupWrapper";
import SupabaseBootstrap from "./components/SupabaseBootstrap";

export default function HomePage() {
  return (
    <>
      <SupabaseBootstrap />
      <AuthPopupWrapper />

      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js" strategy="afterInteractive" />

      <div className="max-w-md mx-auto px-4 py-6 md:max-w-2xl">
        <div>
          <header className="text-center mb-6 bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 p-5 rounded-2xl shadow-md text-white">
            <h1 className="text-3xl font-tournament tracking-tight leading-none drop-shadow-sm">
              🏆 COPA MUNDIAL 2026
            </h1>
            <p className="text-[11px] uppercase tracking-widest font-bold mt-1.5 text-indigo-100">
              Matcher Inteligente de Estampas
            </p>
          </header>

          <main id="app-container" className="bg-white p-5 rounded-2xl shadow-xl border border-slate-200">
            <div className="text-center py-8">
              <p className="text-sm text-slate-400 animate-pulse">Preparando el campo de juego...</p>
            </div>
          </main>
        </div>

        <footer className="text-center mt-8 space-y-1">
          <div className="family-signature" aria-label="Firma familiar jm">jm</div>
          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
            Asistente independiente para coleccionistas.
          </p>
          <p className="text-[9px] text-slate-400">
            100% Privado • Datos procesados en tu dispositivo • 2026
          </p>
        </footer>
      </div>

      <Script src="/legacy-app.js" strategy="afterInteractive" />
    </>
  );
}
