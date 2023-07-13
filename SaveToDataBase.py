import csv
from pymongo import MongoClient

# Thiết lập kết nối tới MongoDB
# client = MongoClient('mongodb+srv://sangnv:sangnv@cluster0.auukqtg.mongodb.net/')
client = MongoClient('mongodb://localhost:27017/')
db = client['realEstate']  # Thay đổi tên database tùy theo mong muốn
collection = db['estateCollection']  # Thay đổi tên collection tùy theo mong muốn

# Đường dẫn đến file CSV
csv_file_path = 'C:/Workspace/DATN/schema-matching/output/data_clean_mongo.csv'  # Thay đổi tên file CSV tùy theo đường dẫn thực tế

# Đọc dữ liệu từ file CSV và đẩy vào MongoDB
with open(csv_file_path, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        collection.insert_one(row)