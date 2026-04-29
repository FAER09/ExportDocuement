import type { Profile } from '../../types';

interface Props {
  profile: Profile;
}

export function ModernTemplate({ profile }: Props) {
  return (
    <div
      id="cv-preview"
      className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white text-gray-900"
    >
      <div className="grid min-h-[1123px] grid-cols-[240px_1fr]">
        <aside className="bg-gray-900 px-8 py-10 text-white">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">Perfil</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight">{profile.nombre}</h1>
          </div>

          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
              Contacto
            </h2>
            <div className="space-y-2 text-sm text-gray-200">
              <p>{profile.correo}</p>
              <p>{profile.numero}</p>
              <p>{profile.fechaNacimiento}</p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
              Habilidades
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gray-400">Técnicas</p>
                <div className="flex flex-wrap gap-2">
                  {profile.habilidades.tecnicas.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gray-400">Blandas</p>
                <div className="flex flex-wrap gap-2">
                  {profile.habilidades.blandas.map((skill) => (
                    <span key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </aside>

        <main className="px-10 py-10">
          <section className="mb-10">
            <h2 className="border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
              Experiencia
            </h2>
            <div className="mt-5 space-y-6">
              {profile.experiencia.length > 0 ? (
                profile.experiencia.map((exp, index) => (
                  <article key={`${exp.empresa}-${index}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.puesto}</h3>
                        <p className="text-sm text-gray-600">{exp.empresa}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                        {exp.inicio} - {exp.fin}
                      </p>
                    </div>
                    {exp.descripcion && (
                      <p className="mt-3 text-sm leading-6 text-gray-700">{exp.descripcion}</p>
                    )}
                  </article>
                ))
              ) : (
                <p className="text-sm text-gray-500">Sin experiencia registrada.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="border-b border-gray-200 pb-2 text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
              Educación
            </h2>
            <div className="mt-5 space-y-5">
              {profile.educacion.length > 0 ? (
                profile.educacion.map((edu, index) => (
                  <article key={`${edu.institucion}-${index}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold">{edu.titulo}</h3>
                        <p className="text-sm text-gray-600">{edu.institucion}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                        {edu.inicio} - {edu.fin}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-sm text-gray-500">Sin educación registrada.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
