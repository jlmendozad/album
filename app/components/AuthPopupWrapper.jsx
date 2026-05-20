"use client";

import { useEffect, useState } from "react";
import AuthPopup from "./AuthPopup";

export default function AuthPopupWrapper() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AuthPopup
        forceOpen={open}
        onClose={() => setOpen(false)}
        onAuthReady={(usuario) => {
          window.sesionUsuario = usuario;
          window.dispatchEvent(new CustomEvent("auth-ready", { detail: usuario }));
          setOpen(false);
        }}
      />

      <AuthAccountBridge openLogin={() => setOpen(true)} />
    </>
  );
}

function AuthAccountBridge({ openLogin }) {
  useEffect(() => {
    window.abrirPopupLogin = openLogin;

    return () => {
      delete window.abrirPopupLogin;
    };
  }, [openLogin]);

  return null;
}