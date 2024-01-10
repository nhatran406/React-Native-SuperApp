import {useEffect, useMemo, useState} from 'react';
import {getMiniApps} from './src/api/miniRegistry';
import {Platform} from 'react-native';

export interface App {
  bundleId: string;
  appName: string;
}

export const useApp = () => {
  const [miniApps, setMiniApps] = useState<any>(null);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const data = await getMiniApps();
      console.info('TODO: data', data);
      if (data) {
        setMiniApps(data);
      }
    }
    fetchData();
  }, []);

  const appInStore: Array<App> = useMemo(
    () =>
      miniApps
        ? [
            {
              bundleId: `index.${Platform.OS}-${miniApps.MiniAppOne.code}.${miniApps.MiniAppOne.version}.bundle`,
              appName: miniApps.MiniAppOne?.name,
              port: 8091,
            },
            {
              appName: 'MiniAppTwo',
              bundleId: `index.${Platform.OS}-${miniApps.MiniAppTwo.code}.${miniApps.MiniAppTwo.version}.bundle`,
              port: 8092,
            },
          ]
        : [],
    [miniApps],
  );

  return {miniApps, appInStore};
};
