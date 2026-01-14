import {
  HardHat,
  Zap,
  Factory,
  Laptop,
  Cpu,
  ShieldAlert,
  Bot,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export const getCareerIcon = (iconName: string | undefined, size = 18) => {
  switch (iconName) {
    case "HardHat":
      return <HardHat size={size} />;
    case "Zap":
      return <Zap size={size} />;
    case "Factory":
      return <Factory size={size} />;
    case "Laptop":
      return <Laptop size={size} />;
    case "Cpu":
      return <Cpu size={size} />;
    case "ShieldAlert":
      return <ShieldAlert size={size} />;
    case "Bot":
      return <Bot size={size} />;
    case "ShieldCheck":
      return <ShieldCheck size={size} />;
    default:
      return <GraduationCap size={size} />;
  }
};
