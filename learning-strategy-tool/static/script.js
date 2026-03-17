// Global variables
let dataset = {};
let accuracyChart = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadDataset();
    setupEventListeners();
});

// Load dataset from the page (passed from Flask)
function loadDataset() {
    // Dataset is already rendered in the HTML template
    console.log('Dataset loaded from template');
}

// Setup event listeners
function setupEventListeners() {
    const form = document.getElementById('prediction-form');
    form.addEventListener('submit', handlePrediction);
}

// Handle prediction form submission
async function handlePrediction(event) {
    event.preventDefault();

    const hours = parseInt(document.getElementById('hours').value);

    if (isNaN(hours) || hours < 0) {
        alert('Please enter a valid number of study hours (0 or greater)');
        return;
    }

    try {
        // Make API call to Flask backend
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hours: hours })
        });

        const data = await response.json();

        // Display results
        displayResults(data);

        // Show results container
        document.getElementById('results').style.display = 'block';

        // Scroll to results
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while making the prediction. Please try again.');
    }
}

// Display prediction results
function displayResults(data) {
    // Update Rote Learning result
    const roteResult = document.getElementById('rote-result');
    const roteAccuracy = document.getElementById('rote-accuracy');

    if (data.rote_prediction === 'No memorized result') {
        roteResult.textContent = data.rote_prediction;
        roteResult.style.color = '#dc3545';
    } else {
        roteResult.textContent = data.rote_prediction;
        roteResult.style.color = data.rote_prediction === 'Pass' ? '#28a745' : '#dc3545';
    }

    roteAccuracy.textContent = data.rote_accuracy.toFixed(1);

    // Update Inductive Learning result
    const inductiveResult = document.getElementById('inductive-result');
    const inductiveAccuracy = document.getElementById('inductive-accuracy');

    inductiveResult.textContent = data.inductive_prediction;
    inductiveResult.style.color = data.inductive_prediction === 'Pass' ? '#28a745' : '#dc3545';
    inductiveAccuracy.textContent = data.inductive_accuracy.toFixed(1);

    // Create or update chart
    createAccuracyChart(data.rote_accuracy, data.inductive_accuracy);
}

// Create accuracy comparison chart
function createAccuracyChart(roteAccuracy, inductiveAccuracy) {
    const ctx = document.getElementById('accuracyChart').getContext('2d');

    // Destroy existing chart if it exists
    if (accuracyChart) {
        accuracyChart.destroy();
    }

    accuracyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Rote Learning', 'Inductive Learning'],
            datasets: [{
                label: 'Accuracy (%)',
                data: [roteAccuracy, inductiveAccuracy],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Learning Strategy Accuracy Comparison',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Accuracy (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Learning Strategy'
                    }
                }
            }
        }
    });
}