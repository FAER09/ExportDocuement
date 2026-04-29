import { AnimatePresence, motion } from 'motion/react';
import { X, MapPin, Code2, Cpu } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutUsModalProps {
  onClose: () => void;
}

function DeveloperCard({
  initial,
  name,
  role,
}: {
  initial: string;
  name: string;
  role: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border bg-card p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background uppercase tracking-widest">
          {initial}
        </div>
        <div>
          <h4>{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutUsModal({ onClose }: AboutUsModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background shadow-2xl"
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1774317549422-f53c6b6b73df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Baja California"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs">Mexicali, Baja California, Mexico</span>
            </div>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-border/50 bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              <h2 className="tracking-tight">CVEX - CV Exportation</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Somos Ramon Fernando e Ivan Alexandro. Creamos <strong>CVEX</strong> para guardar informacion de perfil
                en un solo lugar y generar documentos profesionales de forma mas rapida.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.35 }}
              className="rounded-xl border border-border bg-blue-50/30 dark:bg-blue-950/10 p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <h3>Nuestro proposito</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Simplificar la creacion de CV y cartas de presentacion para que el usuario se
                enfoque en el contenido, no en repetir el mismo proceso cada vez con <strong>CV Exportation</strong>.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DeveloperCard initial="E" name="Echavarria Contreras Ramon Fernando" role="Lic. en Sistemas Computacionales UABC" />
              <DeveloperCard initial="L" name="Lopez Leon Ivan Alexandro" role="Lic. en Sistemas Computacionales UABC" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className="space-y-2 border-t border-border pt-4"
            >
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Construido con</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
