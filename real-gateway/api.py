from flask import Flask, jsonify, request
from pymongo import MongoClient
import urllib.parse
import sys
import json

app = Flask(__name__)

# Thiết lập kết nối tới MongoDB
client = MongoClient('mongodb+srv://sangnv:sangnv@cluster0.auukqtg.mongodb.net/')
db = client['realEstate']  # Thay đổi tên database tùy theo mong muốn
collection = db['estateCollection']  # Thay đổi tên collection tùy theo mong muốn

if sys.stdout.encoding != 'utf-8':
    sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)

# API gọi dữ liệu phân trang

@app.route('/api/data', methods=['GET'])
def get_data():
    # Lấy tham số truy vấn từ URL
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 100))

    # Tính toán vị trí bắt đầu và kết thúc của trang
    start_index = (page - 1) * per_page
    end_index = start_index + per_page

    # Truy vấn dữ liệu từ collection
    data = list(collection.find({}, {'_id': 0}).skip(start_index).limit(per_page))

    # In ra dữ liệu
    # for item in data:
    #     print(item)

    # Trả về dữ liệu dưới dạng JSON
    return jsonify(data)

# API filter search
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

    # Lấy giá trị tỉnh/thành phố từ dữ liệu
    province = data.get('province', '')

    # Lấy giá trị quận/huyện từ dữ liệu
    district = data.get('district', '')
    project = data.get('project', '')
    bedroom = data.get('bedroom', '')

    # Tạo query để tìm kiếm trong trường "title", lọc theo giá, và tìm theo tỉnh/thành phố và quận/huyện
    query = {
        'title': {'$regex': title, '$options': 'i'},
        'price': {'$gte': min_price, '$lte': max_price},
        'province': {'$regex': province, '$options': 'i'},
        'district': {'$regex': district, '$options': 'i'},
        'project' : {'$regex': project, '$options': 'i'},
        'bedroom' : {'$regex': bedroom, '$options': 'i'},
    }

    # Truy vấn dữ liệu từ collection với query tìm kiếm
    result = list(collection.find(query, {'_id': 0}))

    # Trả về kết quả tìm kiếm dưới dạng JSON
    return jsonify(result)


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