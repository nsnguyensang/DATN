import pymongo
import re
# Kết nối tới cơ sở dữ liệu MongoDB
# client = pymongo.MongoClient('mongodb+srv://sangnv:sangnv@cluster0.auukqtg.mongodb.net/')
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['realEstate']  # Thay đổi tên database tùy theo mong muốn
# Thay đổi tên collection tùy theo mong muốn
collection = db['estateCollection_v2']

# Lấy tất cả các bản ghi trong collection
data = collection.find()

for document in data:
    # Kiểm tra nếu trường 'bathroom' là chuỗi và chứa ".0" ở cuối
    # if isinstance(document['bathroom'], str) and document['bathroom'].endswith(".0"):
    #     # Loại bỏ ".0" đằng sau số nguyên
    #     new_bathroom = document['bathroom'][:-2]
    #     collection.update_one({'_id': document['_id']}, {'$set': {'bathroom': new_bathroom}})
    # if isinstance(document['bedroom'], str) and document['bedroom'].endswith(".0"):
    #     # Loại bỏ ".0" đằng sau số nguyên
    #     new_bedroom = document['bedroom'][:-2]
    #     collection.update_one({'_id': document['_id']}, {'$set': {'bedroom': new_bedroom}})
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
    # if isinstance(document['floor'], str):
    #     # Chuyển đổi chuỗi thành số thực và cập nhật vào cơ sở dữ liệu
    #     new_floor = float(document['floor'])
    #     collection.update_one({'_id': document['_id']}, {
    #                           '$set': {'floor': new_floor}})
    if isinstance(document['bedroom'], str):
        # Chuyển đổi chuỗi thành số thực và cập nhật vào cơ sở dữ liệu
        new_bedroom = float(document['bedroom'])
        collection.update_one({'_id': document['_id']}, {
                              '$set': {'bedroom': new_bedroom}})
    # if isinstance(document['width'], str):
    #     if document['width'] == '':
    #         # Gán giá trị 0 cho các trường 'width' là chuỗi rỗng
    #         new_width = 0
    #     else:
    #         # Loại bỏ các ký tự không phải số, dấu phẩy và dấu chấm thập phân
    #         cleaned_width = re.sub('[^0-9.,]', '', document['width'])
    #         # Thay thế dấu phẩy bằng dấu chấm
    #         cleaned_width = cleaned_width.replace(',', '.')
    #         # Chuyển đổi chuỗi thành số thực
    #         new_width = float(cleaned_width)
    #     collection.update_one({'_id': document['_id']}, {
    #                           '$set': {'width': new_width}})

print("Đã chuyển đổi kiểu dữ liệu thành công.")
