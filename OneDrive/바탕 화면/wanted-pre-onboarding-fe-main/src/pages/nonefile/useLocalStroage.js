import { useEffect, useState } from 'react';

// custom Hook
function useLocasStroage(key) {
  const [state, setState] = useState(() => {
    window.localStorage.getItem(key);
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
export default useLocasStroage;
