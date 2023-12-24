import {useEffect, useState} from 'react';
import {getMiniApps} from './src/api/miniRegistry';

export const useApp = () => {
  const [miniApps, setMiniApps] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await getMiniApps();
      if (data) {
        setMiniApps(data);
      }
    }
    fetchData();
  }, []);

  return {miniApps};
};
