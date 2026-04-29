import type { Profile } from '../../types';

interface Props {
  profile: Profile;
}

export function ClassicTemplate({ profile }: Props) {
  return (
    <div
      id="cv-preview"
      className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-14 py-12 text-gray-900"
    >
      <header className="border-b-2 border-gray-900 pb-6 text-center">
        <h1 className="text-4xl font-serif tracking-wide">{profile.nombre}</h1>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
          <span>{profile.correo}</span>
          <span>•</span>
          <span>{profile.numero}</span>
          <span>•</span>
          <span>{profile.fechaNacimiento}</span>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="border-b border-gray-300 pb-2 text-lg font-serif uppercase tracking-[0.18em]">
          Experiencia Profesional
        </h2>
        <div className="mt-5 space-y-6">
          {profile.experiencia.length > 0 ? (
            profile.experiencia.map((exp, index) => (
              <article key={`${exp.empresa}-${index}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.puesto}</h3>
                    <p className="text-sm italic text-gray-700">{exp.empresa}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.inicio} - {exp.fin}
                  </p>
                </div>
                {exp.descripcion && (
                  <p className="mt-2 text-sm leading-6 text-gray-700">{exp.descripcion}</p>
                )}
              </article>
            ))
          ) : (
            <p className="text-sm text-gray-500">Sin experiencia registrada.</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="border-b border-gray-300 pb-2 text-lg font-serif uppercase tracking-[0.18em]">
          Educación
        </h2>
        <div className="mt-5 space-y-5">
          {profile.educacion.length > 0 ? (
            profile.educacion.map((edu, index) => (
              <article key={`${edu.institucion}-${index}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold">{edu.titulo}</h3>
                    <p className="text-sm text-gray-700">{edu.institucion}</p>
                  </div>
                  <p className="text-sm text-gray-500">
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

      <section className="mt-10 grid grid-cols-2 gap-10">
        <div>
          <h2 className="border-b border-gray-300 pb-2 text-lg font-serif uppercase tracking-[0.18em]">
            Habilidades Técnicas
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {profile.habilidades.tecnicas.length > 0 ? (
              profile.habilidades.tecnicas.map((skill) => <li key={skill}>• {skill}</li>)
            ) : (
              <li className="text-gray-500">Sin habilidades registradas.</li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="border-b border-gray-300 pb-2 text-lg font-serif uppercase tracking-[0.18em]">
            Habilidades Blandas
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {profile.habilidades.blandas.length > 0 ? (
              profile.habilidades.blandas.map((skill) => <li key={skill}>• {skill}</li>)
            ) : (
              <li className="text-gray-500">Sin habilidades registradas.</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
