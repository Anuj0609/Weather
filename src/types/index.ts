interface Location {
  Key: string;
  LocalizedName: string;
  AdministrativeArea: {
    LocalizedName: string;
  };
  Country: {
    LocalizedName: string;
  };
}

interface Weather {
  WeatherText: string;
  WeatherIcon: number;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
  };
}
