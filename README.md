# Sports Aiming Accuracy Dashboard

A comprehensive React dashboard for analyzing sports aiming accuracy and performance. Built with React, Vite, TypeScript, and modern UI components.

## Features

- **Multi-Sport Support**: Basketball, Archery, and Darts with sport-specific target radii
- **Real-time Analytics**: Rolling accuracy trends, shot grouping visualization, and performance metrics
- **Interactive Charts**: Line charts, scatter plots, radar charts, and target plane visualization
- **CSV Data Import**: Upload your own session data for analysis
- **Coaching Insights**: AI-generated coaching cues and practice recommendations
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Built-in dark/light theme switching

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Framer Motion** for animations
- **Lucide React** for icons
- **shadcn/ui** for UI components
- **Radix UI** for accessible primitives

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Using Sample Data

The dashboard comes with sample basketball free throw data. You can:
- View accuracy trends and metrics
- Analyze shot grouping patterns
- Get coaching recommendations
- Switch between different sports

### Importing Your Own Data

1. Prepare a CSV file with the following columns:
   - `t`: Attempt number/time
   - `hit`: Whether the shot was successful (1/true/yes or 0/false/no)
   - `err`: Radial error in centimeters
   - `x`: Horizontal deviation in cm (+right/-left)
   - `y`: Vertical deviation in cm (+high/-low)
   - `releaseDeg`: Release angle in degrees (optional)
   - `speed`: Initial speed in m/s (optional)

2. Click "Import CSV" and select your file
3. The dashboard will automatically update with your data

### CSV Format Example

```csv
t,hit,err,x,y,releaseDeg,speed
1,1,5.2,3.1,4.2,52.1,7.2
2,0,12.3,8.1,-9.2,49.8,6.9
3,1,7.8,-2.1,7.4,51.9,7.1
```

## Features Overview

### Key Performance Indicators (KPIs)
- Total attempts
- Accuracy percentage
- Mean radial error
- Release angle statistics

### Charts and Visualizations
- **Accuracy Trend**: Rolling accuracy over time
- **Release Angle vs Hit**: Scatter plot showing technique correlation
- **Skill Profile**: Radar chart of performance metrics
- **Shot Grouping**: Visual target plane with shot impacts
- **Coaching Cues**: Personalized recommendations

### Analysis Controls
- Adjustable rolling window size for trend analysis
- Sport selection (affects target radius and recommendations)
- Data reset functionality

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── select.tsx
│   └── SportsAccuracyDashboard.tsx  # Main dashboard component
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Root component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Customization

### Adding New Sports

1. Update the sport options in the Select component
2. Add sport-specific target radius in the `targetRadiusCm` calculation
3. Modify coaching cues in the `CoachingCues` component

### Styling

The project uses Tailwind CSS with custom CSS variables for theming. Modify `src/index.css` to change colors and styling.

### Data Processing

The dashboard processes data in the `parseCSV` function. Modify this function to support different CSV formats or add data validation.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint with TypeScript rules. Make sure to follow the configured linting rules.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue in the repository or contact the development team.
# Sports_Analytics_AIM
