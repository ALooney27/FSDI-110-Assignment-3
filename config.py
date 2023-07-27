import pymongo
import certifi

con_str = "mongodb+srv://Looney27:IronMan27@cluster0.pxezag1.mongodb.net/?retryWrites=true&w=majority"

client = pymongo.MongoClient(con_str, tlsCAFile=certifi.where())
db = client.get_database("organika")