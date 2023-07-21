from schema_matching import SchemaMatching
from joblib import load
import pymongo
import pandas as pd

matcher : SchemaMatching = load("C:/Workspace/DATN/SchemaMatching.lib")



PATH_BDSS = "C:/Workspace/DATN/data-standard/data_17_7/batdongsanso.csv"
bdss = pd.read_csv(PATH_BDSS, encoding = 'utf-8')
df1 = bdss
# df1["address"]  = nha24["district"] + nha24["province"] + nha24["street"] + nha24["ward"]

PATH_ALO = "C:/Workspace/DATN/data-standard/data_17_7/alomuabannhadat.csv"
alo = pd.read_csv(PATH_ALO, encoding = 'utf-8') 
df2 = alo 
# df2["address"]  = alo["district"] + alo["province"] + alo["street"] + alo["ward"]


PATH_I = "C:/Workspace/DATN/data-standard/data_17_7/ibatdongsan.csv"
ibat = pd.read_csv(PATH_I, encoding = 'utf-8')
df3 = ibat 
# df3["address"]  = ibat["district"] + ibat["province"] + ibat["street"] + ibat["ward"]



result1 = matcher.matching(df1)
print("----------------------------------")
print(result1)
print("----------------------------------")

result2 = matcher.matching(df2)
print("----------------------------------")
print(result2)
print("----------------------------------")

result3 = matcher.matching(df3)
print("----------------------------------")
print(result3)
print("----------------------------------")
