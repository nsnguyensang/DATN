from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import urllib.parse
import sys
import json

app = Flask(__name__)
CORS(app)
# Thiết lập kết nối tới MongoDB
client = MongoClient(
    'mongodb+srv://sangnv:sangnv@cluster0.auukqtg.mongodb.net/')
db = client['realEstate']  # Thay đổi tên database tùy theo mong muốn
# Thay đổi tên collection tùy theo mong muốn
collection = db['estateCollection']

if sys.stdout.encoding != 'utf-8':
    sys.stdout = open(sys.stdout.fileno(), mode='w',
                      encoding='utf-8', buffering=1)

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


@app.route('/api/filter', methods=['GET'])
def filter_data():
    # Lấy giá trị tối thiểu và tối đa từ tham số truy vấn
    min_price = float(request.args.get('min_price', 0))
    max_price = float(request.args.get('max_price', float('inf')))

    # Tạo query để lọc dữ liệu theo giá
    query = {
        'price': {'$gte': min_price, '$lte': max_price}
    }

    # Truy vấn dữ liệu từ collection với query lọc
    data = list(collection.find(query, {'_id': 0}))

    # Trả về kết quả lọc dữ liệu dưới dạng JSON
    return jsonify(data)


if __name__ == '__main__':
    app.run()
