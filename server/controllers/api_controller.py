from flask import Blueprint, request, jsonify
from models.weather_model import get_weather
from models.events_model import get_filtered_events

api_bp = Blueprint("api", __name__, url_prefix="/api")

weather_key = "2b85de9d310ba0d2efc27f78d5403e30"
activities_key = "j7ur4lC66UBSS7lM8BWhornlNIpMLqFpznQmAt_0"

@api_bp.route("/", methods=["GET"])
def handle_api():
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
