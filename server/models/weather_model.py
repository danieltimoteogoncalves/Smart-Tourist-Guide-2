# Importa a biblioteca requests para fazer pedidos HTTP
import requests

# Define a função que obtém os dados meteorológicos da cidade fornecida
def get_weather(api_key, city):
    # Cria a URL da API do OpenWeatherMap com a cidade, chave da API e unidade em Celsius
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    # Faz o pedido HTTP GET à API e converte a resposta em JSON
    data = requests.get(url).json()

    # Verifica se o código de estado da resposta (campo "cod") é 200 (sucesso)
    if data.get("cod") == 200:
        # Extrai a descrição geral do estado do tempo (ex: "Clear", "Rain") e converte para minúsculas
        description = data['weather'][0]['main'].lower()

        # Retorna um dicionário com os dados meteorológicos formatados
        return {
            "city": data['name'],  # Nome da cidade
            "country": data['sys']['country'],  # Código do país
            "description": data['weather'][0]['description'].title(),  # Descrição completa (capitalizada)
            "icon": data['weather'][0]['icon'],  # Ícone correspondente ao estado do tempo
            "temp": data['main']['temp'],  # Temperatura atual
            "humidity": data['main']['humidity'],  # Humidade relativa
            "wind": data['wind']['speed'],  # Velocidade do vento
            "desc_raw": description,  # Descrição crua (ex: "clear", "rain")
            "lat": data['coord']['lat'],  # Latitude da cidade
            "lon": data['coord']['lon'],  # Longitude da cidade
            "feels_like": data['main']['feels_like'],  # Sensação térmica
        }

    # Se a cidade não for encontrada ou houver erro, retorna None
    return None
