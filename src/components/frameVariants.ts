// src/components/frameVariants.ts
// Variantes de animacion compartidas por todos los frames (Portada, EtapaFrame, FrameFinal)

export const variantesFrame = {
  entra: { opacity: 0, scale: 1.03, filter: 'blur(8px)' },
  centro: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  sale: { opacity: 0, scale: 0.97, filter: 'blur(8px)' },
};

export const transicionFrame = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };
