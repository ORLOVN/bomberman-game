import { useState } from "react";

const useLocalStorage = (keyName: string, defaultValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }

      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: unknown) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      // eslint-disable-next-line
      console.warn("An error occured while setting value into LocalStorage");
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
