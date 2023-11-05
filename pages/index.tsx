import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SITE_PARAM } from '@src/constants/LOGIN';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(SITE_PARAM);
  }, [router]);
}
