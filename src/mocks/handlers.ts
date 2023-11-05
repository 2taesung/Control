import { http, HttpResponse } from 'msw';

import {
  scheduleData,
  efScheduleData,
  humScheduleData,
  instanceData,
  humInstanceData,
  efInstanceData,
} from './mockData';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * api 스펙 swagger 참조
 * */
export const handlers = [
  http.get(`${baseUrl}/uc/device/schedule?site=md&sector=a`, () => {
    return HttpResponse.json(scheduleData);
  }),
  http.get(`${baseUrl}/hum/device/schedule?site=md&sector=a`, () => {
    return HttpResponse.json(humScheduleData);
  }),
  http.get(`${baseUrl}/ef/device/schedule?site=md&sector=a`, () => {
    return HttpResponse.json(efScheduleData);
  }),
  http.get(`${baseUrl}/uc/device/machine?site=md&sector=a`, () => {
    return HttpResponse.json(instanceData);
  }),
  http.get(`${baseUrl}/hum/device/machine?site=md&sector=a`, () => {
    return HttpResponse.json(humInstanceData);
  }),
  http.get(`${baseUrl}/ef/device/machine?site=md&sector=a`, () => {
    return HttpResponse.json(efInstanceData);
  }),
];
