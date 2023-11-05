import { useEffect, useRef, useState } from 'react';

import { getDefaultSector } from '@src/functions/getDefaultSector';
import { WsParams } from '@src/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL_BASE;

const MAX_RETRY_COUNT = 5;
const MIN_INTERVAL = 1000;
const MAX_JITTER = 200;

const ONERROR_CODE = 4000;
const NORMAL_CODE = 1000;

const buildUrl = ({ app, site, sector }: WsParams) =>
  `${WS_URL}/${app}/device/machine?site=${site}&sector=${sector}`;
const isWebSocketOpen = (wsInstance: WebSocket) =>
  wsInstance && wsInstance.readyState === WebSocket.OPEN;

export const useMonitorWebsocket = ({ site, app, sector }: WsParams) => {
  sector = sector || getDefaultSector({ site, app });

  const isMounted = useRef(true);
  const retryCount = useRef(0);
  const ws = useRef<null | WebSocket>(null);
  const [machineData, setMachineData] = useState(null);

  //초기화
  useEffect(() => {
    retryCount.current = 0;
    isMounted.current = true;
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(buildUrl({ app, site, sector })); //새로운 websocket 연결은 명시적으로 인자로 표현

    const setupWebSocket = (wsInstance: WebSocket) => {
      wsInstance.onopen = () => {
        retryCount.current = 0; // websocket 첫 연결시 setting
        console.info('WebSocket 연결');
      };

      wsInstance.onmessage = event => {
        if (isMounted.current && isWebSocketOpen(wsInstance)) {
          const { data, type } = JSON.parse(event.data);
          // console.log(data);
          switch (type) {
            case 'machineData':
              setMachineData(data);
              break;
            default:
              console.log(`Sorry, we are out of ${type}.`);
          }
        }
      };

      wsInstance.onerror = event => {
        if (isMounted.current) {
          console.error('WebSocket Error:', event);
          wsInstance.close(ONERROR_CODE); //명시적 close 실행 with custom code
        }
      };

      wsInstance.onclose = event => {
        if (isMounted.current) {
          console.info('WebSocket closed:', event.code, event.reason);

          //retry
          if (event.code !== NORMAL_CODE) {
            if (event.code === ONERROR_CODE) {
              // Exponential Backoff
              let interval = MIN_INTERVAL * Math.pow(2, retryCount.current);

              // Adding Jitter(random)
              const jitter =
                Math.floor(Math.random() * (MAX_JITTER * 2 + 1)) - MAX_JITTER;
              interval += jitter;

              if (retryCount.current < MAX_RETRY_COUNT) {
                setTimeout(() => {
                  ws.current = new WebSocket(buildUrl({ app, site, sector }));
                  setupWebSocket(ws.current);
                  retryCount.current++;
                }, interval);
              }
            }
          }
        }
      };
    };

    setupWebSocket(ws.current);

    return () => {
      if (ws.current && isWebSocketOpen(ws.current)) {
        console.info('WebSocket 끊김');
        isMounted.current = false;
        ws.current.close();
      }
    };
  }, [sector, site, app]);

  return { machineData };
};
