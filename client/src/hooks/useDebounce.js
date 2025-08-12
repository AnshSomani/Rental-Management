import { useState, useEffect } from 'react';

// Custom hook to debounce a value
// This is useful for delaying an action (like an API call for search) until the user has stopped typing.
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (e.g., user is still typing)
      // This is how the delay is enforced.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default useDebounce;
