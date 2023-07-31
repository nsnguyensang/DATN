from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from pymongo import MongoClient
from pymongo import DESCENDING
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
    column_order = ['square', 'floor', 'bathroom',
                    'bedroom', 'district', 'province', 'ward']
    sample_transformed = sample_transformed.reindex(columns=column_order)

    # Make the prediction using the loaded model
    y_pred = gbm2.predict(
        sample_transformed[0:1], num_iteration=gbm2.best_iteration_)

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
    column_order = ['square', 'floor', 'bathroom',
                    'bedroom', 'district', 'province', 'ward']
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


@app.route('/api/can-ho-theo-khoang-gia', methods=['GET'])
def get_can_ho_theo_khoang_gia():
    # Định nghĩa các khoảng giá (bạn có thể điều chỉnh theo nhu cầu)
    khoang_gia = [0, 500, 1000, 2000, 3000, 5000,
                  7000, 10000, 20000, 30000, 100000000]
    label_pie = ["< 500 triệu",
                 "500 triệu - 1 tỷ",
                 "1 - 2 tỷ",
                 "2 - 3 tỷ",
                 "3 - 5 tỷ",
                 "5 - 7 tỷ",
                 "7 - 10 tỷ",
                 "10 - 20 tỷ",
                 "20 -30 tỷ",
                 "> 30 tỷ"]

    # Lấy dữ liệu từ MongoDB (ví dụ: giá của căn hộ chung cư)
    data = collection.find({}, {"_id": 0, "price": 1})
    gia_can_ho = [item["price"] for item in data]

    # Khởi tạo danh sách số lượng căn hộ cho mỗi khoảng giá ban đầu là 0
    so_luong_can_ho = [0] * len(khoang_gia)

    # Đếm số lượng căn hộ thuộc vào từng khoảng giá
    for gia in gia_can_ho:
        for i in range(len(khoang_gia)):
            if i == 0:
                if gia <= khoang_gia[i] * 1000000:
                    so_luong_can_ho[i] += 1
            elif khoang_gia[i - 1] * 1000000 < gia <= khoang_gia[i] * 1000000:
                so_luong_can_ho[i] += 1

    # Chuẩn bị dữ liệu cho biểu đồ pie
    labels = ['{}-{}'.format(x, y) for x, y in zip(khoang_gia, khoang_gia[1:])]
    values = so_luong_can_ho

    # Tạo đối tượng JSON để trả về
    response = {
        'labels': label_pie,
        'values': values
    }

    return jsonify(response)


@app.route('/api/average-price-per-m2-by-project', methods=['GET'])
def get_average_price_per_m2_by_project():
    # Get the 'province' parameter from the request URL
    province = request.args.get('province')
    district = request.args.get('district')
    # Pipeline to group by project and calculate average price per square meter
    pipeline = [
        {"$match": {"province": province, "district": district, "project": {"$nin": [
            "Tin thường", "nan", "Tin miễn phí"]}}},  # Add a $match stage to filter by province
        {"$group": {"_id": "$project", "total_square": {
            "$sum": "$square"}, "total_price": {"$sum": "$price"}}},
        {"$project": {"project": "$_id", "average_price_per_m2": {
            "$divide": ["$total_price", "$total_square"]}, "_id": 0}},
        {"$match": {"average_price_per_m2": {"$gte": 1000000, "$lte": 1000000000}}},
        # Add $sort stage to sort by 'average_price_per_m2' in descending order
        {"$sort": {"average_price_per_m2": DESCENDING}}
    ]

    # Execute the aggregation pipeline
    result = list(collection.aggregate(pipeline))

    return jsonify(result)


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

    # Sử dụng aggregation framework của MongoDB để tối ưu truy vấn
    pipeline = [
        {
            '$match': {
                'price': {'$lt': 5e10, '$gt': 50000000},
                field: {'$lt': 500, '$gt': 0}
            }
        }
    ]

    # Thực hiện aggregation và lấy kết quả
    data = collection.aggregate(pipeline)

    # Chuyển đổi kết quả thành danh sách để trả về
    scatter_data = []
    for doc in data:
        scatter_entry = {
            'price': doc['price'] / 1000000,  # Chia cho 1 triệu để đổi đơn vị
            field: doc[field]
        }
        scatter_data.append(scatter_entry)

    return jsonify(scatter_data)


