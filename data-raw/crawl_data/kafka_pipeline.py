from kafka import KafkaProducer
from crawl_data.settings import KAFKA_SERVERS, KAFKA_TOPIC


class KafkaPipeline:
    def __init__(self):
        self.producer: KafkaProducer(bootstrap_servers=KAFKA_SERVERS)
    def process_item(self, item, spider):
        data: {
            'title': item['title'],
            'price': item['price'],
            'description': item['description'],
            'link_image': item['link_image'],
            'url_page': item['url_page'],
            'bedroom': item['bedroom'],
            'bathroom': item['bathroom'],
            'acreage': item['acreage'],
            'address': item['address'],
            'direction': item['direction'],
            'date': item['date'],
            'code': item['code'],
            'name_contact': item['name_contact'],
            'phone_contact': item['phone_contact'],
            'project': item['project'],

        }
        message = str(data).encode('utf-8')
        self.producer.send(KAFKA_TOPIC, value=message)
        return item


