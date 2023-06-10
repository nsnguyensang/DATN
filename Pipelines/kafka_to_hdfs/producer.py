from kafka import KafkaConsumer
from hdfs import InsecureClient

# Cấu hình Kafka
kafka_bootstrap_servers = 'localhost:9092'
kafka_topic = 'my_topic'

# Cấu hình HDFS
hdfs_namenode_url = 'http://localhost:9870'
hdfs_path = 'hdfs://localhost:9000//kafka_data/data.txt'

# Khởi tạo Kafka Consumer
consumer = KafkaConsumer(
    kafka_topic,
    bootstrap_servers=kafka_bootstrap_servers,
    enable_auto_commit=False
)

# Khởi tạo HDFS Client
hdfs_client = InsecureClient(hdfs_namenode_url)

# Đọc và đẩy dữ liệu từ Kafka vào HDFS
for message in consumer:
    value = message.value  # Giả sử dữ liệu là chuỗi UTF-8
    file_path = hdfs_path + f'kafka_data_{message.offset}.txt'  # Định dạng tên tệp HDFS
    with hdfs_client.write(file_path, overwrite=True) as hdfs_file:
        hdfs_file.write(value)  # Ghi dữ liệu vào tệp HDFS

    # Đánh dấu là đã xử lý thành công
    

# Đóng kết nối Kafka Consumer