# Danh sách 25 tỉnh lớn nhất
top_provinces = [
    'Hà Nội', 'Hồ Chí Minh', 'Bình Dương', 'Đà Nẵng', 'Đồng Nai', 'Khánh Hòa', 'Long An', 'Hưng Yên',
    'Lâm Đồng', 'Bình Thuận', 'Bình Phước', 'Quảng Nam', 'Bà Rịa Vũng Tàu', 'Cần Thơ', 'Hòa Bình',
    'Quảng Ninh', 'Hải Phòng', 'Kiên Giang', 'Vĩnh Long', 'Quảng Bình', 'Bắc Ninh', 'Bình Định',
    'Bà Rịa - Vũng Tàu', 'Thanh Hóa', 'Đắk Lắk'
]

@app.route('/api/scatter-province', methods=["GET"])
def scatter_province():
    # Sử dụng aggregation framework của MongoDB để lấy dữ liệu tỉnh thành trong danh sách 25 tỉnh lớn nhất và Others
    pipeline = [
        {
            '$match': {
                'price': {'$lt': 5e10, '$gt': 50000000}
            }
        },
        {
            '$project': {
                '_id': 0,
                'province': {
                    '$cond': {
                        'if': {'$in': ['$province', top_provinces]},
                        'then': '$province',
                        'else': 'Others'
                    }
                },
                'price': {'$divide': ['$price', 1000000]}  # Chia cho 1 triệu để đổi đơn vị
            }
        }
    ]

    # Thực hiện aggregation và lấy kết quả
    data = collection.aggregate(pipeline)

    # Tạo danh sách kết quả để trả về
    scatter_data = list(data)

    return jsonify(scatter_data)


@app.route('/api/scatter_full', methods=["GET"])
def scatter_full():
    # Lấy trường từ tham số truy vấn (params)
    field = request.args.get('field')

    if field == 'province':
        # Sử dụng aggregation framework của MongoDB để lấy dữ liệu tỉnh thành trong danh sách 25 tỉnh lớn nhất và Others
        pipeline = [
            {
                '$match': {
                    'price': {'$lt': 5e10, '$gt': 50000000}
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'province': {
                        '$cond': {
                            'if': {'$in': ['$province', top_provinces]},
                            'then': '$province',
                            'else': 'Others'
                        }
                    },
                    'price': {'$divide': ['$price', 1000000]}  # Chia cho 1 triệu để đổi đơn vị
                }
            },
            {
                '$group': {
                    '_id': {
                        'province': '$province',
                        'price': '$price'
                    },
                    'count': {'$sum': 1}
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'province': '$_id.province',
                    'price': '$_id.price',
                    'count': 1
                }
            }
        ]

        # Thực hiện aggregation và lấy kết quả
        data = collection.aggregate(pipeline)

    else:
        # Sử dụng aggregation framework của MongoDB để lấy dữ liệu trường "price" và "field"
        pipeline = [
            {
                '$match': {
                    'price': {'$lt': 5e10, '$gt': 50000000},
                    field: {'$lt': 500, '$gt': 0}
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'price': {'$divide': ['$price', 1000000]},  # Chia cho 1 triệu để đổi đơn vị
                    field: '$' + field
                }
            },
            {
                '$group': {
                    '_id': '$price',
                    'field_value': {'$first': '$' + field},
                    'count': {'$sum': 1}
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'price': '$_id',
                    field: '$field_value',
                    'count': 1
                }
            }
        ]

        # Thực hiện aggregation và lấy kết quả
        data = collection.aggregate(pipeline)

    # Tạo danh sách kết quả để trả về
    scatter_data = list(data)

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
