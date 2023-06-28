import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import WeatherCard from '../components/weatherCard';
import '@testing-library/jest-dom';

describe('WeatherCard', () => {
  const mockWeatherData = {
    name: 'Fortaleza',
    main: {
      temp: 300,
      feels_like: 298,
      temp_min: 295,
      temp_max: 305,
      pressure: 1000,
      humidity: 80,
    },
    weather: [
      {
        main: 'Clouds',
        description: 'Cloudy weather',
        icon: '01d',
      },
    ],
    wind: {
      speed: 10,
      deg: 180,
      gust: 15,
    },
    isFavorite: false,
    toggleFavorite: jest.fn(),
  };

  it('should render correctly', () => {
    // Renderiza o componente
    const { getByText, getByTestId } = render(
      <WeatherCard
        name={mockWeatherData.name}
        main={mockWeatherData.main}
        weather={mockWeatherData.weather}
        wind={mockWeatherData.wind}
        isFavorite={mockWeatherData.isFavorite}
        toggleFavorite={mockWeatherData.toggleFavorite}
      />
    );

    // Verifica se um elemento está presente na tela
    const titleElement = getByText('Fortaleza');
    expect(titleElement).toBeInTheDocument();

    const tempElemnt = getByText(`${(300- 273.15).toFixed(1)}°C`);
    expect(tempElemnt).toBeInTheDocument();

    const temp_maxElement = getByText(`Max temperature today : ${(305 - 273.15).toFixed(1)}°C`);
    expect(temp_maxElement).toBeInTheDocument();


    // Simula um clique no botão de favorito
    const favoriteButton = getByTestId('favorite-button');
    fireEvent.click(favoriteButton);

    // Verifica se a função toggleFavorite foi chamada
    expect(mockWeatherData.toggleFavorite).toHaveBeenCalledTimes(1);
  });
});
