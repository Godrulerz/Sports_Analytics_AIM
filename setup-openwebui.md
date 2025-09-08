# OpenWebUI Manual Setup

## Prerequisites
- Python 3.8+
- Node.js 16+
- Git

## Installation Steps

1. **Clone OpenWebUI:**
```bash
git clone https://github.com/open-webui/open-webui.git
cd open-webui
```

2. **Install Backend Dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

3. **Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

4. **Start Backend:**
```bash
cd ../backend
python main.py
```

5. **Start Frontend (in new terminal):**
```bash
cd frontend
npm run dev
```

## Configuration
- Backend runs on: http://localhost:8080
- Frontend runs on: http://localhost:3000
- API Base URL: http://localhost:8080/api/v1
