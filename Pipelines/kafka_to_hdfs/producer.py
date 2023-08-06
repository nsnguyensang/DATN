from kafka import KafkaConsumer
from hdfs import InsecureClient

# Cấu hình Kafka
kafka_bootstrap_servers = 'localhost:9092'
kafka_topic = 'my_topic'

# Cấu hình HDFS
hdfs_namenode_url = 'http://localhost:9870'
hdfs_path = 'hdfs://localhost:9000//kafka_data/data.csv'

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
    value = message.value  
    file_path = hdfs_path + f'kafka_data_{message.offset}.csv' 
    with hdfs_client.write(file_path, overwrite=True) as hdfs_file:
        hdfs_file.write(value)  # Ghi dữ liệu vào tệp HDFS

   
    

# Đóng kết nối Kafka Consumer






