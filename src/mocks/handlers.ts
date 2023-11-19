import { http, HttpResponse } from 'msw';

import {
  scheduleData,
  humScheduleData,
  efScheduleData,
  instanceData,
  humInstanceData,
  efInstanceData,
} from './mockData';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  http.get(`${baseUrl}/:app/device/schedule`, req => {
    const { app } = req.params;
    const url = new URL(req.request.url);
    const site = url.searchParams.get('site');
    const sector = url.searchParams.get('sector');

    let data;
    switch (app) {
      case 'uc':
        data = { ...scheduleData, site, sector };
        break;
      case 'hum':
        data = { ...humScheduleData, site, sector };
        break;
      case 'ef':
        data = { ...efScheduleData, site, sector };
        break;
      default:
        return new HttpResponse(null, {
          status: 404,
          statusText: 'app not found',
        });
    }

    return HttpResponse.json(data);
  }),
  http.get(`${baseUrl}/:app/device/machine`, req => {
    const { app } = req.params;
    const url = new URL(req.request.url);
    const site = url.searchParams.get('site');
    const sector = url.searchParams.get('sector');

    let data;
    switch (app) {
      case 'uc':
        data = { ...instanceData, site, sector };
        break;
      case 'hum':
        data = { ...humInstanceData, site, sector };
        break;
      case 'ef':
        data = { ...efInstanceData, site, sector };
        break;
      default:
        return new HttpResponse(null, {
          status: 404,
          statusText: 'app not found',
        });
    }

    return HttpResponse.json(data);
  }),
];
