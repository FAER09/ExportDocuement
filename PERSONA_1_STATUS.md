# CV Generator v3 — Estado Persona 1

## ✅ Setup completado (Día 1 AM)

### Configuración
- [x] Vite 6 + React 18 con TypeScript
- [x] Tailwind CSS 4 (plugin nativo, sin postcss)
- [x] Path alias `@/` en tsconfig y vite.config
- [x] Tema Nothing Phone en src/index.css
- [x] Font Inter integrada en index.html
- [x] shadcn/ui componentes (Button, Input, Label, Textarea, Select, Dialog, Card, Avatar, Badge, Separator)
- [x] Dependencias: react-hook-form, zod, html2pdf.js, lucide-react

### Tipos y Context
- [x] src/types/cv.types.ts — tipos de CV, Profile, Experience, Education, Skill
- [x] src/context/ProfilesContext.tsx — contexto global con localStorage
- [x] src/schemas/cvSchema.ts — validación Zod

### Formularios (Persona 1)
- [x] PersonalInfoForm.tsx — datos personales con validación
- [x] ExperienceForm.tsx — agregar/eliminar experiencias
- [x] EducationForm.tsx — agregar/eliminar educación
- [x] SkillsForm.tsx — agregar skills técnicas/blandas
- [x] FormStepper.tsx — orquesta los 4 pasos

### Páginas
- [x] WelcomePage.tsx — selector de perfiles + dialog para nuevo perfil
- [x] Stubs: EditorPage.tsx, About.tsx (Persona 2 los completará)

### Layout (Stubs basados en Persona 1)
- [x] ProfileAvatar.tsx — usando Radix Avatar
- [x] DocumentCards.tsx — selector de templates (Modern / Classic)

## 📋 Próximos pasos para Persona 2

### Día 1 PM — Layout + Templates + Export
- [ ] TopBar.tsx — header con avatar central
- [ ] ModernTemplate.tsx — template HTML puro para PDF
- [ ] ClassicTemplate.tsx — template clásico HTML puro
- [ ] ExportButtons.tsx — botones PDF/JSON

### Día 2 AM — Integración
- [ ] App.tsx — componentes de Persona 1 + Persona 2
- [ ] EditorPage.tsx completo — Select template + Preview

### Día 2 PM — About + Deploy
- [ ] About.tsx — stack, team, features
- [ ] Deploy a Vercel

## 🔗 Comandos útiles

```bash
# Dev server en http://localhost:5174
npm run dev

# Rama para Persona 1 (si necesita)
git checkout -b feature/profiles-form

# Rama para Persona 2 (cuando llegue el momento)
git checkout -b feature/ui-templates-export
```

## 📝 Interfaz acordada entre P1 ↔ P2

### Exports de P1 que P2 necesita
```ts
// Context
useProfiles() → { profiles, activeProfile, activeProfileId, selectProfile, updateActiveCV, ... }

// Tipos
CVData, Profile, Experience, Education, Skill, PersonalInfo

// Páginas (P1 completa)
WelcomePage({ onDocSelect: (template) => void })
```

### Imports que P2 debe proporcionar
```tsx
// Layout
TopBar({ onAbout: () => void })
ProfileAvatar({ name, size?, className? }) // ya hecho ✓
DocumentCards({ onSelect: (template) => void }) // ya hecho ✓

// Componentes
ModernTemplate({ data: CVData })
ClassicTemplate({ data: CVData })
ExportButtons()

// Páginas
EditorPage({ onBack: () => void })
About({ onBack: () => void })

// App.tsx final
- integra ProfilesProvider
- rutas: welcome | editor | about
```

---

**Servidor corriendo en http://localhost:5174** ✅

¡Listo para comenzar a desarrollar los formularios y WelcomePage!
