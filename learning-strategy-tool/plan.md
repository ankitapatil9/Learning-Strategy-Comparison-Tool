# Learning Strategy Comparison Tool - Project Plan

## Project Overview
Create a web-based application that demonstrates and compares two AI learning strategies: Rote Learning and Inductive Learning. The tool will help users understand how these strategies work by allowing them to input study hours and see predictions for exam results.

## Technologies
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python 3.8+ with Flask 2.3+
- **Data Storage**: CSV file (no database required)
- **Visualization**: Chart.js 4.4+ for accuracy comparison charts

## Dependencies
- Flask==2.3.3
- Python==3.8+
- Chart.js==4.4.0 (CDN)

## Dataset
- Simple study hours vs exam results (Pass/Fail)
- Training data: 1h→Fail, 2h→Fail, 3h→Pass, 4h→Pass, 5h→Pass
- Stored in `dataset.csv`

## Learning Algorithms

### Rote Learning
- Memorizes exact training examples
- Prediction: Check if input matches stored example
- If match found: return stored result
- If no match: "No memorized result"

### Inductive Learning
- Learns general rule from data
- Rule: If study hours ≥ 3 → Pass, else → Fail
- Can generalize to unseen examples

## Website Structure

### Home Page (`/`)
- Title: Learning Strategy Comparison Tool
- Brief explanations of both learning strategies
- "Start Prediction" button

### Prediction Page (`/predict`)
- Input field: Study Hours (number)
- "Predict Result" button
- Results display:
  - Rote Learning Prediction box
  - Inductive Learning Prediction box
- Comparison section with accuracy percentages
- Chart comparing method performance

## Project Folder Structure
```
learning-strategy-tool/
├── app.py                 # Flask application
├── dataset.csv            # Training data
├── templates/
│   └── index.html         # Main template
├── static/
│   ├── style.css          # Styling
│   └── script.js          # Frontend logic
└── README.md              # Documentation
```

## Features to Implement
1. Dataset display table
2. Prediction functionality for both methods
3. Accuracy calculation and display
4. Visual comparison chart
5. Responsive, clean UI design
6. Error handling for invalid inputs

## Implementation Steps
1. Set up Flask project structure
2. Create CSV dataset file
3. Implement backend logic for both learning algorithms
4. Create HTML template with forms and result displays
5. Add CSS for clean, responsive design
6. Implement JavaScript for dynamic predictions and charts
7. Add accuracy calculation and comparison features
8. Test all functionality
9. Create README with setup instructions

## UI Design Requirements
- Centered card layout
- Clean, beginner-friendly interface
- Responsive design
- Two distinct result boxes for each strategy
- Simple color scheme and typography

## Code Requirements
- Well-commented, readable code
- Simple, beginner-friendly structure
- Avoid complex frameworks
- Modular organization
- Error handling

## Testing Scenarios
- Test with training examples (1-5 hours)
- Test with unseen examples (0, 6, 7 hours)
- Verify accuracy calculations
- Check responsive design
- Validate input handling

## Success Criteria
- Website runs locally with `python app.py`
- Users can input study hours and get predictions
- Both learning strategies work as expected
- Visual comparison shows performance differences
- Clean, professional appearance
- Easy to understand for beginners