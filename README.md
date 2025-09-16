# Corporate CRM System

A modern, responsive Customer Relationship Management (CRM) system built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dashboard**: Overview of leads, contacts, and key metrics
- **Lead Management**: Track and manage sales leads
- **Contact Management**: Comprehensive contact database
- **User Authentication**: Secure login and registration
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Customization**: Customizable color themes
- **Form Validation**: Robust form validation with Zod
- **State Management**: Redux Toolkit for state management
- **API Integration**: TanStack Query for data fetching

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query
- **Form Validation**: Zod
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Build Tool**: Vite
- **Code Quality**: ESLint, SonarQube

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- SonarQube server (for code quality analysis)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd corporate-crm-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing & Code Quality

### Run ESLint
```bash
npm run lint
```

### Generate ESLint report for SonarQube
```bash
npm run lint:sonar
```

### Run SonarQube analysis
```bash
npm run sonar
```

## 🏗️ Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── widgets/            # UI widget components
├── layouts/            # Layout components
├── redux/              # Redux store and slices
├── services/           # API services
├── functions/          # Utility functions
├── model/              # TypeScript interfaces
├── schemas/            # Zod validation schemas
└── assets/             # Static assets
```

## 🔧 SonarQube Configuration

This project includes SonarQube integration for code quality analysis:

### Local Setup
1. Install SonarQube server
2. Configure `sonar-project.properties`
3. Run analysis: `npm run sonar`

### CI/CD Integration
- GitHub Actions workflow included (`sonar-scanner.yml`)
- Requires `SONAR_TOKEN` and `SONAR_HOST_URL` secrets

### Quality Gates
- Code coverage tracking
- Code smells detection
- Security vulnerability scanning
- Maintainability metrics

## 🎨 Customization

### Theme Colors
Navigate to Settings page to customize:
- Primary colors
- Secondary colors
- Accent colors
- Predefined themes available

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Sidebar.tsx`

## 📝 Demo Credentials

For testing purposes:
- **Email**: demo@company.com
- **Password**: demo123

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.