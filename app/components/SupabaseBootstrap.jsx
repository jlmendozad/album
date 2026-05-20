"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SupabaseBootstrap() {
  useEffect(() => {
    window.supabaseClient = supabase;
  }, []);

  return null;
}