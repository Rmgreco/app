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
