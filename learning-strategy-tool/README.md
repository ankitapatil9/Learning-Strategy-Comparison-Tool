# Learning Strategy Comparison Tool

A web-based application that demonstrates and compares two AI learning strategies: **Rote Learning** and **Inductive Learning**.

## Overview

This tool helps users understand how different learning strategies work by allowing them to input study hours and see predictions for exam results. It visualizes the accuracy differences between memorization-based learning and rule-based learning approaches.

## Features

- **Rote Learning**: Memorizes exact training examples and can only predict results it has previously seen
- **Inductive Learning**: Learns general rules from data and can predict for new, unseen examples
- **Interactive Predictions**: Input study hours and get real-time predictions from both strategies
- **Accuracy Comparison**: Visual comparison of accuracy metrics using Chart.js
- **Training Dataset Display**: View the training data used by the models
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Backend**: Python 3.8+ with Flask 2.3+
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Chart.js 4.4+
- **Data Storage**: CSV file

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Setup Instructions

1. **Clone or download the project**
```bash
cd learning-strategy-tool
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
python app.py
```

4. **Access the application**
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

## Project Structure

```
learning-strategy-tool/
├── app.py                 # Flask application with learning algorithms
├── dataset.csv            # Training data (study hours → exam results)
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── static/
│   ├── style.css          # Styling and responsive design
│   └── script.js          # Frontend logic and API interactions
└── templates/
    └── index.html         # Main HTML template
```

## Dataset

The training dataset contains study hours and corresponding exam results:

| Study Hours | Exam Result |
|-------------|-------------|
| 1           | Fail        |
| 2           | Fail        |
| 3           | Pass        |
| 4           | Pass        |
| 5           | Pass        |

## Usage

1. **View Training Data**: The homepage displays the dataset used to train both learning strategies
2. **Understanding Each Strategy**: Read the explanations for Rote Learning and Inductive Learning
3. **Make Predictions**: 
   - Enter the number of study hours (can be any number, including those not in training data)
   - Click "Predict Result"
   - Observe the predictions from both strategies
   - Compare their accuracy scores and visual representation
4. **Analyze Results**: 
   - Rote Learning will return "No memorized result" for unseen hours
   - Inductive Learning will always provide a prediction based on learned rules

## Learning Strategies Explained

### Rote Learning
- **Mechanism**: Memorizes exact training examples
- **Prediction**: Only returns results for exact matches in training data
- **Strength**: 100% accuracy on training data
- **Weakness**: Cannot generalize to new examples
- **Example**: If trained on hours 1-5, it can only predict for 1, 2, 3, 4, or 5

### Inductive Learning
- **Mechanism**: Learns a general rule: "If study hours ≥ 3 → Pass, else → Fail"
- **Prediction**: Applies the learned rule to any input
- **Strength**: Can make predictions for unseen examples
- **Weakness**: May not capture all training-data patterns
- **Example**: Can predict for any number of hours, including 0, 6, 10, etc.

## Testing

Try these test cases:

1. **Training Examples** (1-5 hours):
   - Both strategies should get predictions right
   - Rote Learning: 100% accuracy
   - Inductive Learning: May vary slightly

2. **Unseen Examples** (0, 6, 7, 10 hours):
   - Rote Learning: Returns "No memorized result"
   - Inductive Learning: Provides predictions

3. **Edge Cases**:
   - Enter 0 hours
   - Enter negative hours (validation prevents this)
   - Enter very large numbers

## API Endpoints

### GET `/`
Returns the main HTML page with the training dataset.

### POST `/predict`
**Request body:**
```json
{
  "hours": 3
}
```

**Response:**
```json
{
  "hours": 3,
  "rote_prediction": "Pass",
  "inductive_prediction": "Pass",
  "rote_accuracy": 80.0,
  "inductive_accuracy": 80.0
}
```

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, Flask will automatically use the next available port.

### Module Not Found Error
Ensure all requirements are installed:
```bash
pip install -r requirements.txt
```

### Static Files Not Loading
Ensure the `static` folder structure is correct:
- `static/style.css`
- `static/script.js`

### Dataset Not Found
The app includes a fallback dataset if `dataset.csv` is missing, so the application will still run.

## Development

To run in development mode with auto-reload:
```bash
python app.py
```

The Flask development server will automatically reload when you make changes to the code.

## Future Enhancements

- Add more learning algorithms (Decision Trees, Neural Networks)
- Support for uploading custom datasets
- More complex learning rules
- Data visualization improvements
- User authentication and data logging

## License

This project is open source and available for educational purposes.

## Author

Created as an educational tool to demonstrate the differences between rote learning and inductive learning approaches in machine learning.
