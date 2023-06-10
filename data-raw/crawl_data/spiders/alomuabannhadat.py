import scrapy
from scrapy.selector import Selector
from scrapy.loader import ItemLoader   
from itemloaders.processors import TakeFirst
from ..items import CrawlAlomuabannhadatItem

class AlomuabannhadatSpider(scrapy.Spider):
    i=1
    name = "alomuabannhadat_vn"
    base_url="https://alomuabannhadat.vn/nha-ban/ban-can-ho-chung-cu/page-"
    def start_requests(self):
        start_urls=[
            "https://alomuabannhadat.vn/nha-ban/ban-can-ho-chung-cu/page-1/"
        ]
        headers = {
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'DNT': '1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36',
            'Sec-Fetch-User': '?1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)
    def parse(self, response):
        products = response.css('.property ')
        for product in products:
            link_detail = product.css('a::attr(href)').extract_first()
            yield response.follow(link_detail, self.parse_detail)

        if self.i < 120:
            self.i += 1
            path_next = self.base_url + str(self.i) + "/"
            yield response.follow(path_next, callback=self.parse)
    def parse_detail(self, response):
        item_loader = ItemLoader(
            item=CrawlAlomuabannhadatItem(), response=response)
        item_loader.default_output_processor = TakeFirst()
        title = response.css("h1::text").get()
    
        item_loader.add_value('title', title.strip())

        # address = response.css("div.address>span.value::text").get()
        # # print(address)
        # item_loader.add_value('address', address.strip())

        price = response.css(
            "#property-detail>.property-title>figure> span > b::text").getall()[0]
       
        item_loader.add_value('price', price.strip())
        prarams = response.css('section#quick-summary>dl>dt').getall()
        values = response.css('section#quick-summary>dl>dd').getall()
 
        for i in range(len(prarams)):
            item = prarams[i]
            item = item.replace('<dt>', '')
            item = item.replace('</dt>', '')
            value = values[i].replace('<dd>', '').replace('</dd>', '')
            if (item == 'Mã tài sản:'):
                code = value.strip()
                item_loader.add_value('code', code)
            if (item == 'Vị trí:'):
                address  = value.strip()
                item_loader.add_value('address', address)

            if (item == 'Pháp lý:'):
                juridical = value.strip()
                item_loader.add_value('juridical', juridical)
            if (item == 'Thuộc dự án:'):
                project = response.css('section#quick-summary>dl>dd>a::text').get()
                item_loader.add_value('project', project.strip())
            if (item == 'Liên hệ:'):
                name_contact = value.strip()
                item_loader.add_value('name_contact', name_contact)
            if (item == 'Ngày đăng:'):
                date = value.strip()
                item_loader.add_value('date', date)
            if (item == 'Mobile:'):
                phone_contact = value.split("')")[0].split("this,'")[1].strip()
                item_loader.add_value('phone_contact', phone_contact)
                
        params = response.css('section#property-features>ul>li::text').getall()

        for item in params:
            if (item.find('Diện tích sử dụng:') >= 0):
                area = item.replace('Diện tích sử dụng:', '')
                item_loader.add_value('area', area)
            if (item.find('Hướng xây dựng:') >= 0):
                direct = item.replace('Hướng xây dựng:', '').strip()
                item_loader.add_value('direct', direct)
            if (item.find('Loại địa ốc:') >= 0):
                type = item.replace('Loại địa ốc:', '').strip()
                item_loader.add_value('type', type)
            if (item.find('Đường trước nhà:') >= 0):
                world_highway = item.replace('Đường trước nhà:', '').strip()
                item_loader.add_value('world_highway', world_highway)
            if (item.find('Số phòng khách:') >= 0):
                livingroom = item.replace('Số phòng khách:', '').strip()
                item_loader.add_value('livingroom', livingroom)
            if (item.lower().find('sân vườn') >= 0):
                garden = 1
                item_loader.add_value('garden', garden)
            if (item.lower().find('hồ bơi') >= 0):
                pool = 1
                item_loader.add_value('pool', pool)
            if (item.find('Chiều ngang:') >= 0):
                width = item.replace('Chiều ngang:', '').strip()
                item_loader.add_value('width', width)   
            if (item.find('Chiều dài:') >= 0):
                length = item.replace('Chiều dài:', '').strip()
                item_loader.add_value('length', length)
            if (item.find('Số lầu:') >= 0):
                floor = item.replace('Số lầu:', '').strip()
                item_loader.add_value('floor', floor)
            if (item.lower().find('chổ đậu xe hơi') >= 0):
                parking = 1
                item_loader.add_value('parking', parking)
            if (item.find('Số phòng ngủ:') >= 0):
                bedroom = item.replace('Số phòng ngủ:', '').strip()
                item_loader.add_value('bedroom', bedroom)
            if (item.find('Số phòng vệ sinh:') >= 0):
                toilet = item.replace('Số phòng vệ sinh:', '').strip()
                item_loader.add_value('toilet', toilet)
        email = response.css(
            'section.agent-form div.info>figure>a').xpath('@title').get()
        item_loader.add_value('email', email)     
        images = response.css(
            'section#property-gallery div.owl_dots>div.owl_dot').xpath('@style').getall()
        
        # print(images)
        breadcrumb = response.css('ol.breadcrumb>li>a>span::text').getall()
        province = breadcrumb[3].replace(breadcrumb[2], '').strip()
        item_loader.add_value('province', province) 
        district = breadcrumb[4].strip()
        item_loader.add_value('district', district)
        ward =  breadcrumb[5].strip()
        item_loader.add_value('ward', ward)
        description = response.css('section#description>p::text').getall()
        item_loader.add_value('brief', ' '.join(description))

        if (len(images) == 0):
            link_image = response.css(
                'section#property-gallery img').xpath('@src').getall()
            item_loader.add_value('link_image', link_image)
        else:
            image = []
            for item in images:
                tmp = item.split(';')[0].replace(
                    'background-image: url("', '').replace('")')
                image.append(tmp)
            item_loader.add_value('link_image', image)
             
        item_loader.add_value('url_page', response.request.url)
        
        return item_loader.load_item()