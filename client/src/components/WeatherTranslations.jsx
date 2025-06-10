// Objeto que mapeia descrições do estado do tempo em inglês (vindas da API OpenWeatherMap)
// para as respetivas traduções em português de Portugal

const weatherTranslations = {
  'clear sky': 'céu limpo',
  'few clouds': 'algumas nuvens',
  'scattered clouds': 'nuvens dispersas',
  'broken clouds': 'nuvens fragmentadas',
  'overcast clouds': 'céu muito nublado',

  // Chuva
  'light rain': 'chuva ligeira',
  'moderate rain': 'chuva moderada',
  'heavy intensity rain': 'chuva forte',
  'very heavy rain': 'chuva muito forte',
  'extreme rain': 'chuva extrema',
  'freezing rain': 'chuva congelante',

  // Aguaceiros
  'light intensity shower rain': 'chuviscos ligeiros',
  'shower rain': 'aguaceiros',
  'heavy intensity shower rain': 'aguaceiros fortes',
  'ragged shower rain': 'aguaceiros irregulares',

  // Trovoadas
  'thunderstorm': 'trovoada',
  'thunderstorm with light rain': 'trovoada com chuva ligeira',
  'thunderstorm with rain': 'trovoada com chuva',
  'thunderstorm with heavy rain': 'trovoada com chuva forte',
  'light thunderstorm': 'trovoada ligeira',
  'heavy thunderstorm': 'trovoada forte',
  'ragged thunderstorm': 'trovoada irregular',
  'thunderstorm with light drizzle': 'trovoada com chuviscos ligeiros',
  'thunderstorm with drizzle': 'trovoada com chuviscos',
  'thunderstorm with heavy drizzle': 'trovoada com chuviscos fortes',

  // Neve
  'snow': 'neve',
  'light snow': 'neve ligeira',
  'heavy snow': 'neve forte',

  // Granizo
  'sleet': 'granizo',
  'light shower sleet': 'chuviscos de granizo ligeiros',
  'shower sleet': 'chuviscos de granizo',

  // Chuva + Neve
  'light rain and snow': 'chuva e neve ligeira',
  'rain and snow': 'chuva e neve',

  // Aguaceiros de neve
  'light shower snow': 'aguaceiros de neve ligeiros',
  'shower snow': 'aguaceiros de neve',
  'heavy shower snow': 'aguaceiros de neve fortes',

  // Atmosfera
  'mist': 'névoa',
  'smoke': 'fumo',
  'haze': 'névoa seca',
  'sand/dust whirls': 'redemoinhos de areia/pó',
  'fog': 'névoa densa',
  'sand': 'areia',
  'dust': 'pó',
  'volcanic ash': 'cinzas vulcânicas',
  'squalls': 'rajadas',
  'tornado': 'tornado',
};

// Exporta o objeto para ser usado noutros ficheiros (ex: WeatherInfo.js)
export default weatherTranslations;
  