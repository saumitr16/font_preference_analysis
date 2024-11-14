from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load('font_usage_classifier.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:

        gender_mapping = {'Male': 0, 'Female': 1}
        usage_frequency_mapping = {'Never': 0, 'Rarely': 1, 'Sometimes': 2, 'Often': 3, 'Always': 4}
        usage_context_mapping = {'Professional': 0, 'Personal': 1, 'Educational': 2}
        
        
        age = float(data['age'])
        gender = float(gender_mapping[data['gender']])
        usage_frequency = float(usage_frequency_mapping[data['usageFrequency']])
        usage_context = float(usage_context_mapping[data['usageContext']])
        preferred_font_size = float(data['preferredFontSize'])

        feature_names = ['age', 'gender', 'usage_frequency', 'usage_context', 'preferred_font_size']

        input_data = pd.DataFrame([[age, gender, usage_frequency, usage_context, preferred_font_size]],
                                  columns=feature_names)
        
        prediction = model.predict(input_data)[0]

        return jsonify({'message': f'Predicted Font Name: {prediction}'})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

