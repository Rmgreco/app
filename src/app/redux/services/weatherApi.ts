import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherProps } from '../weatherSlice';
import { WeatherCardProps } from '@/app/components/weatherCard';


export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',

  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherCardProps, string>({
      query: (city) => `weather?q=${city}&appid=0bfd1f48da1715cefa9cc403a456bd5b`,
    }),
  }),
});
export const { useGetWeatherQuery } = weatherApi;


export const geolocationApi = createApi({
  reducerPath: 'geolocationApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.opencagedata.com/geocode/v1/' }),
  endpoints: (builder) => ({
    getCurrentLocation: builder.query<string, { lat: number; lng: number }>({
      query: ({ lat, lng }) => `json?q=${lat}+${lng}&key=23d23199932041c5a9f9ce2abef4678c`,
    }),
  }),
});


export const { useGetCurrentLocationQuery } = geolocationApi;


