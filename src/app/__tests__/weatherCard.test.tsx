import React from 'react';
import { render } from '@testing-library/react';
import WeatherCard from '../components/weatherCard';
import '@testing-library/jest-dom'


describe('WeatherCard', () => {
    const mockWeatherData = {
        name: 'Fortaleza',
        main: {
          temp: 28,
          feels_like: 30,
          temp_min: 26,
          temp_max: 30,
          pressure: 1010,
          humidity: 80,
        },
        weather: [
          {
            main: 'Clear',
            description: 'Clear sky',
            icon: '01d',
          },
        ],
      };
      
  it('should render correctly', () => {
    // Renderiza o componente
    const { getByText } = render(<WeatherCard name={mockWeatherData.name} main={mockWeatherData.main} weather={mockWeatherData.weather}/>);

    // Verifica se um elemento está presente na tela
    const titleElement = getByText('Fortaleza');
    expect(titleElement).toBeInTheDocument();
  });
});
