# Figma Design Analysis: Acute Care Utilization Model Runs Dashboard

## Overview
This Figma design represents a healthcare analytics dashboard for tracking machine learning model runs related to acute care utilization. The component includes search functionality, data visualization, and pagination controls.

## Component Structure

### Main Container
- **Name**: Background+Shadow
- **Dimensions**: 1571×290.38px
- **Styling**: White background with subtle drop shadows for depth
- **Border Radius**: 12px

### Header Section
- **Title**: "Acute Care Utilization Model Runs"
- **Typography**: Dark gray text (#334155)
- **Position**: Top-left of the container

### Search Section
- **Label**: "Search:"
- **Input Field**: 
  - Placeholder: "Comma separated Run IDs, Providers, or Model Names"
  - Border: Light gray (#E2E8F0)
  - Rounded corners (6px)
  - Drop shadow for depth

### Data Table
The table includes the following columns:
1. **Run ID** - Unique identifier for model runs
2. **Provider SID** - Provider system identifier  
3. **Model Name** - ML model type (e.g., ACU_XGBoost)
4. **Start Date** - Model run start date
5. **End Date** - Model run end date
6. **Accuracy (%)** - Model accuracy percentage
7. **Precision (%)** - Model precision percentage
8. **Recall (%)** - Model recall percentage
9. **F1 Score (%)** - F1 score percentage
10. **AUC (%)** - Area Under Curve percentage
11. **Actions** - Interactive buttons (Evaluations, Results)

### Sample Data
The design shows two sample records:

**Record 1:**
- Run ID: 7c030e5896303a24
- Provider SID: S0311772
- Model Name: ACU_XGBoost
- Start Date: 02/01/2025
- End Date: 02/28/2025
- Accuracy: 83.87%
- Precision: 44.44%
- Recall: 100%
- F1 Score: 61.54%
- AUC: 97.22%

**Record 2:**
- Run ID: cf60269128195d44
- Provider SID: S0311772
- Model Name: ACU_XGBoost
- Start Date: 11/01/2024
- End Date: 11/30/2024
- Accuracy: 81.82%
- Precision: 33.33%
- Recall: 100%
- F1 Score: 50%
- AUC: 90%

### Navigation/Pagination
- **First Page Button**: Double left arrow
- **Previous Page Button**: Single left arrow
- **Current Page Indicator**: "1" (highlighted in blue)
- **Next Page Button**: Single right arrow
- **Last Page Button**: Double right arrow
- **Rows per Page Dropdown**: Currently set to "10"

### Color Palette
- **Primary Text**: #334155 (Dark gray)
- **Secondary Text**: #64748B (Medium gray)
- **Borders**: #E2E8F0 (Light gray)
- **Background**: #FFFFFF (White)
- **Action Buttons**: #3B82F6 (Blue)
- **Selected State**: #EFF6FF (Light blue background)

### Interactive Elements
- Sortable column headers (indicated by sort icons)
- Search input field
- Action buttons for each row (Evaluations, Results)
- Pagination controls
- Rows per page selector

## Technical Implementation Recommendations

### Technology Stack
- **Framework**: React or Vue.js
- **Styling**: Tailwind CSS (matches design system)
- **Data Management**: React Query or SWR for API calls
- **Table Component**: TanStack Table or custom implementation

### Key Features to Implement
1. **Search Functionality**: Multi-field search supporting Run IDs, Providers, and Model Names
2. **Column Sorting**: Ascending/descending sort for all numerical columns
3. **Pagination**: Server-side or client-side pagination with configurable page sizes
4. **Responsive Design**: Mobile-friendly layout
5. **Loading States**: Skeleton loading for better UX
6. **Error Handling**: Graceful error states and retry mechanisms

### API Considerations
The component will likely need endpoints for:
- `/api/model-runs` - GET with query parameters for search, sort, pagination
- `/api/model-runs/{id}/evaluations` - GET for evaluation details
- `/api/model-runs/{id}/results` - GET for result details

### Accessibility Features
- Proper ARIA labels for table headers and interactive elements
- Keyboard navigation support
- Screen reader friendly table structure
- High contrast mode support

This design represents a well-structured data dashboard that balances functionality with clean visual design, suitable for healthcare analytics professionals monitoring ML model performance.