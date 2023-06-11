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
        # lsWard = []
        # lsDistrict = []
        # lsProvince = []

        for item in self.data[fieldAddress]:
            street = self.sliceStringByString(item, "Đường") or self.sliceStringByString(item, "Phố")
            lsStreet.append(street)

            # province = self.sliceStringByString(item, "Tỉnh") or self.sliceStringByString(item, "Thành phố")
            # if not province :
            #     idxStartProvince = item.rfind(',') + 1
            #     province =item[idxStartProvince:]
            # lsProvince.append(province)

            # ward = self.sliceStringByString(item, "Phường") or self.sliceStringByString(item, "Xã")
            # lsWard.append(ward)

            # district = self.sliceStringByString(item, "Quận") or self.sliceStringByString(item, "Huyện")
            # lsDistrict.append(district)

        # self.data["ward"] = lsWard
        # self.data["district"] = lsDistrict
        # self.data["province"] = lsProvince
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
                    date = "10/06/2022"
                if "Hôm qua" in item:
                    date = "10/06/2022"
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

class StandardAlomuabannhadat(StandardCommon):
    def __init__(self, data):
        self.data = data
        self.baseURL = "https://alomuabannhadat.vn/"

    def standardLinkImage(self, field):
        ls = []
        for item in self.data[field]:
            item = self.baseURL + str(item)
            ls.append(item)
        self.data[field] = ls

    def process (self):
        for item in self.data["price"]:
            print(type(item))


PATH_ALOMBND = "../data-raw/data_batdongsan123.csv"
alomuabannhadat = pd.read_csv(PATH_ALOMBND, encoding = 'utf-8')

alomuabannhadat['floor'] = alomuabannhadat['floor'].astype(object)
alomuabannhadat['bedroom'] = alomuabannhadat['bedroom'].astype(object)
alomuabannhadat['width'] = alomuabannhadat['width'].astype(object)
alomuabannhadat['toilet'] = alomuabannhadat['toilet'].astype(object)
alomuabannhadat['length'] = alomuabannhadat['length'].astype(object)
alomuabannhadat['pool'] = alomuabannhadat['pool'].astype(object)
alomuabannhadat['garden'] = alomuabannhadat['garden'].astype(object)
alomuabannhadat['floor'] = alomuabannhadat['floor'].astype(str).str.rstrip('.0')
alomuabannhadat['bedroom'] = alomuabannhadat['bedroom'].astype(str).str.rstrip('.0')
alomuabannhadat['width'] = alomuabannhadat['width'].astype(str).str.rstrip('.0')
alomuabannhadat['toilet'] = alomuabannhadat['toilet'].astype(str).str.rstrip('.0')
alomuabannhadat['length'] = alomuabannhadat['length'].astype(str).str.rstrip('.0')
alomuabannhadat['pool'] = alomuabannhadat['pool'].astype(str).str.rstrip('.0')
alomuabannhadat['garden'] = alomuabannhadat['garden'].astype(str).str.rstrip('.0')
alomuabannhadat['area'] = alomuabannhadat['area'].replace(r'm2$', 'm', regex=True)


alo_bds = StandardAlomuabannhadat(alomuabannhadat)
alo_bds.sliceAddress("address")
alo_bds.standardDate("date")
# alo_bds.removeUnitMeasure(["area", "length", "width", "world_highway"])
alo_bds.standardPrice("price", "area")
alo_bds.standardNone(["livingroom", "direct", "floor", "parking", "width", "juridical", "length", "world_highway", "bedroom", "toilet", "garden", "pool"])
alo_bds.standardType("type")
alo_bds.standardLinkImage("link_image")
alo_bds.standardUnit("bedroom", " pn")
alo_bds.standardUnit("toilet", " wc")
alo_bds.standardUnit("floor", " t")
alo_bds.processValueNull(["direct","bedroom", "toilet", "price", "floor", "juridical", "length","width", "world_highway", "ward", "province", "district", "street", "project", "garden", "pool"],["None","0 pn", "0 wc", "0", "0 t", "Sổ hồng", "0m", "0m", "0m","None", "None", "None", "None", "None", "0", "0"])
alo_bds.dropDuplicate(['province', 'district', 'ward', 'street', 'type', 'direct', 'price', 'length', 'width', 'area', 'bedroom', "toilet", 'floor', 'world_highway', "project"])
alo_bds.process()
alo_bds.data.to_csv("alomuabannhadat_cleaned.csv", encoding = 'utf-8')