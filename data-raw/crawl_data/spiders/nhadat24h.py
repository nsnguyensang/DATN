import scrapy
from scrapy.selector import Selector
from ..items import CrawlNhadat24h

class BatdongsanSpider(scrapy.Spider):
    i=1
    base_url = "https://nhadat24h.net.vn/danh-muc/can-ho-chung-cu/52?page="
    name = "nhadat24h"
    def start_requests(self):
       
        start_urls=[self.base_url]
        i = 1
        
        for j in range(80):
            url = self.base_url + str(i)
            i=i+1
            start_urls.append(url)

        for url in start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        products = response.css('.item')
        for product in products:
            link_detail = product.css('.ct-title > a::attr(href)').extract_first()
            self.link_page = link_detail
            yield response.follow(link_detail, self.parse_detail)


    def parse_detail(self, response):
        item = CrawlNhadat24h()
        item['title'] = response.css('.row h1::text').extract_first()
        item['description'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:last-child p:last-child::text').extract_first()
        item['code'] = response.css(
            '.content-left > .main-content > #page-news .thong-tin-chi-tiet > .col-md-5 > p:first-child::text').extract_first()
        item['date'] = response.css(
            '.content-left > .main-content > #page-news .thong-tin-chi-tiet > .col-md-4 > p::text').extract_first()
        item['price'] = response.css(
            '.content-left > .main-content > #page-news .thong-tin-chi-tiet > .col-md-3 .gia-ban::text').extract_first()
        item['address'] = response.css(
            '.content-left > .main-content > #page-news .thong-tin-chi-tiet > div:last-child > p::text').extract_first()
        item['specific_address'] = response.css(
            '.content-left > .main-content > #page-news .thong-tin-chi-tiet > div:last-child > p:last-child::text ').extract_first()
        item['type'] = response.css(
            '.content-left > .main-content > #page-news .thong-tin-chi-tiet > .col-md-4 > p:last-child::text').extract_first()
        item['name_project'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(6) > td::text').extract_first()
        item['link_image'] = response.css('.row #slide_main .slide-item > img::attr(src)').extract_first()

        item['width'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(1) > td::text').extract_first()
        item['length'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(1) > td:nth-child(2)::text').extract_first()
        item['juridical'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(1) > td:nth-child(3)::text').extract_first()

        item['ground_area'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(2) > td::text').extract_first()
        item['usable_area'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(2) > td:nth-child(2)::text').extract_first()
        item['direct'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(2) > td:last-child::text ').extract_first()

        item['bedroom'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(3) > td::text').extract_first()
        item['floor'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(3) > td:nth-child(2)::text').extract_first()
        item['livingroom'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(3) > td:last-child::text').extract_first()

        item['kitchen'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(4) > td::text').extract_first()
        item['terrace'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(4) > td:nth-child(2)::text').extract_first()
        item['parking'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(4) > td:last-child::text').extract_first()

        item['bathroom'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(5) > td::text').extract_first()
        item['road_width'] = response.css(
            '.content-left > .main-content > #page-news > table > tbody > tr:nth-child(5) > td:nth-child(2)::text').extract_first()
        item['url_page'] = response.request.url

        yield item