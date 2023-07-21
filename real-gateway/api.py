from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from pymongo import MongoClient
import urllib.parse
import math
import numpy as np
import sys
import pickle
import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import norm
import joblib
import json
from typing import Dict, Any


# Load mô hình từ file

with open('C:/Workspace/DATN/data-modeling/ver3/gbm_model_ver3.pkl', 'rb') as file:
    gbm2 = pickle.load(file)
with open('C:/Workspace/DATN/data-modeling/ver3/knn_model_ver3.pkl', 'rb') as file:
    knn3 = pickle.load(file)
# Define the directory path where the files are saved
save_dir = 'C:/Workspace/DATN/data-modeling/ver3/'

# Load the LabelEncoder objects from files
lbl = {}
cols = ['district', 'province', 'ward']
for c in cols:
    with open(os.path.join(save_dir, f'{c}_label_encoder_ver3.pkl'), 'rb') as file:
        lbl[c] = pickle.load(file)

app = Flask(__name__)
CORS(app)
# Thiết lập kết nối tới MongoDB
# client = MongoClient(
#     'mongodb+srv://sangnv:sangnv@cluster0.auukqtg.mongodb.net/')
client = MongoClient(
    'mongodb://localhost:27017/')
db = client['realEstate']  # Thay đổi tên database tùy theo mong muốn
# Thay đổi tên collection tùy theo mong muốn
collection = db['estateCollection_v2']

if sys.stdout.encoding != 'utf-8':
    sys.stdout = open(sys.stdout.fileno(), mode='w',
                      encoding='utf-8', buffering=1)



@app.route('/api/predict/gbm', methods=['POST'])
def predict_gbm():
    # Get the input data from the request
    input_data = request.get_json()

    # Create a sample DataFrame from the input_data dictionary
    sample_transformed = pd.DataFrame()
    for c in cols:
        if c in input_data:
            # Check if the input data contains new values that were not in the training data
            new_values = list(set(input_data[c]) - set(lbl[c].classes_))
            if new_values:
                # Add the new values to the LabelEncoder classes and transform the input data
                lbl[c].classes_ = np.concatenate((lbl[c].classes_, new_values))
            sample_transformed[c] = lbl[c].transform(input_data[c])

    cols_num = ['square', 'floor', 'bathroom', 'bedroom']
    for c in cols_num:
        sample_transformed[c] = float(input_data[c])
    column_order = ['square', 'floor', 'bathroom', 'bedroom', 'district', 'province', 'ward']
    sample_transformed = sample_transformed.reindex(columns=column_order)

    # Make the prediction using the loaded model
    y_pred = gbm2.predict(sample_transformed[0:1], num_iteration=gbm2.best_iteration_)

    # Return the prediction as a response
    prediction_value = y_pred[0]
    response = {
        "prediction": prediction_value
    }

    return jsonify(response)
# api dự đoán giá modal KNN


@app.route('/api/predict/knn', methods=['POST'])
def predict_knn():
    # Get the input data from the request
    input_data = request.get_json()

    # Create a sample DataFrame from the input_data dictionary
    sample_transformed = pd.DataFrame()
    for c in cols:
        if c in input_data:
            # Check if the input data contains new values that were not in the training data
            new_values = list(set(input_data[c]) - set(lbl[c].classes_))
            if new_values:
                # Add the new values to the LabelEncoder classes and transform the input data
                lbl[c].classes_ = np.concatenate((lbl[c].classes_, new_values))
            sample_transformed[c] = lbl[c].transform(input_data[c])

    cols_num = ['square', 'floor', 'bathroom', 'bedroom']
    for c in cols_num:
        sample_transformed[c] = float(input_data[c])
    column_order = ['square', 'floor', 'bathroom','bedroom', 'district', 'province', 'ward']
    sample_transformed = sample_transformed.reindex(columns=column_order)

    # Make the prediction using the loaded model
    y_pred = knn3.predict(sample_transformed[0:1])

    # Return the prediction as a response
    prediction_value = y_pred[0][0]
    response = {
        "prediction": prediction_value
    }

    return jsonify(response)


# API gọi dữ liệu phân trang


