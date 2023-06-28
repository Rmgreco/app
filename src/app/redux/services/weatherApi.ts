import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherCardProps } from '@/app/components/weatherCard';


export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),

  endpoints: (builder) => ({
    getWeather: builder.query<WeatherCardProps, string>({
      query: (city) => `weather?q=${city}&appid=33367cf2d0f74ff25bc9b9d7c74213e7`,
    }),
  }),
});
export const { useGetWeatherQuery } = weatherApi;