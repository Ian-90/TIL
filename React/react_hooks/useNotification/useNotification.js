import React, { useState, useEffect } from 'react';

export const useNotification = (title, options) => {
  if(!("Notification" in window)) return;

  const fireNotification = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if(permission === 'granted') {
          new Notification(title, options)
        } else {
          return;
        }
      })
    } else {
      new Notification(title, options)
    }
  }

  return fireNotification
}
