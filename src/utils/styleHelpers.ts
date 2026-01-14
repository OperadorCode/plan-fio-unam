export const CAREER_THEME_STYLES: Record<
  string,
  { bg: string; text: string; shadow: string }
> = {
  cyan: {
    bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    text: "text-gray-900",
    shadow: "shadow-cyan-500/20",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-500 to-blue-600",
    text: "text-white",
    shadow: "shadow-blue-500/20",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-500 to-orange-600",
    text: "text-gray-900",
    shadow: "shadow-orange-500/20",
  },
  indigo: {
    bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    text: "text-white",
    shadow: "shadow-indigo-500/20",
  },
  green: {
    bg: "bg-gradient-to-br from-green-500 to-green-600",
    text: "text-white",
    shadow: "shadow-green-500/20",
  },
  rose: {
    bg: "bg-gradient-to-br from-rose-500 to-rose-600",
    text: "text-white",
    shadow: "shadow-rose-500/20",
  },
  yellow: {
    bg: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    text: "text-gray-900",
    shadow: "shadow-yellow-500/20",
  },
  gray: {
    bg: "bg-gradient-to-br from-gray-500 to-gray-600",
    text: "text-white",
    shadow: "shadow-gray-500/20",
  },
};

export const getCareerStyles = (color: string | undefined) => {
  return CAREER_THEME_STYLES[color || "blue"] || CAREER_THEME_STYLES["blue"];
};
