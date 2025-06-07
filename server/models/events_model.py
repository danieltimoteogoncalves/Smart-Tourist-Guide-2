import requests
import datetime

def get_restricted_categories_by_weather(weather_desc):
    weather_desc = weather_desc.lower()
    exclusao = ["severe-weather", "school-holidays", "public-holidays", "observances", "politics", "conferences",
                "expos", "daylight-savings", "airport-delays", "disasters", "terror", "health-warnings", "academic"]
    if "rain" in weather_desc:
        exclusao.extend(["sports", "concerts"])
    elif "snow" in weather_desc:
        exclusao.append("sports")
    return exclusao

def get_filtered_events(api_key, lat, lon, weather_desc):
    url = "https://api.predicthq.com/v1/events/"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json"
    }

    today = datetime.datetime.utcnow().date()
    params = {
        "limit": 10,
        "active.gte": today.isoformat(),
        "end.lte": today.isoformat(),
        "within": f"10km@{lat},{lon}", 
        "sort": "rank",
        "start.lte": today.isoformat(),
        "state": "active"
    }

    restricted = get_restricted_categories_by_weather(weather_desc)
    all_events = []
    next_url = url
    next_params = params

    while next_url:
        res = requests.get(next_url, headers=headers, params=next_params)
        if res.status_code != 200:
            print("Erro:", res.text)
            break
        data = res.json()
        all_events += data.get("results", [])
        next_url = data.get("next")
        next_params = None

    return [e for e in all_events if e.get("category") not in restricted][:10]
