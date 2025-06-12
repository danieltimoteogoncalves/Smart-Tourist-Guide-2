# 🌦️ Smart Tourist Guide

Aplicação fullstack que fornece **informações meteorológicas** e **eventos locais** com base na cidade pesquisada.

---

## 📌 Tecnologias Utilizadas

- **Backend:** Flask (Python)
- **Frontend:** React.js
- **APIs Externas:**
  - [OpenWeatherMap](https://openweathermap.org/api) — Dados meteorológicos
  - [PredictHQ](https://www.predicthq.com/) — Eventos locais
- **Outros:** Flask-CORS (para permitir comunicação entre frontend e backend)

---

## ⚙️ Funcionalidades

- 🔎 Pesquisa por cidade para obter dados meteorológicos em tempo real  
- 📅 Listagem de eventos locais, filtrados com base nas condições meteorológicas  
- 🕘 Histórico das últimas 10 cidades pesquisadas  
- 🔄 Atualização automática dos dados a cada 30 segundos  
- 🇵🇹 Tradução das descrições meteorológicas para português de Portugal  
- 📱 Interface responsiva com feedback visual (spinner, mensagens de erro)  
- 🎨 Fundo dinâmico que muda conforme o estado do tempo atual

---

## 📁 Estrutura do Projeto

Smart Tourist Guide/
│
├── server/
│ ├── controllers/
│ │ └── api_controller.py
│ ├── models/
│ │ ├── weather_model.py
│ │ └── events_model.py
│ ├── app.py
│ └── requirements.txt
│
├── frontend/
│ ├── components/
│ │ ├── SearchBar.js
│ │ ├── WeatherInfo.js
│ │ ├── EventsList.js
│ │ └── WeatherTranslations.js
│ ├── App.js
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
└── README.md

---

## 🚀 Como Executar Localmente

### 📦 Pré-requisitos

- Python 3.8+
- Node.js 16+
- Conta e chave de API para:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [PredictHQ](https://www.predicthq.com/)

---

### 🧪 Backend


cd backend
python -m venv venv
source venv/bin/activate      # Linux/Mac
# ou
venv\Scripts\activate         # Windows

pip install -r requirements.txt
python app.py

O backend ficará disponível em http://localhost:5000.

### 🧪 Frontend

cd frontend
npm install
npm run dev

###  Como Usar

Introduz o nome de uma cidade na barra de pesquisa e confirma.

Visualiza a informação meteorológica e os eventos locais.

Usa o histórico para repetir pesquisas rapidamente.

Observa o fundo da interface mudar conforme o estado do tempo atual.


### Autores
Daniel Timóteo
Daniel Sousa

