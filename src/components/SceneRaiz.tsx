import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function SceneRaiz() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="scene scene-raiz">
            <motion.div className="scene-bg" style={{ y }} />
            <motion.div className="scene-content" style={{ opacity }}>
                <span className="icono">🌰</span>
                <h2>Antes del Nombre</h2>
                <p>Antes de crecer, hay que echar raíces.</p>
                <input placeholder="Palabra clave..." />
            </motion.div>
        </section>
    );
}