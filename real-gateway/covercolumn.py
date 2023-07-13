import pymongo
import re
# Kết nối tới cơ sở dữ liệu MongoDB
# client = pymongo.MongoClient('mongodb+srv://sangnv:sangnv@cluster0.auukqtg.mongodb.net/')
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['realEstate']  # Thay đổi tên database tùy theo mong muốn
# Thay đổi tên collection tùy theo mong muốn
collection = db['estateCollection']

# Lấy tất cả các bản ghi trong collection
data = collection.find()

for document in data:
    # Kiểm tra nếu trường 'price' là chuỗi
    # if isinstance(document['price'], str):
    #     # Chuyển đổi chuỗi thành số thực và cập nhật vào cơ sở dữ liệu
    #     new_price = float(document['price'])
    #     collection.update_one({'_id': document['_id']}, {
    #                           '$set': {'price': new_price}})
    # if isinstance(document['square'], str):
    #     # Chuyển đổi chuỗi thành số thực và cập nhật vào cơ sở dữ liệu
    #     new_square = float(document['square'])
    #     collection.update_one({'_id': document['_id']}, {
    #                           '$set': {'square': new_square}})
    if isinstance(document['width'], str):
        if document['width'] == '':
            # Gán giá trị 0 cho các trường 'width' là chuỗi rỗng
            new_width = 0
        else:
            # Loại bỏ các ký tự không phải số, dấu phẩy và dấu chấm thập phân
            cleaned_width = re.sub('[^0-9.,]', '', document['width'])
            # Thay thế dấu phẩy bằng dấu chấm
            cleaned_width = cleaned_width.replace(',', '.')
            # Chuyển đổi chuỗi thành số thực
            new_width = float(cleaned_width)
        collection.update_one({'_id': document['_id']}, {
                              '$set': {'width': new_width}})

print("Đã chuyển đổi kiểu dữ liệu thành công.")
