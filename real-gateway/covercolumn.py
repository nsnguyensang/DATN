import pymongo

# Kết nối tới cơ sở dữ liệu MongoDB
client = pymongo.MongoClient('mongodb+srv://sangnv:sangnv@cluster0.auukqtg.mongodb.net/')
db = client['realEstate']  # Thay đổi tên database tùy theo mong muốn
collection = db['estateCollection']  # Thay đổi tên collection tùy theo mong muốn

# Lấy tất cả các bản ghi trong collection
data = collection.find()

for document in data:
    # Kiểm tra nếu trường 'price' là chuỗi
    if isinstance(document['price'], str):
        # Chuyển đổi chuỗi thành số thực và cập nhật vào cơ sở dữ liệu
        new_price = float(document['price'])
        collection.update_one({'_id': document['_id']}, {'$set': {'price': new_price}})
    if isinstance(document['square'], str):
        # Chuyển đổi chuỗi thành số thực và cập nhật vào cơ sở dữ liệu
        new_square = float(document['square'])
        collection.update_one({'_id': document['_id']}, {'$set': {'square': new_square}})
print("Đã chuyển đổi kiểu dữ liệu thành công.")