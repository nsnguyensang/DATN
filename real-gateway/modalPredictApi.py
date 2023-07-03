from flask import Flask, jsonify, request
import pickle
import os
import pandas as pd


# Load the model
with open('C:/Workspace/DATN/data-modeling/knn_model2.pkl', 'rb') as file:
    knn2 = pickle.load(file)
# Define the directory path where the files are saved
save_dir = 'C:/Workspace/DATN/data-modeling/'

# Load the LabelEncoder objects from files
lbl = {}
cols = ['district', 'province', 'ward']
for c in cols:
    with open(os.path.join(save_dir, f'{c}_label_encoder2.pkl'), 'rb') as file:
        lbl[c] = pickle.load(file)

# Create a Flask app
app = Flask(__name__)

# Define an API endpoint


@app.route('/api/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    input_data = request.get_json()

    # Transform the input data using the loaded LabelEncoder objects
    sample_transformed = pd.DataFrame()
    for c in cols:
        sample_transformed[c] = lbl[c].transform(input_data[c])

    cols_num = ['square', 'floor', 'bedroom']
    for c in cols_num:
        sample_transformed[c] = float(input_data[c])

    column_order = ['square', 'floor', 'bedroom',
                    'district', 'province', 'ward']
    sample_transformed = sample_transformed.reindex(columns=column_order)

    # Make the prediction using the loaded model
    y_pred = knn2.predict(sample_transformed[0:1])

    # Return the prediction as a response
    prediction_value = y_pred[0][0]
    response = {
        "prediction": prediction_value
    }

    return jsonify(response)


# Run the Flask app
if __name__ == '__main__':
    app.run()