@app.route('/api/search', methods=['POST'])
def search_data():
    # Lấy dữ liệu từ yêu cầu POST
    data = request.get_json()

    # Lấy từ khóa tìm kiếm từ dữ liệu
    encoded_title = data.get('title', '')

    # Giải mã từ khóa
    title = urllib.parse.unquote(encoded_title)

    # Lấy giá trị tối thiểu và tối đa từ dữ liệu
    min_price = float(data.get('min_price', 0))
    max_price = float(data.get('max_price', float('inf')))
    min_square = float(data.get('min_square', 0))
    max_square = float(data.get('max_square', float('inf')))

    # Lấy giá trị tỉnh/thành phố từ dữ liệu
    province = data.get('province', '')

    # Lấy giá trị quận/huyện từ dữ liệu
    district = data.get('district', '')
    project = data.get('project', '')
    bedroom = data.get('bedroom', '')
    direct = data.get('direct', '')
    ward = data.get('ward', '')
    # Tạo query để tìm kiếm trong trường "title", lọc theo giá, và tìm theo tỉnh/thành phố và quận/huyện
    query = {
        'title': {'$regex': title, '$options': 'i'},
        'price': {'$gte': min_price, '$lte': max_price},
        'square': {'$gte': min_square, '$lte': max_square},
        'province': {'$regex': province, '$options': 'i'},
        'district': {'$regex': district, '$options': 'i'},
        'ward': {'$regex': ward, '$options': 'i'},
        'project': {'$regex': project, '$options': 'i'},
        'bedroom': {'$regex': bedroom, '$options': 'i'},
        'direct': {'$regex': direct, '$options': 'i'},
    }
    # Phân trang
    page = int(data.get('page', 1))
    limit = int(data.get('limit', 10))

    skip = (page - 1) * limit

    results = list(collection.find(query, {'_id': 0}).skip(skip).limit(limit))
    total_results = collection.count_documents(query)
    return jsonify(
        {
            'total': total_results,
            'data': results
        }
    )


@app.route("/api/allocation-by-province", methods=["GET"])
def get_allocation_by_province():
    # Thực hiện truy vấn để lấy dữ liệu từ MongoDB
    query = {}
    projection = {'_id': 0}
    data = list(collection.find(query, projection))
    limit = int(request.args.get('limit', 20))
    province_counts = {}
    for item in data:
        province = item.get('province')
        if province:
            province_counts[province] = province_counts.get(province, 0) + 1

    result = {
        "labels": list(province_counts.keys()),
        "counts": list(province_counts.values())
    }
    sorted_result = sorted(
        zip(result["labels"], result["counts"]), key=lambda x: x[1], reverse=True)
    # Chỉ lấy ra số lượng giá trị cần thiết
    sorted_result = sorted_result[:limit]

    sorted_labels = [item[0] for item in sorted_result]
    sorted_counts = [item[1] for item in sorted_result]

    sorted_result = {
        "labels": sorted_labels,
        "counts": sorted_counts
    }

    return jsonify(sorted_result)

@app.route("/api/allocation-by-project", methods=["GET"])
def get_allocation_by_project():
    # Thực hiện truy vấn để lấy dữ liệu từ MongoDB
    query = {}
    projection = {'_id': 0}
    data = list(collection.find(query, projection))
    limit = int(request.args.get('limit', 20))
    province_counts = {}
    for item in data:
        province = item.get('project')
        if province and isinstance(province, str) and province.strip().lower() not in ['nan', 'none', 'tin thường']:
            province_counts[province] = province_counts.get(province, 0) + 1

    result = {
        "labels": list(province_counts.keys()),
        "counts": list(province_counts.values())
    }
    sorted_result = sorted(
        zip(result["labels"], result["counts"]), key=lambda x: x[1], reverse=True)
    # Chỉ lấy ra số lượng giá trị cần thiết
    sorted_result = sorted_result[:limit]

    sorted_labels = [item[0] for item in sorted_result]
    sorted_counts = [item[1] for item in sorted_result]

    sorted_result = {
        "labels": sorted_labels,
        "counts": sorted_counts
    }

    return jsonify(sorted_result)
@app.route("/api/allocation-by-bedroom", methods=["GET"])
def get_allocation_by_bedroom():
    # Thực hiện truy vấn để lấy dữ liệu từ MongoDB
    query = {}
    projection = {'_id': 0}
    data = list(collection.find(query, projection))
    limit = int(request.args.get('limit', 20))
    province_counts = {}
    for item in data:
        province = item.get('bedroom')
        if province:
            province_counts[province] = province_counts.get(province, 0) + 1

    result = {
        "labels": list(province_counts.keys()),
        "counts": list(province_counts.values())
    }
    sorted_result = sorted(
        zip(result["labels"], result["counts"]), key=lambda x: x[1], reverse=True)
    # Chỉ lấy ra số lượng giá trị cần thiết
    sorted_result = sorted_result[:limit]

    sorted_labels = [item[0] for item in sorted_result]
    sorted_counts = [item[1] for item in sorted_result]

    sorted_result = {
        "labels": sorted_labels,
        "counts": sorted_counts
    }

    return jsonify(sorted_result)
