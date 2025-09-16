import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 250) => {
  const [deboundedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return deboundedValue;
};

export default useDebounce;
