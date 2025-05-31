# Eco Impact Tracker UI

A modern React frontend for the Eco Impact Tracker application that helps users understand the environmental impact of products.

## Features

- Search products by name or brand with autocomplete functionality
- View detailed product information
- Display environmental impact metrics:
  - Carbon footprint (kg CO₂)
  - Water usage (liters)
  - Waste generated (kg)
  - Overall eco impact score
- Responsive design that works on all devices
- Real-time search with error handling
- Search history tracking

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Running instance of the Eco Impact Tracker backend (Spring Boot application)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd EcoImpactTrackerUI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Environment Setup

The application connects to the backend API at http://localhost:8080 by default. If your backend is running on a different URL, update the `API_BASE_URL` in `src/services/api.js`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Project Structure

```
EcoImpactTrackerUI/
├── public/                 # Static files
├── src/                    # Source files
│   ├── services/          # API services
│   ├── components/        # React components
│   └── App.js            # Main application component
├── package.json           # Project dependencies and scripts
└── README.md             # Project documentation
```

## Technologies Used

- React
- Material-UI
- Axios for API calls
- Modern JavaScript (ES6+)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 