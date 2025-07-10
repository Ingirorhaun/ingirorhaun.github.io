import React from 'react';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiSass,
  SiPostgresql,
  SiOracle,
  SiGithub,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiVite,
} from 'react-icons/si';
import { FaTools, FaGlobe } from 'react-icons/fa';

export const getTechIcon = (tech: string): React.ComponentType<{ className?: string, title?: string }> => {
  const techLower = tech.toLowerCase();
  const iconMap: Record<string, React.ComponentType<{ className?: string, title?: string }>> = {
    react: SiReact,
    javascript: SiJavascript,
    typescript: SiTypescript,
    node: SiNodedotjs,
    nodejs: SiNodedotjs,
    html: SiHtml5,
    css: SiCss3,
    sass: SiSass,
    scss: SiSass,
    postgresql: SiPostgresql,
    github: SiGithub,
    express: SiExpress,
    oracledb: SiOracle,
    nextjs: SiNextdotjs,
    tailwind: SiTailwindcss,
    bootstrap: SiBootstrap,
    vite: SiVite,
    website: FaGlobe,
  };
  
  return iconMap[techLower] || FaTools;
};