'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [screenInfo, setScreenInfo] = useState({
    width: undefined,
    height: undefined,
    size: undefined,
  });
  const [scrollInfo, setScrollInfo] = useState({
    scroll: 'none',
    lastScroll: 'none',
  });
  let lastScrollY = 0;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let size = 'sm'; // default to 'sm'

      if (width >= 640 && width < 768) size = 'sm';
      else if (width >= 768 && width < 1024) size = 'md';
      else if (width >= 1024 && width < 1280) size = 'lg';
      else if (width >= 1280 && width < 1536) size = 'xl';
      else if (width >= 1536) size = '2xl';

      setScreenInfo({ width, height, size });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      let scrollDirection = 'none';

      if (currentScrollY > lastScrollY) {
        scrollDirection = 'down';
      } else if (currentScrollY < lastScrollY) {
        scrollDirection = 'up';
      }

      setScrollInfo((prevState) => ({
        scroll: scrollDirection,
        lastScroll: prevState.scroll !== 'none' ? prevState.scroll : prevState.lastScroll,
      }));

      lastScrollY = currentScrollY;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ ...screenInfo, ...scrollInfo }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);
