import React, { useState, useEffect, useRef } from 'react';

export const useFullScreen = (onFullS) => {
  const element = useRef()
  const triggerFullScreen = () => {
    if (element.current) {
      element.current.requestFullScreen()
      if (onFullS && typeof onFullS === 'function') {
        onFullS(true)
      }
    }
  }

  const exitFull = () => {
    document.exitFullscreen()
    if (onFullS && typeof onFullS === 'function') {
      onFullS(false)
    }
  }
  return { element, triggerFullScreen, exitFull }
}
