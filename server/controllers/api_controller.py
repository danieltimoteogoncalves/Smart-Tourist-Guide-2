# Importa o Blueprint para criar rotas modulares no Flask,
# request para aceder a parâmetros da requisição HTTP,
# e jsonify para devolver respostas em formato JSON
from flask import Blueprint, request, jsonify

# Importa a função get_weather do modelo de tempo (weather_model)
from models.weather_model import get_weather

# Importa a função get_filtered_events do modelo de eventos (events_model)
from models.events_model import get_filtered_events

# Cria um blueprint chamado "api", com prefixo de URL "/api"
api_bp = Blueprint("api", __name__, url_prefix="/api")

# Chave da API para obter dados meteorológicos
weather_key = "2b85de9d310ba0d2efc27f78d5403e30"

# Chave da API para obter dados de atividades/eventos
activities_key = "suknEVPz8O5YcYEgH_vc0akwDo_4Rl3KG4zXGzNp"

# Define uma rota GET em "/api/" que trata os pedidos à API
@api_bp.route("/", methods=["GET"])
def handle_api():
    # Obtém o parâmetro 'city' da query string (ex: /api/?city=Lisboa)
    city = request.args.get("city")

    # Se o parâmetro 'city' não for fornecido, devolve erro 400 (Bad Request)
    if not city:
        return jsonify({"error": "Missing city parameter"}), 400

    # Chama a função get_weather com a chave e a cidade fornecida
    weather = get_weather(weather_key, city)

    # Se não for possível obter os dados meteorológicos, devolve erro 404 (Not Found)
    if not weather:
        return jsonify({"error": "City not found or invalid"}), 404

    # Chama a função get_filtered_events com a chave, coordenadas e descrição do tempo
    events = get_filtered_events(activities_key, weather["lat"], weather["lon"], weather["desc_raw"])

    # Devolve uma resposta JSON com os dados do tempo e os eventos filtrados
    return jsonify({
        "weather": weather,
        "events": events 
    })
