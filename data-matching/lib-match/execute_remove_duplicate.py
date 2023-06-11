from remove_duplicate import remove_duplicate
from joblib import load
import pandas as pd

remover: remove_duplicate = load("RemoveDuplicate.lib")


path_data = '/home/darkknight/real-estate-integration/prj-exam/schema-matching/output/final.csv'
df = pd.read_csv(path_data, encoding='utf-8', low_memory=False)
df = df.drop(["Unnamed: 0"], axis=1)
# Optional
# df["date"].fillna('01/01/2021', inplace=True)
# df = df.fillna('None')

if len(df) > 0:
    print("Original size", len(df))
    # drop_ids = df["_id"].to_list()
    df = remover.remove_duplicate(df)
    print("After remove duplicates size", len(df))
    # df.drop("_id", inplace=True, axis=1)
    print("Save final data")
    df.to_csv(
        '/home/darkknight/real-estate-integration/prj-exam/data-matching/final_data.csv', index=False)
