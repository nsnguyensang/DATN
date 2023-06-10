from kafka import KafkaProducer
from crawl_data.settings import KAFKA_SERVERS, KAFKA_TOPIC

class KafkaPipeline:
    def __init__(self):
        self.producer = KafkaProducer(bootstrap_servers=KAFKA_SERVERS)

    def process_item(self, item, spider):
        # Chuyển đổi item thành dữ liệu JSON hoặc chuỗi bằng cách tuỳ chỉnh theo nhu cầu của bạn
        data = {
            'field1': item['title'],
            'field2': item['price'],
            # Thêm các trường khác của item tại đây
        }
        message = str(data).encode('utf-8')
        self.producer.send(KAFKA_TOPIC, value=message)
        return item