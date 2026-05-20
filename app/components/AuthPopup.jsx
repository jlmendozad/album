"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthPopup({ onAuthReady, forceOpen = false, onClose }) {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("inicio");
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [nombre, setNombre] = useState("");
  const [registroEmail, setRegistroEmail] = useState("");
  const [registroPassword, setRegistroPassword] = useState("");

  useEffect(() => {
    const revisarSesion = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        onAuthReady?.({
          id: data.session.user.id,
          email: data.session.user.email,
          nombre:
            data.session.user.user_metadata?.nombre ||
            data.session.user.user_metadata?.full_name ||
            data.session.user.email,
          invitado: false,
        });

        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    revisarSesion();
  }, []);

  useEffect(() => {
    if (forceOpen) {
      setMode("inicio");
      setVisible(true);
    }
  }, [forceOpen]);

  const continuarComoInvitado = () => {
    onAuthReady?.({
      id: null,
      nombre: "Invitado",
      email: null,
      invitado: true,
    });

    setVisible(false);
    onClose?.();
  };

  const iniciarSesion = async () => {
    if (!loginEmail || !loginPassword) {
      alert("Ingresa correo y contraseña.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    setLoading(false);

    if (error) {
      alert("No se pudo iniciar sesión: " + error.message);
      return;
    }

    onAuthReady?.({
      id: data.user.id,
      email: data.user.email,
      nombre: data.user.user_metadata?.nombre || data.user.email,
      invitado: false,
    });

    setVisible(false);
    onClose?.();
  };

  const registrarse = async () => {
    if (!nombre || !registroEmail || !registroPassword) {
      alert("Completa nombre, correo y contraseña.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: registroEmail,
      password: registroPassword,
      options: {
        data: {
          nombre,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert("No se pudo registrar: " + error.message);
      return;
    }

    alert("Cuenta creada.");
    setMode("login");
  };

  const continuarConGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 space-y-4 animate-fade-in">
        <div className="text-center">
          <h2 className="text-xl font-tournament text-indigo-700">
            Matcher de Estampas
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Inicia sesión para guardar tu progreso o continúa como invitado.
          </p>
        </div>

        {mode === "inicio" && (
          <div className="space-y-3">
            <button
              onClick={() => setMode("login")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm"
            >
              Iniciar sesión
            </button>

            <button
              onClick={continuarComoInvitado}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm"
            >
              Continuar como invitado
            </button>

            <p className="text-[10px] text-center text-slate-400">
              Como invitado, tus datos solo se guardan en este dispositivo.
            </p>
          </div>
        )}

        {mode === "login" && (
          <div className="space-y-3">
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              placeholder="Correo"
            />

            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              placeholder="Contraseña"
            />

            <button
              onClick={iniciarSesion}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Entrar"}
            </button>

            <button
              onClick={continuarConGoogle}
              className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl text-sm"
            >
              Continuar con Google
            </button>

            <button
              onClick={() => setMode("registro")}
              className="w-full text-indigo-700 font-bold text-xs"
            >
              Crear una cuenta
            </button>

            <button
              onClick={() => setMode("inicio")}
              className="w-full text-slate-400 text-xs"
            >
              Volver
            </button>
          </div>
        )}

        {mode === "registro" && (
          <div className="space-y-3">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              placeholder="Nombre"
            />

            <input
              type="email"
              value={registroEmail}
              onChange={(e) => setRegistroEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              placeholder="Correo"
            />

            <input
              type="password"
              value={registroPassword}
              onChange={(e) => setRegistroPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              placeholder="Contraseña"
            />

            <button
              onClick={registrarse}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm disabled:opacity-60"
            >
              {loading ? "Creando cuenta..." : "Registrarme"}
            </button>

            <button
              onClick={continuarConGoogle}
              className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-2.5 rounded-xl text-sm"
            >
              Registrarme con Google
            </button>

            <button
              onClick={() => setMode("login")}
              className="w-full text-indigo-700 font-bold text-xs"
            >
              Ya tengo cuenta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}