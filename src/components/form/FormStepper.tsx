import { useState }        from "react";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm }   from "./ExperienceForm";
import { EducationForm }    from "./EducationForm";
import { SkillsForm }       from "./SkillsForm";
import { CVData, Skill }    from "../../types/cv.types";
import { cn }               from "@/lib/utils";

const steps = ["Personal", "Experiencia", "Educación", "Habilidades"];

interface Props {
  onComplete: (cvData: CVData) => void;
}

export function FormStepper({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CVData>>({
    experience: [], education: [], skills: [], template: "modern",
  });

  const handlePersonal   = (data: any)      => { setFormData(p => ({ ...p, personalInfo: data })); setStep(1); };
  const handleExperience = (experience: any[]) => { setFormData(p => ({ ...p, experience })); setStep(2); };
  const handleEducation  = (education: any[])  => { setFormData(p => ({ ...p, education })); setStep(3); };
  const handleSkills     = (skills: Skill[])   => onComplete({ ...formData, skills } as CVData);

  return (
    <div className="w-full">
      {/* Stepper — estilo Nothing Phone */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all",
              i < step  && "bg-primary text-primary-foreground",
              i === step && "bg-primary text-primary-foreground ring-4 ring-primary/20",
              i > step  && "bg-secondary text-muted-foreground border border-border"
            )}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className={cn(
              "text-xs ml-1 hidden sm:block",
              i === step ? "text-foreground" : "text-muted-foreground"
            )}>
              {s}
            </span>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-px mx-2", i < step ? "bg-primary" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      {step === 0 && <PersonalInfoForm defaultValues={formData.personalInfo} onNext={handlePersonal} />}
      {step === 1 && <ExperienceForm   defaultValues={formData.experience}   onNext={handleExperience} onBack={() => setStep(0)} />}
      {step === 2 && <EducationForm    defaultValues={formData.education}    onNext={handleEducation}  onBack={() => setStep(1)} />}
      {step === 3 && <SkillsForm       defaultValues={formData.skills}       onFinish={handleSkills}   onBack={() => setStep(2)} />}
    </div>
  );
}
