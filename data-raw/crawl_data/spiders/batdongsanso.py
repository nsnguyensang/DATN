import scrapy
from scrapy.selector import Selector
from ..items import CrawlBatdongsansoItem

class BatdongsanSpider(scrapy.Spider):
    i=1
    name = "bdsso"
    base_url="https://batdongsan.so/nha-dat-cho-thue/can-ho-chung-cu?page="

    def start_requests(self):
        start_urls=[
            "https://batdongsan.so/nha-dat-cho-thue/can-ho-chung-cu?page=1#/"
        ]
        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('article')
        for product in products:
            link_detail = product.css('a::attr(href)').extract_first()
            yield response.follow(link_detail, self.parse_detail)

        if self.i < 1000:
            self.i += 1
            path_next = self.base_url + str(self.i)+"#/"
            yield response.follow(path_next, callback=self.parse)

    def parse_detail (self, response):
        item = CrawlBatdongsansoItem()
        item['title'] = response.css('.re > .re-title::text').extract_first()
        item['price'] = response.css('.re > .re-tab > .re-district-price > .re-price > strong::text').extract_first() \
                        + response.css('.re > .re-tab > .re-district-price > .re-price::text').extract()[1]
        item['type'] = response.css('.re > .re-tab > .re-district-price > .re-district > a::text').extract_first()
        item['property'] = response.css('.re > .re-block > .re-property > li::text').extract()
        item['address'] = response.css('.re > .re-block > .re-address::text').extract()[1]
        item['province'] = response.css('.re > .re-tab > .re-district-price > .re-district > a::text').extract()[1]
        item['district'] = response.css('.re > .re-tab > .re-district-price > .re-district > a::text').extract()[2]
        item['content'] = response.css('.re > .re-block > .re-content > p *::text').extract()
        item['date'] = response.css('.re > .re-block > .row:last-child ul > li > .sp3::text').extract_first()
        item['code'] = response.css('.re > .re-block > .row:last-child ul > li:last-child > .sp3::text').extract_first()
        item['link_image'] = response.css('.re > .re-tab > .tab-content > #re-gallery > .re-gallery > .re-images .item > a > img::attr(src)').extract_first()
        item['name_contact'] = response.css('.re > .re-block > .re-contact-info > .info > a::text').extract_first()
        item['phone_contact'] = response.css('.re > .re-block > .re-contact-info > .info > div > home-post-phone::attr(phone)').extract_first()
        item['url_page'] = response.request.url

        yield item


