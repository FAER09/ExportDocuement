interface Props { onBack: () => void; }

export function EditorPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-background p-6">
      <p>Editor - Persona 2</p>
      <button onClick={onBack}>Volver</button>
    </div>
  );
}
