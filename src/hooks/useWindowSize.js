import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useWindowSize = () => {
  const { pathname } = useHistory().location
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pathname])

  return { windowWidth, windowHeight }
}

export default useWindowSize;
