from flask import Flask, render_template, request, jsonify
import csv
import os

app = Flask(__name__)

# Load dataset from CSV file
def load_dataset():
    dataset = {}
    csv_path = os.path.join(os.path.dirname(__file__), 'dataset.csv')

    try:
        with open(csv_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                hours = int(row['study_hours'])
                result = row['result']
                dataset[hours] = result
    except FileNotFoundError:
        print("Warning: dataset.csv not found. Using default dataset.")
        # Fallback dataset if CSV is missing
        dataset = {1: 'Fail', 2: 'Fail', 3: 'Pass', 4: 'Pass', 5: 'Pass'}

    return dataset

# Rote Learning Algorithm
class RoteLearning:
    def __init__(self, dataset):
        self.dataset = dataset

    def predict(self, hours):
        """
        Rote learning: Check if exact example exists in memory
        Returns the stored result if found, otherwise "No memorized result"
        """
        if hours in self.dataset:
            return self.dataset[hours]
        else:
            return "No memorized result"

    def calculate_accuracy(self, test_data=None):
        """
        Calculate accuracy on training data (since rote learning can't generalize)
        For rote learning, accuracy is 100% on training data, 0% on unseen data
        """
        if test_data is None:
            test_data = self.dataset

        correct = 0
        total = len(test_data)

        for hours, expected in test_data.items():
            prediction = self.predict(hours)
            if prediction == expected:
                correct += 1

        return (correct / total) * 100 if total > 0 else 0

# Inductive Learning Algorithm
class InductiveLearning:
    def __init__(self, dataset):
        self.dataset = dataset
        self.rule = self.learn_rule()

    def learn_rule(self):
        """
        Learn a simple rule from the dataset
        For this example: if study hours >= 3, predict Pass, else Fail
        """
        # Find the minimum hours that result in Pass
        pass_hours = [hours for hours, result in self.dataset.items() if result == 'Pass']
        if pass_hours:
            threshold = min(pass_hours)
            return lambda hours: 'Pass' if hours >= threshold else 'Fail'
        else:
            return lambda hours: 'Fail'  # Default to Fail if no Pass examples

    def predict(self, hours):
        """
        Make prediction using learned rule
        """
        return self.rule(hours)

    def calculate_accuracy(self, test_data=None):
        """
        Calculate accuracy on given test data
        """
        if test_data is None:
            test_data = self.dataset

        correct = 0
        total = len(test_data)

        for hours, expected in test_data.items():
            prediction = self.predict(hours)
            if prediction == expected:
                correct += 1

        return (correct / total) * 100 if total > 0 else 0

# Global variables
dataset = load_dataset()
rote_learner = RoteLearning(dataset)
inductive_learner = InductiveLearning(dataset)

@app.route('/')
def home():
    """Render the main page with dataset"""
    return render_template('index.html', dataset=dataset)

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests"""
    try:
        data = request.get_json()
        hours = int(data['hours'])

        # Get predictions from both learning strategies
        rote_prediction = rote_learner.predict(hours)
        inductive_prediction = inductive_learner.predict(hours)

        # Calculate accuracies
        rote_accuracy = rote_learner.calculate_accuracy()
        inductive_accuracy = inductive_learner.calculate_accuracy()

        return jsonify({
            'hours': hours,
            'rote_prediction': rote_prediction,
            'inductive_prediction': inductive_prediction,
            'rote_accuracy': rote_accuracy,
            'inductive_accuracy': inductive_accuracy
        })

    except (ValueError, KeyError) as e:
        return jsonify({'error': 'Invalid input. Please provide a valid number of hours.'}), 400

if __name__ == '__main__':
    app.run(debug=True)