import pandas as pd
import re

PATH_BDSS = "../data-raw/data_batdongsanso.csv"
batdongsanso = pd.read_csv(PATH_BDSS, encoding = 'utf-8')

batdongsanso['name_contact'] = batdongsanso['name_contact'].str.replace('\n', '')
batdongsanso['address'] = batdongsanso['address'].str.replace('\n', '')
for index, value in batdongsanso['property'].iteritems():
    value = value.strip().replace(",", "")  # Xóa khoảng trắng và dấu phẩy
    value = value.replace("\n","")
    value = value.replace("            ",",")
    # Tìm kiếm và trích xuất diện tích
    dientich_pattern = r"Diện tích:\s?(\d+)m"
    dientich_match = re.search(dientich_pattern, value)
    if dientich_match:
        batdongsanso.loc[index, 'area'] = dientich_match.group(1) + 'm'
    # Tìm kiếm và trích xuất lô giới
    logioi_pattern = r"Lộ giới:\s?(\d+)"
    logioi_match = re.search(logioi_pattern, value)
    if logioi_match:
       batdongsanso.loc[index, 'gender'] = logioi_match.group(1)
    # Tìm kiếm và trích xuất mặt tiền
    mattien_pattern = r"Mặt tiền:\s?(\d+)"
    mattien_match = re.search(mattien_pattern, value)
    if mattien_match:
        batdongsanso.loc[index, 'width'] = mattien_match.group(1)

    # Tìm kiếm và trích xuất số tầng
    sotang_pattern = r"Số tầng:\s?(\d+)"
    sotang_match = re.search(sotang_pattern, value)
    if sotang_match:
        batdongsanso.loc[index, 'floor'] = sotang_match.group(1)

    # Tìm kiếm và trích xuất số phòng ngủ
    sophongngu_pattern = r"Số phòng ngủ:\s?(\d+)"
    sophongngu_match = re.search(sophongngu_pattern, value)
    if sophongngu_match:
        batdongsanso.loc[index, 'bedroom'] = sophongngu_match.group(1)
    # Tìm kiếm và trích xuất số toilet
    sotoilet_pattern = r"Số toilet:\s?(\d+)"
    sotoilet_match = re.search(sotoilet_pattern, value)
    if sotoilet_match:
        batdongsanso.loc[index, 'toilet'] = sotoilet_match.group(1)
    # Tìm kiếm và trích xuất lộ giới
    # Tìm kiếm và trích xuất hướng
    huong_pattern = r"Hướng:\s?([\w\s]+)"
    huong_match = re.search(huong_pattern, value)
    if huong_match:
        batdongsanso.loc[index, 'direct'] = huong_match.group(1)
    # Tìm kiếm và trích xuất lộ giới
    
    # Tìm kiếm và trích xuất trường thời gian đăng
    ngaytruoc_pattern = r"(\d+ ngày trước)"
    tuantruoc_pattern = r"(\d+ tuần trước)"
    thangtruoc_pattern = r"(\d+ tháng trước)"
    namtruoc_pattern = r"(\d+ năm trước)"
    ngaytruoc_match = re.search(ngaytruoc_pattern, value) 
    tuantruoc_match = re.search(tuantruoc_pattern, value) 
    thangtruoc_match = re.search(thangtruoc_pattern, value) 
    namtruoc_match = re.search(namtruoc_pattern, value) 
    if ngaytruoc_match:
        batdongsanso.loc[index, 'time_create'] =  ngaytruoc_match.group(1)
    if tuantruoc_match:
        batdongsanso.loc[index, 'time_create'] =  tuantruoc_match.group(1)
    if thangtruoc_match:
        batdongsanso.loc[index, 'time_create'] =  thangtruoc_match.group(1)
    if namtruoc_match:
        batdongsanso.loc[index, 'time_create'] =  namtruoc_match.group(1)
        
batdongsanso = batdongsanso.drop('property', axis=1)  

batdongsanso.to_csv('batdongsanso_raw.csv', encoding='utf-8', index=False)