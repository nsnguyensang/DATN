from detector import *
from sklearn.feature_extraction.text import TfidfVectorizer
import re
import pymongo
import pandas as pd
from joblib import dump

class SchemaMatching:
    def __init__(self, min_thres = 0.3):
        self.features_extractor = None
        self.field_matchers = {"property_title" : None,
                               "property_detail" : None,
                               "property_price" : None,
                               "property_area" : None,

                               "property_ward" : None,
                               "property_province": None,

                               "property_type" : None,
                               "property_date" : None,
                               "property_link" : None,
                               "property_images" : None}
        self.min_thres = min_thres

    def get_train_data(self):
        PATH_BAT_DONG_SAN_123 = "C:/Workspace/DATN/data-standard/data_17_7/batdongsan123.csv"
        batdongsan123 = pd.read_csv(PATH_BAT_DONG_SAN_123, encoding = 'utf-8')
        return batdongsan123

    def preprocess(self, text):
        text = re.sub("\d+[\.-]\d+[\.-]\d+", " dien_thoai ", text)
        text = re.sub("[mM]\s*2", " met_vuong ", text)
        text = re.sub("\d+([\.,]\d+)?", " gia_tri_so ", text)
        return text

    def train(self):
        self.features_extractor = TfidfVectorizer(lowercase=True, preprocessor=self.preprocess, ngram_range=(1, 1), max_df=1.0,
                                             min_df=5)
        df = self.get_train_data()
        X_texts = df["title"].to_list() + df["description"].to_list() +\
                  df["price"].to_list() + df["acreage"].to_list() + \
                  df["ward"].to_list()+ df["province"].to_list() + df["type"].to_list()

        X_texts = np.array(X_texts)
        X_texts = np.reshape(X_texts, (-1))
        self.features_extractor.fit(X_texts)

        X_features = self.features_extractor.transform(X_texts)
        num_entries = len(df)

        num_cate = 7

        y_category = np.zeros(num_cate*num_entries)
        for i in range(num_cate):
            y_category[num_entries * i:num_entries * (i + 1)] = i

        self.field_matchers["property_title"] = property_title_classifier(feature_extractor=self.features_extractor)
        self.field_matchers["property_detail"] = property_detail_classifier(feature_extractor=self.features_extractor)
        self.field_matchers["property_price"] = property_price_classifier(feature_extractor=self.features_extractor)
        self.field_matchers["property_area"] = property_area_classifer(feature_extractor=self.features_extractor)

        self.field_matchers["property_ward"] = property_ward_classifer(feature_extractor=self.features_extractor)
        self.field_matchers["property_province"] = property_province_classifer(feature_extractor=self.features_extractor)

        self.field_matchers["property_type"] = property_type_classifer(feature_extractor=self.features_extractor)
        self.field_matchers["property_date"] = property_date_detector()
        self.field_matchers["property_link"] = property_link_detector()
        self.field_matchers["property_images"] = property_images_detector()

        for key in self.field_matchers:
            self.field_matchers[key].train(X_texts, X_features, y_category)

    def matching(self, df):
        result = {}
        if len(df) == 0:
            for key in self.field_matchers:
                result[key] = ""
            return result
        for key in self.field_matchers:
            best_score = 0
            best_match = None
            for col in df.columns:
                if col != "_id":
                    score = self.field_matchers[key].evaluated(df[col])
                    if score > best_score:
                        best_score = score
                        best_match = col
            if best_score >= self.min_thres:
                print("Matching ", best_match, " with ", key, " , similarity score ", best_score)
                result[key] = best_match
            else:
                result[key] = ""
        return result


    def save(self):
        dump(self, "SchemaMatching.lib")








