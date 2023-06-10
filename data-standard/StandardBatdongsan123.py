import pandas as pd
import re

class StandardCommon:
    def __init__(self, data):
        self.data = data

    # loại bỏ trùng lặp
    def dropDuplicate(self, subset):
        self.data = self.data.drop_duplicates(subset=subset)

    #tách trường address thành các trường ward, province, street, district
    def sliceAddress(self, fieldAddress):
        lsStreet = []
        lsWard = []
        lsDistrict = []
        lsProvince = []

        for item in self.data[fieldAddress]:
            street = self.sliceStringByString(item, "Đường") or self.sliceStringByString(item, "Phố")
            lsStreet.append(street)

            province = self.sliceStringByString(item, "Tỉnh") or self.sliceStringByString(item, "Thành phố")
            if not province :
                idxStartProvince = item.rfind(',') + 1
                province =item[idxStartProvince:]
            lsProvince.append(province)

            ward = self.sliceStringByString(item, "Phường") or self.sliceStringByString(item, "Xã")
            lsWard.append(ward)

            district = self.sliceStringByString(item, "Quận") or self.sliceStringByString(item, "Huyện")
            lsDistrict.append(district)

        self.data["ward"] = lsWard
        self.data["district"] = lsDistrict
        self.data["province"] = lsProvince
        self.data["street"] = lsStreet
        self.data = self.data.drop(columns=[fieldAddress])


    # tách string bằng string
    def sliceStringByString(self, s, sub):
        startIndex = s.find(sub)
        if startIndex != -1:
            startIndex = startIndex + len(sub)
            endIndex = s[startIndex:].find(',')
            if endIndex != -1:
                return s[startIndex:][:endIndex].strip()
            else:
                return s[startIndex:].strip()
        return None

    #bỏ đơn vị đo lường : m
    def removeUnitMeasure(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                item = str(item)
                item = re.findall(r"(?:\d*\.\d+|\d+)", item)
                if len(item):
                    item = item[0]
                else:
                    item = "0"
                ls.append(item)
            self.data[field] = ls

    # Chuẩn hóa đơn vị cho price theo đồng
    def standardPrice(self, fieldPrice, fieldSquare):
        ls = []
        for price, square in zip(self.data[fieldPrice], self.data[fieldSquare]):
            price = str(price)
            price = price.lower()
            price = re.sub(",", ".", price)
            valPrice = re.findall(r"(?:\d*\.\d+|\d+)", price)

            square = str(square)
            square = re.findall(r"(?:\d*\.\d+|\d+)", square)
            if (len(square)):
                square = square[0]

            if (len(valPrice)):
                valPrice = float(valPrice[0])
                if "/m" in price:
                    valPrice = int(valPrice * float(square))
                if "/tháng" in price:
                    valPrice = ""
                else:
                    if "tỷ" in price:
                        valPrice = int(valPrice * 1000000000)
                    if "triệu" in price:
                        valPrice = int(valPrice * 1000000)
                    if "ngàn" in price:
                        valPrice = int(valPrice * 1000)
            else:
                valPrice = ""
            ls.append(str(valPrice))
        self.data[fieldPrice] = ls

    # Chuẩn hóa date về dạng dd/mm/yyyy
    def standardDate(self, fieldDate):
        ls = []
        for item in self.data[fieldDate]:
            date = re.sub('-','/',item)
            date = re.search(r'\d{2}/\d{2}/\d{4}', date)
            if (date):
                date = date.group(0)
            else:
                if "Hôm nay" in item:
                    date = "21/06/2022"
                if "Hôm qua" in item:
                    date = "20/06/2022"
            ls.append(date)
        self.data[fieldDate] = ls

    #Chuẩn hóa giá tị None, field nào toàn None thì sẽ bị loại bỏ
    def standardNone(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                item = str(item)
                item = item.strip()
                if item =="_" or item == "---":
                    item = None
                ls.append(item)
            if len(ls):
                self.data[field] = ls
            else :
                self.data = self.data.drop(columns=field)

    def standardType(self, fieldType):
        N = len(self.data[fieldType])
        type = ["Cần bán căn hộ chung cư"] *N
        self.data[fieldType] = type

    def standardIcon(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                if item == "/publish/img/check.gif":
                    ls.append("Có")
                else:
                    ls.append("Không")
            self.data[field] = ls

    def strip(self, fields):
        for field in fields:
            ls = []
            for item in self.data[field]:
                if item:
                    item = str(item)
                    item = item.strip()
                    item = re.sub("\n", "", item)
                ls.append(item)
            self.data[field] = ls

    def standardUnit(self, field, unit):
        ls = []
        for item in self.data[field]:
            if(item):
                item = item.strip()
                item = item + unit
            ls.append(item)
        self.data[field] = ls

    def processValueNull(self, fields, values):
        for field, value in zip(fields, values):
            ls = []
            for item in self.data[field]:
                if pd.isna(item) or pd.isnull(item):
                    item = value
                elif len(item.strip()) == 0:
                    item = value
                ls.append(item)
            self.data[field] = ls

class StandardBatdongsan123(StandardCommon):
    def __init__(self, data):
        self.data = data

    def addField(self, fields, values):
        N = len(self.data)
        for field, value in zip(fields, values):
            ls = []
            for i in range(N):
                ls.append(value)
            self.data[field] = ls

PATH_BDS123 = "../data-raw/data_batdongsan123.csv"
batdongsan123 = pd.read_csv(PATH_BDS123, encoding = 'utf-8')

bds123 = StandardBatdongsan123(batdongsan123)
bds123.sliceAddress("address")
bds123.standardDate("date")
bds123.standardPrice("price", "acreage")
bds123.addField(["type", "floor", "terrace", "parking", "kitchen", "juridical"], ["Cần bán căn hộ chung cư", "1 t","không", "có", "có","Sổ hồng/ Sổ đỏ" ])
bds123.strip(["title"])
bds123.processValueNull(["direction", "province", "street", "ward", "district", "price", "bedroom", "bathroom" ], ["None", "None", "None", "None", "None", "0", "0 pn", "0 wc"])
bds123.dropDuplicate(["province", "ward", "street", "district", "acreage", "price", "bedroom", "project", "bathroom"])
bds123.data.to_csv("batdongsan123", encoding = 'utf-8')