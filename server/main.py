from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import datetime

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow only your React dev server

weather_key = "2b85de9d310ba0d2efc27f78d5403e30"
activities_key = "m26Sf6eS2jXKHKp0kPzlLWOxS_d1w0V3nCILO1ax"

def get_weather(api_key, city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    data = requests.get(url).json()

    if data.get("cod") == 200:
        description = data['weather'][0]['main'].lower()
        weather_info = {
            "city": data['name'],
            "country": data['sys']['country'],
            "description": data['weather'][0]['description'].title(),
            "temp": data['main']['temp'],
            "humidity": data['main']['humidity'],
            "wind": data['wind']['speed'],
            "desc_raw": description,
            "lat": data['coord']['lat'],
            "lon": data['coord']['lon']
        }
        return weather_info
    else:
        return None

def get_restricted_categories_by_weather(weather_desc):
    weather_desc = weather_desc.lower()
    if "rain" in weather_desc:
        return ["sports", "concerts"]
    elif "snow" in weather_desc:
        return ["sports"]
    return []

def get_filtered_events(api_key, lat, lon, weather_desc):
    url = "https://api.predicthq.com/v1/events/"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/json"
    }

    today = datetime.datetime.utcnow().date()
    start_date = today.isoformat() #+ "T00:00:00Z"
    #end_date = today.isoformat() + "T23:59:59Z"

    params = {
        "limit": 10,
        "active.gte": start_date,
        "end.lte": start_date,
        "within": f"10km@{lat},{lon}",  # Increased radius
        "sort": "rank",
        "start.lte": start_date,
        "state": "active"
    }

    restricted_categories = get_restricted_categories_by_weather(weather_desc)
    print("Restricted categories:", restricted_categories)

    all_events = []
    next_url = url
    next_params = params

    while next_url:
        response = requests.get(next_url, headers=headers, params=next_params)
        if response.status_code != 200:
            print("Error fetching events:", response.text)
            break

        data = response.json()
        events = data.get('results', [])
        all_events.extend(events)
        next_url = data.get('next')
        next_params = None

    print(f"Fetched {len(all_events)} events total.")

    for e in all_events:
        print(f"{e.get('rank', 'n/a')}: {e.get('category')} - {e.get('title')}")

    filtered_events = [
        event for event in all_events
        if event.get('category') not in restricted_categories
    ][:10]

    return filtered_events


@app.route("/api", methods=["GET"])
def api():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "Missing city parameter"}), 400

    weather = get_weather(weather_key, city)
    if not weather:
        return jsonify({"error": "City not found or invalid"}), 404

    events = get_filtered_events(activities_key, weather["lat"], weather["lon"], weather["desc_raw"])

    return jsonify({
        "weather": weather,
        "events": events
    })


if __name__ == "__main__":
    app.run(debug=True)
