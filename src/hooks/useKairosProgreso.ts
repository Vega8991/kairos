// src/hooks/useKairosProgreso.ts
import { useState, useEffect, useCallback } from 'react';
import type { Vista } from '../types/kairos.types';
import { etapas } from '../data/etapas.data';

const CLAVE_STORAGE = 'kairos-vista';

export function useKairosProgreso() {
  const [vista, setVista] = useState<Vista>(() => {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return (guardado as Vista) || 'portada';
  });

  useEffect(() => {
    localStorage.setItem(CLAVE_STORAGE, vista);
  }, [vista]);

  const siguienteVista = useCallback((actual: Vista): Vista => {
    if (actual === 'portada') return etapas[0].id;
    const idx = etapas.findIndex((e) => e.id === actual);
    if (idx >= 0 && idx < etapas.length - 1) return etapas[idx + 1].id;
    return 'final';
  }, []);

  const anteriorVista = useCallback((actual: Vista): Vista => {
    if (actual === 'portada') return 'portada';
    if (actual === 'final') return etapas[etapas.length - 1].id;
    const idx = etapas.findIndex((e) => e.id === actual);
    if (idx > 0) return etapas[idx - 1].id;
    return 'portada';
  }, []);

  const avanzar = useCallback(() => {
    setVista((actual) => siguienteVista(actual));
  }, [siguienteVista]);

  const retroceder = useCallback(() => {
    setVista((actual) => anteriorVista(actual));
  }, [anteriorVista]);

  const reiniciar = useCallback(() => {
    localStorage.removeItem(CLAVE_STORAGE);
    setVista('portada');
  }, []);

  return { vista, avanzar, retroceder, reiniciar };
}