@app.route("/api/allocation-by-bathroom", methods=["GET"])
def get_allocation_by_bathroom():
    # Thực hiện truy vấn để lấy dữ liệu từ MongoDB
    query = {}
    projection = {'_id': 0}
    data = list(collection.find(query, projection))
    limit = int(request.args.get('limit', 20))
    province_counts = {}
    for item in data:
        province = item.get('bathroom')
        if province and isinstance(province, str) and province.strip().lower() not in ['nan']:
            province_counts[province] = province_counts.get(province, 0) + 1

    result = {
        "labels": list(province_counts.keys()),
        "counts": list(province_counts.values())
    }
    sorted_result = sorted(
        zip(result["labels"], result["counts"]), key=lambda x: x[1], reverse=True)
    # Chỉ lấy ra số lượng giá trị cần thiết
    sorted_result = sorted_result[:limit]

    sorted_labels = [item[0] for item in sorted_result]
    sorted_counts = [item[1] for item in sorted_result]

    sorted_result = {
        "labels": sorted_labels,
        "counts": sorted_counts
    }

    return jsonify(sorted_result)
@app.route("/api/allocation-by-floor", methods=["GET"])
def get_allocation_by_floor():
    # Thực hiện truy vấn để lấy dữ liệu từ MongoDB
    query = {}
    projection = {'_id': 0}
    data = list(collection.find(query, projection))
    limit = int(request.args.get('limit', 20))
    province_counts = {}
    for item in data:
        province = item.get('floor')
        if province:
            province_counts[province] = province_counts.get(province, 0) + 1

    result = {
        "labels": list(province_counts.keys()),
        "counts": list(province_counts.values())
    }
    sorted_result = sorted(
        zip(result["labels"], result["counts"]), key=lambda x: x[1], reverse=True)
    # Chỉ lấy ra số lượng giá trị cần thiết
    sorted_result = sorted_result[:limit]

    sorted_labels = [item[0] for item in sorted_result]
    sorted_counts = [item[1] for item in sorted_result]

    sorted_result = {
        "labels": sorted_labels,
        "counts": sorted_counts
    }

    return jsonify(sorted_result)
@app.route('/api/scatter-visual', methods=["GET"])
def scatter_visual():
    # Lấy trường từ tham số truy vấn (params)
    field = request.args.get('field')

    # Trường "price" luôn được thêm vào danh sách để so sánh
    fields: Dict[str, Any] = {'price': 1, field: 1}

    # Truy vấn dữ liệu từ MongoDB
    data = collection.find({'price': {'$lt':  2e10, '$gt': 50000000}, field: {
                           '$lt': 300, '$gt': 0}}, {'_id': 0, **fields})

    # Chuẩn bị dữ liệu để trả về
    scatter_data = []
    for doc in data:
        scatter_entry = {}
        for key, value in fields.items():
            if key == 'price':
                scatter_entry[key] = doc[key] / 1000000
            else:
                scatter_entry[key] = doc[key]

        scatter_data.append(scatter_entry)

    return jsonify(scatter_data)


@app.route('/api/plot-image', methods=["GET"])
def plot_image():
    # Truy vấn dữ liệu từ MongoDB
    data = collection.find({}, {'_id': 0, 'square': 1})

    # Lấy dữ liệu square từ kết quả truy vấn
    squares = [doc['square'] for doc in data]

    # Vẽ đồ thị
    sns.distplot(squares, fit=norm)

    # Lấy thông số fit của hàm
    (mu, sigma) = norm.fit(squares)

    # Tạo chú thích và tiêu đề
    plt.legend(['Normal dist. ($\mu=$ {:.2f} and $\sigma=$ {:.2f} )'.format(
        mu, sigma)], loc='best')
    plt.ylabel('Frequency')
    plt.title('Square distribution')

    # Lưu đồ thị vào tệp ảnh
    image_path = 'C:/Workspace/DATN/real-gateway/plot.png'
    plt.savefig(image_path)

    # Trả về tệp ảnh
    return send_file(image_path, mimetype='image/png')


if __name__ == '__main__':
    app.run()
