import requests
import datetime

# Função que devolve as categorias de eventos a excluir consoante a descrição do tempo
def get_restricted_categories_by_weather(weather_desc):
    weather_desc = weather_desc.lower()  # Converte a descrição meteorológica para minúsculas
    # Lista base de categorias a excluir, independentemente do estado do tempo
    exclusao = [
        "severe-weather", "school-holidays", "public-holidays", "observances",
        "politics", "conferences", "expos", "daylight-savings", "airport-delays",
        "disasters", "terror", "health-warnings", "academic"
    ]
    # Adiciona categorias extra dependendo das condições meteorológicas
    if "rain" in weather_desc:  # Se chover, exclui desporto e concertos
        exclusao.extend(["sports", "concerts"])
    elif "snow" in weather_desc:  # Se nevar, exclui apenas desporto
        exclusao.append("sports")
    return exclusao  # Devolve a lista final de categorias a excluir

# Função que obtém eventos filtrados com base na localização, estado do tempo e categorias excluídas
def get_filtered_events(api_key, lat, lon, weather_desc):
    url = "https://api.predicthq.com/v1/events/"  # URL da API da PredictHQ
    headers = {
        "Authorization": f"Bearer {api_key}",  # Token de autenticação
        "Accept": "application/json"
    }

    today = datetime.datetime.now().date()  # Obtém a data atual
    # Parâmetros para a requisição da API
    params = {
        "limit": 10,  # Limita a 10 eventos por página
        "active.gte": today.isoformat(),  # Eventos ainda activos a partir de hoje
        "end.lte": today.isoformat(),  # Eventos que terminam até hoje
        "within": f"10km@{lat},{lon}",  # Eventos num raio de 10 km da localização
        "sort": "rank",  # Ordenar por relevância
        "start.lte": today.isoformat(),  # Eventos que já começaram até hoje
        "state": "active"  # Apenas eventos activos
    }

    # Obtém a lista de categorias a excluir, com base no estado do tempo
    restricted = get_restricted_categories_by_weather(weather_desc)
    all_events = []  # Lista para armazenar todos os eventos recolhidos
    next_url = url  # URL inicial para a requisição
    next_params = params  # Parâmetros para a primeira chamada

    # Loop para percorrer as páginas de resultados (caso haja mais do que uma)
    while next_url:
        res = requests.get(next_url, headers=headers, params=next_params)  # Faz o pedido à API
        if res.status_code != 200:  # Se houver erro, imprime e interrompe
            print("Erro:", res.text)
            break
        data = res.json()  # Converte a resposta em formato JSON
        all_events += data.get("results", [])  # Adiciona os eventos encontrados à lista
        next_url = data.get("next")  # Próximo URL, se existir
        next_params = None  # Apenas a primeira requisição usa parâmetros

    # Filtra os eventos para remover os das categorias excluídas e devolve no máximo 10
    return [e for e in all_events if e.get("category") not in restricted][:10]
