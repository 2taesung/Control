/**
 * msw 브라우저 환경 실행
 * */
export async function initBrowser() {
  if (typeof window != 'undefined') {
    const { worker } = await import('./browser');
    await worker.start();
  }
}

/**
 * msw Node 환경 실행
 * */
export async function initServer() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');

    server.listen({ onUnhandledRequest: 'bypass' });
  }
}
