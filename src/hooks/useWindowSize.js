import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useWindowSize = () => {
  const { pathname } = useHistory().location
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [slidesPerView, setSlidesPerView] = useState(window.innerWidth <= 768 ? 1.1 : 2)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    setSlidesPerView(window.innerWidth <= 768 ? 1.1 : 2)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pathname])

  return { windowWidth, windowHeight, slidesPerView, pathname }
}

export default useWindowSize;
