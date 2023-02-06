import { useState } from "react";

const initializeState = (key, defaultValue) => {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};

export const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() =>
    initializeState(key, defaultValue)
  );

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log(error);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
