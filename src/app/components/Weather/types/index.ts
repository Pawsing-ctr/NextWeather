export interface WeatherData {
    main: {
      temp: number
      temp_min: number
      temp_max: number
      feels_like: number
      humidity: number
    }
    weather: [
      {
        id: number
        main: string
        description: string
        icon: string
      },
    ]
    name: string
  }
  
  export interface ForecastItem {
    dt: number
    main: {
      temp: number
      temp_min: number
      temp_max: number
      feels_like: number
    }
    weather: [
      {
        id: number
        main: string
        description: string
        icon: string
      },
    ]
  }
  
  export interface ForecastData {
    list: ForecastItem[]
  }
  
  export interface WeatherBackgrounds {
    [key: string]: string
  }
  
  