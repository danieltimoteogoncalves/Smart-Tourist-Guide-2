import requests

def get_weather(api_key, city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    data = requests.get(url).json()

    if data.get("cod") == 200:
        description = data['weather'][0]['main'].lower()
        return {
            "city": data['name'],
            "country": data['sys']['country'],
            "description": data['weather'][0]['description'].title(),
            "icon": data['weather'][0]['icon'],
            "temp": data['main']['temp'],
            "humidity": data['main']['humidity'],
            "wind": data['wind']['speed'],
            "desc_raw": description,
            "lat": data['coord']['lat'],
            "lon": data['coord']['lon'],
            "feels_like": data['main']['feels_like'],
        }
    return None
