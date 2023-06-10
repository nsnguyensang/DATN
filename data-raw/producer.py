from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("KafkaReader") \
    .master("local") \
    .getOrCreate()

df = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "test") \
    .load()

df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)") \
    .writeStream \
    .outputMode("append") \
    .format("console") \
    .start() \
    .awaitTermination()

print(df)