# Model Runs Dashboard - Healthcare ML Analytics

A React TypeScript component that implements a healthcare ML model runs dashboard based on Figma design specifications.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
# or
yarn install
```

2. **Install additional required dependencies:**
```bash
npm install react react-dom next @heroicons/react
npm install -D typescript @types/react @types/react-dom tailwindcss autoprefixer postcss
```

3. **Initialize Tailwind CSS:**
```bash
npx tailwindcss init -p
```

4. **Create styles/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. **Run the development server:**
```bash
npm run dev
```

## 📋 Features

### ✅ Implemented Features
- **Multi-field Search**: Search across Run IDs, Provider SIDs, and Model Names
- **Column Sorting**: Click any column header to sort data ascending/descending
- **Pagination**: Navigate through data with first/previous/next/last buttons
- **Configurable Page Size**: Choose 5, 10, 25, or 50 items per page
- **Responsive Design**: Mobile-friendly table with horizontal scroll
- **TypeScript Support**: Full type safety and IntelliSense
- **Accessibility**: Keyboard navigation and screen reader support

### 🎨 Design Implementation
- **Exact Figma Match**: Pixel-perfect implementation of the provided design
- **Color Palette**: Matches specified color scheme (#334155, #64748B, #E2E8F0, etc.)
- **Typography**: Consistent font sizes and weights
- **Shadows & Borders**: Subtle drop shadows and border styling
- **Interactive States**: Hover effects and focus states

## 🏗️ Component Structure

### Main Component: `ModelRunsDashboard`

```typescript
interface ModelRun {
  id: string;
  runId: string;
  providerSid: string;
  modelName: string;
  startDate: string;
  endDate: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
}
```

### Key Props
The component is currently self-contained with sample data. To integrate with your API:

```typescript
interface ModelRunsDashboardProps {
  data?: ModelRun[];
  onSearch?: (searchTerm: string) => void;
  onSort?: (key: keyof ModelRun, direction: 'asc' | 'desc') => void;
  onPageChange?: (page: number) => void;
  onEvaluationClick?: (runId: string) => void;
  onResultsClick?: (runId: string) => void;
  loading?: boolean;
  error?: string;
}
```

## 🔧 Customization

### Styling
The component uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Custom healthcare brand colors
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
      }
    }
  }
}
```

### Data Integration
Replace the sample data with your API:

```typescript
const ModelRunsDashboard: React.FC<ModelRunsDashboardProps> = ({ 
  data = sampleData,
  onSearch,
  onSort,
  // ... other props
}) => {
  // Your API integration logic here
};
```

## 🏥 Healthcare Context

This dashboard is specifically designed for healthcare analytics teams monitoring machine learning models for:

- **Acute Care Utilization**: Predicting patient care needs
- **Provider Performance**: Tracking model accuracy by provider
- **Model Evaluation**: Comprehensive metrics (Accuracy, Precision, Recall, F1, AUC)
- **Temporal Analysis**: Date range tracking for model runs

### Sample Data Structure
The component displays real healthcare ML metrics:
- **Run ID**: Unique model execution identifier
- **Provider SID**: Healthcare provider system ID
- **Model Name**: Algorithm type (e.g., ACU_XGBoost)
- **Performance Metrics**: Standard ML evaluation metrics

## 🛠️ Development

### File Structure
```
├── ModelRunsDashboard.tsx    # Main component
├── demo.tsx                  # Usage example
├── package.json             # Dependencies
├── tailwind.config.js       # Styling configuration
├── figma-design-analysis.md # Design specifications
└── README.md               # This file
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run type-check   # TypeScript validation
npm run lint         # ESLint checks
```

### Testing the Component

1. **Basic Usage:**
```typescript
import ModelRunsDashboard from './ModelRunsDashboard';

function App() {
  return (
    <div className="p-8">
      <ModelRunsDashboard />
    </div>
  );
}
```

2. **With Custom Data:**
```typescript
const customData = [
  {
    id: '1',
    runId: 'custom-run-001',
    providerSid: 'PROV123',
    modelName: 'CustomModel',
    startDate: '01/15/2025',
    endDate: '01/31/2025',
    accuracy: 92.5,
    precision: 87.3,
    recall: 95.2,
    f1Score: 91.1,
    auc: 96.8
  }
];

<ModelRunsDashboard data={customData} />
```

## 🔍 Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure all dependencies are installed:
```bash
npm install @types/react @types/react-dom
```

2. **Tailwind Not Working**: Verify `globals.css` includes Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Icons Not Displaying**: Install Heroicons:
```bash
npm install @heroicons/react
```

## 📊 Performance Considerations

- **Virtual Scrolling**: For large datasets (1000+ rows), consider implementing virtual scrolling
- **Server-Side Pagination**: Move pagination logic to backend for better performance
- **Memoization**: The component uses React.useMemo for optimal re-rendering
- **Lazy Loading**: Consider lazy loading for action button modals

## 🤝 Contributing

1. Follow the existing code style
2. Add TypeScript types for all new features
3. Test with sample healthcare data
4. Ensure accessibility compliance
5. Update documentation for new features

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for Healthcare Analytics**
