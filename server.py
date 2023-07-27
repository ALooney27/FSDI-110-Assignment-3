from flask import Flask, request
import json
from config import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # warning: disable CORS check

@app.get('/')
def home():
    return "Hello Python"

@app.get('/test')
def test():
    return "This is a test page"

########### API PRODUCTS ################
################JSON#####################

catalog = []

def fix_id(record):
    record["_id"] = str(record["_id"])
    return record

@app.get('/api/products')
def get_products():
    results = []
    cursor = db.products.find({})
    for prod in cursor:
        results.append(fix_id(prod))

    return json.dumps(results)

@app.post('/api/products')
def save_product():
    product = request.get_json()
    db.products.insert_one(product)

    return json.dumps(fix_id(product))

@app.get('/api/products/count')
def get_products_count():
    cursor = db.products.find({})
    count = 0
    for prod in cursor:
        count += 1

    return json.dumps(count)

@app.get("/api/products/category/<category>")
def get_products_by_category(category):
    cursor = db.products.find({})
    results = []
    for prod in cursor:
        if prod["category"] == category:
            results.append(fix_id(prod))
    return json.dumps(results)


@app.get('/api/categories')
def get_categories():
    cursor = db.products.find({})
    results = []
    for prod in cursor:
        category = prod["category"]
        if category not in results:
            results.append(category)

    results.sort()
    return json.dumps(results)

####################################
########### API Coupons ############
############## JSON ################
####################################

# get all coupons

@app.get('/api/coupons')
def get_coupons():
    results = []
    cursor = db.coupons.find({})
    for coupon in cursor:
        results.append(fix_id(coupon))

    return json.dumps(results)

# save a coupon

@app.post('/api/coupons')
def save_coupon():
    coupon = request.get_json()
    db.coupons.insert_one(coupon)

    return json.dumps(fix_id(coupon))

# start the server manually
app.run(debug=True)