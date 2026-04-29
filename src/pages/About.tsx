interface Props { onBack: () => void; }

export function About({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-background p-6">
      <p>About - Persona 2</p>
      <button onClick={onBack}>Volver</button>
    </div>
  );
}
