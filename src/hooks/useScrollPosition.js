import React, { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = () => {
    if (window.scrollY !== 0) {
      setIsScrolling(true)
    } else {
      setIsScrolling(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [window.scrollY])

  return {
    isScrolling
  }
}

export default useScrollPosition
