import { useState, useEffect } from 'react';

const TABLET_BREAKPOINT = 768;
const MOBILE_BREAKPOINT = 480;

export const useResponsive = (breakpoint: number = TABLET_BREAKPOINT) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > breakpoint);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > breakpoint);
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return { isDesktop, isMobile };
};