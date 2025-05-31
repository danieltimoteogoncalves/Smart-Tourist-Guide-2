from flask import Flask, render_template, request
import requests
import datetime

app = Flask(__name__)

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
    start_date = today.isoformat() + "T00:00:00Z"
    end_date = today.isoformat() + "T23:59:59Z"

    params = {
        "start.gte": start_date,
        "start.lte": end_date,
        "limit": 10,
        "within": f"10km@{lat},{lon}"
    }

    restricted_categories = get_restricted_categories_by_weather(weather_desc)
    all_events = []
    next_url = url
    next_params = params

    while next_url:
        response = requests.get(next_url, headers=headers, params=next_params)
        if response.status_code != 200:
            break

        data = response.json()
        events = data.get('results', [])
        all_events.extend(events)

        next_url = data.get('next')
        next_params = None

    filtered_events = [
        event for event in all_events
        if not any(cat in restricted_categories for cat in event.get('category', '').split(','))
    ][:10]

    return filtered_events

@app.route("/", methods=["GET", "POST"])
def index():
    events = []
    weather = None
    if request.method == "POST":
        city = request.form["city"]
        weather = get_weather(weather_key, city)
        if weather:
            events = get_filtered_events(activities_key, weather["lat"], weather["lon"], weather["desc_raw"])
    return render_template("index.html", weather=weather, events=events)

if __name__ == "__main__":
    app.run(debug=True)
