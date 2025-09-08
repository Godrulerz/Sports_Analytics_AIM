# 🎯 Sports Aiming Accuracy Dashboard

> A professional React-based analytics dashboard designed to measure, visualize, and improve sports aiming accuracy and performance. Featuring AI-powered coaching, interactive data visualizations, and multi-sport support, the platform provides athletes and coaches with actionable insights.

Built with React, Vite, JavaScript, and modern UI libraries, this project combines high-performance development tools with intuitive design.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **🏀 Multi-Sport Support** | Basketball, Archery, and Darts with sport-specific configurations |
| **📊 Real-Time Analytics** | Rolling accuracy trends, shot grouping visualizations, and performance KPIs |
| **📈 Dynamic Charts** | Interactive line charts, scatter plots, radar charts, and target-plane diagrams |
| **📁 CSV Data Import** | Upload custom session data for in-depth analysis |
| **🤖 AI-Powered Coaching** | Integrated with OpenAI GPT models for tailored feedback and practice plans |
| **💬 AI Chat Assistant** | Real-time Q&A for training strategies, technique corrections, and progress insights |
| **🎮 Demo Mode** | Fully functional fallback mode when API is unavailable (no key required) |
| **⚙️ Customizable Settings** | Manage API keys, model preferences, and feature toggles via Settings Panel |
| **📱 Responsive & Accessible** | Optimized for both desktop and mobile, with built-in dark mode support |

## 🛠 Tech Stack

<div align="center">

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 18 (JavaScript) | Modern UI framework |
| **Build Tool** | Vite | Lightning-fast build and dev server |
| **Styling** | Tailwind CSS | Utility-first styling system |
| **Charts** | Recharts | Data visualization library |
| **Animations** | Framer Motion | Smooth UI animations |
| **Icons** | Lucide React | Beautiful icon set |
| **UI Components** | shadcn/ui & Radix UI | Modern UI primitives and components |
| **HTTP Client** | Axios | API communication |
| **AI Integration** | OpenAI API | AI coaching and analysis |

</div>

## ⚡ Getting Started

### 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- *(Optional)* **OpenAI API key** for AI features

