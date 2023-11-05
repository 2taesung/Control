import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Apps, Sites, WsParamsWithoutSector } from '@src/types';

export default function useRequiredQuery(): WsParamsWithoutSector {
  const { query } = useRouter();
  let { site, app } = query;
  const [localState, setLocalState] = useLocalStorage('localState', {
    site,
    app,
  });

  useEffect(() => {
    setLocalState({ site, app });
  }, [setLocalState, site, app]);

  if (site === undefined || app === undefined) {
    [site, app] = [localState.site, localState.app];
  }

  if (Array.isArray(site) || Array.isArray(app)) {
    throw new Error('Query parameters should not be arrays');
  }

  if (typeof site !== 'string' || typeof app !== 'string') {
    throw new Error('Query parameters should be strings');
  }

  const appAsAppsType = app as Apps; // app 값을 Apps 타입으로 단언합니다.
  const siteAsSitesType = site as Sites; // app 값을 Apps 타입으로 단언합니다.

  return { site: siteAsSitesType, app: appAsAppsType };
}
