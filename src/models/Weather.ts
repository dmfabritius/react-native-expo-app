export interface Weather {
  current: Current;
  daily: Daily[];
  lat: number;
  lon: number;
  timezone_offset: number;
  timezone: string;
}

export interface WeatherDetail {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface Current {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: WeatherDetail[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface Daily {
  clouds: number;
  dew_point: number;
  dt: number;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain?: number;
  snow?: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  uvi: number;
  weather: WeatherDetail[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface Temperature {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}