### 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sports-accuracy-dashboard.git
   cd sports-accuracy-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** *(optional for AI features):*
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEBUI_BASE_URL=https://api.openai.com/v1
   VITE_OPENWEBUI_API_KEY=your-openai-api-key-here
   VITE_DEFAULT_MODEL=gpt-3.5-turbo
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:5173
   ```

## 🤖 AI Features Setup

### 🎮 Demo Mode *(Default)*

- ✅ **Works instantly** with no API key required
- 🧠 **Generates intelligent insights** from session data
- 💰 **Free to use** with no API cost
- 🔄 **Automatic fallback** when API is unavailable

### 🔑 OpenAI API Mode *(Optional)*

- 🔐 **Requires OpenAI API key** for full functionality
- ⚡ **Enables real-time AI-powered coaching** and analysis
- ⚙️ **Configure** in Settings Panel or via `.env` variables
- 🎯 **Enhanced responses** with live AI model integration

## 📊 Usage

### 🏀 Sample Data

The dashboard ships with sample basketball free throw data for testing. You can:

- 📈 **Track accuracy trends** over time
- 🎯 **Analyze shot groupings** and patterns
- 🤖 **Receive AI-generated coaching insights**
- 💬 **Interact with the AI chat assistant**
- 🏆 **Switch between multiple sports**

### 📁 Importing Custom Data

1. **Prepare a CSV file** with these headers:
   - `t`: Attempt number/time
   - `hit`: Shot success (1/0, yes/no, true/false)
   - `err`: Radial error (cm)
   - `x`: Horizontal deviation (+right/-left, cm)
   - `y`: Vertical deviation (+high/-low, cm)
   - `releaseDeg`: Release angle *(optional)*
   - `speed`: Initial velocity in m/s *(optional)*

2. **Import via "Import CSV" button**
3. **Dashboard updates instantly**
4. **AI adapts coaching feedback** to your dataset

#### 📄 Example CSV Format

```csv
t,hit,err,x,y,releaseDeg,speed
1,1,5.2,3.1,4.2,52.1,7.2
2,0,12.3,8.1,-9.2,49.8,6.9
3,1,7.8,-2.1,7.4,51.9,7.1
```

## 📈 Features Overview

### 📊 Key Performance Indicators (KPIs)

- **Total attempts** - Session shot count
- **Accuracy %** - Success rate percentage
- **Mean radial error** - Average precision measurement
- **Release angle distribution** - Technique consistency metrics

### 📈 Charts & Visualizations

| Chart Type | Description |
|------------|-------------|
| **📈 Accuracy Trends** | Rolling performance over time |
| **🎯 Release Angle vs Hit** | Technique correlations |
| **🕸️ Skill Profile** | Radar chart of metrics |
| **🎪 Shot Groupings** | Target-plane scatter visualization |
| **🤖 AI Recommendations** | Contextual insights and coaching cues |

### 🎛️ Controls

- **📏 Adjustable rolling window** for trend analysis
- **🏆 Sport-specific configurations** (radius, metrics)
- **🤖 AI Assistant toggle** for coaching features
- **🔄 Data reset** functionality
- **⚙️ API settings panel** for configuration

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/                          # 🎨 shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   └── select.jsx
│   ├── SportsAccuracyDashboard.jsx  # 🎯 Main dashboard
│   ├── AICoachingPanel.jsx         # 🤖 AI insights panel
│   ├── AIChatInterface.jsx         # 💬 AI chat interface
│   └── OpenWebUISettings.jsx       # ⚙️ API configuration
├── lib/
│   ├── utils.js                     # 🔧 Utility functions
│   ├── openwebui-client.js          # 🌐 API client wrapper
│   ├── auth.js                      # 🔐 Auth utilities
│   └── config.js                    # ⚙️ Config manager
├── App.jsx                          # 🚀 Root component
├── main.jsx                         # 📱 Entry point
└── index.css                        # 🎨 Global styles
```

## 🎨 Customization

### 🏆 Adding New Sports

1. **Add new options** in sport selector
2. **Define sport-specific target radius** in calculations
3. **Update AI coaching cues** for sport context

### 🎨 Styling

- **Tailwind CSS** with custom CSS variables
- **Modify `index.css`** for theming and color adjustments
- **Component-level styling** using Tailwind utilities

### 📊 Data Processing

- **Handled in `parseCSV` function**
- **Extend for validation** or alternative CSV formats
- **Custom data transformations** as needed

## 🔧 Development

### 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🚀 Start development server |
| `npm run build` | 🏗️ Production build |
| `npm run preview` | 👀 Preview production build |
| `npm run lint` | 🔍 Run ESLint checks |

### 📝 Code Style

- **Configured with ESLint** (JavaScript rules)
- **Ensure code adheres** to linting standards
- **Consistent formatting** across the project

## 🤝 Contributing

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**
3. **💻 Implement your changes**
4. **🧪 Run tests & linting**
5. **📤 Submit a pull request**

---

## 📜 License

This project is released under the **MIT License**.

---

## 🛠 Troubleshooting

### ❌ Common Issues

#### 🔑 API Quota Exceeded (429 error)
- ✅ **Falls back to Demo Mode** automatically
- 💳 **Check OpenAI billing** at [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
- 💰 **Add credits** or continue in Demo Mode

#### 🎨 CSS Not Loading
- 🔄 **Restart dev server**: `npm run dev`
- 🧹 **Clear browser cache**
- ⚙️ **Verify Tailwind configuration**

#### 🤖 AI Features Not Working
- **🎮 Demo Mode**: Works without setup
- **🔑 API Mode**: Requires valid OpenAI key
- **🔧 Use "Test Connection"** in Settings panel

---

## 📞 Support

- 🐛 **Open an issue** in the GitHub repository
- 📧 **Contact the development team** for assistance
- 📖 **Check the documentation** for detailed guides