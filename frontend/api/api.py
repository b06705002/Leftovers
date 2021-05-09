from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
import json
import datetime
from bson import ObjectId

app = Flask(__name__)
client = MongoClient('mongodb+srv://SDMproject:SDMGROUP2@cluster0.w0fzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db_name = 'SDM_project'

# store
@app.route('/api/store/login', methods=['POST'])
def store_login():

    db = client.get_database(db_name)
    store = db.Store
    post = store.find_one({'mail': request.json['mail']})
    if post:
        if post['pwd'] == request.json['pwd']:
            # Succeed to Login
            return jsonify({'msg': 'success',
                            'mail': post['mail'],
                            'pwd': post['pwd'],
                            'LaL': post['LaL'],
                            'store': post['store'],
                            'address': post['address'],
                            'phone': post['phone'],
                            'apid': post['apid']})
    # Failed to Login
    return jsonify({'msg': 'fail'})

@app.route('/api/store/register', methods=['POST'])
def store_register():

    db = client.get_database(db_name)
    store = db.Store
    # Duplicate Register
    if store.find_one({'mail': request.json['mail']}):
        return jsonify({'msg': 'duplicated'})
    new_store = {
        'mail': request.json['mail'],
        'pwd': request.json['pwd'],
        'LaL': request.json['LaL'],
        'store': request.json['store'],
        'address': request.json['address'],
        'phone': request.json['phone'],
        'apid': request.json['apid'],
        'comment': []
    }
    try:
        # Succeed to Register
        store.insert_one(new_store)
        return jsonify({'msg': 'success',
                        'mail': request.json['mail'],
                        'pwd': request.json['pwd'],
                        'LaL': request.json['LaL'],
                        'store': request.json['store'],
                        'address': request.json['address'],
                        'phone': request.json['phone'],
                        'apid': request.json['apid']})
    except:
        # Failed to Register
        return jsonify({'msg': 'fail'})

@app.route('/api/store/settings', methods=['POST'])
def store_settings():

    db = client.get_database(db_name)
    store = db.Store
    query = {'mail': request.json['mail']}
    new_store = {'$set': {'pwd': request.json['pwd'], 'phone': request.json['phone']}}
    try:
        # Succeed to Change Settings
        store.update_one(query, new_store)
        return jsonify({'msg': 'success'})
    except: 
        # Failed to Change Settings
        return jsonify({'msg': 'fail'})

@app.route('/api/store/addGoods', methods=['POST'])
def store_add_goods():

    db = client.get_database(db_name)
    goods = db.Goods
    new_goods = {
        'store': request.json['store'],
        'item': request.json['item'],
        'amount': request.json['amount'],
        'price': request.json['price'],
        'LaL': request.json['LaL'],
        'due': request.json['due'],
        'apid': request.json['apid']
    }
    try:
        # Succeed to Add Goods
        goods.insert_one(new_goods)
        return jsonify({'msg': 'success'})
    except:
        # Failed to Add Goods
        return jsonify({'msg': 'fail'})

# user
@app.route('/api/user/login', methods=['POST'])
def user_login():

    db = client.get_database(db_name)
    user = db.User
    post = user.find_one({'mail': request.json['mail']})
    if post:
        if post['pwd'] == request.json['pwd']:
            # Succeed to Login
            return jsonify({'msg': 'success',
                            'mail': post['mail'],
                            'pwd': post['pwd'],
                            'name': post['name'],
                            'phone': post['phone']})
    # Failed to Login
    return jsonify({'msg': 'fail'})

@app.route('/api/user/register', methods=['POST'])
def user_register():

    db = client.get_database(db_name)
    user = db.User
    # Duplicate Register
    if user.find_one({'mail': request.json['mail']}):
        return jsonify({'msg': 'duplicated'})
    new_user = {
        'mail': request.json['mail'],
        'pwd': request.json['pwd'],
        'name': request.json['name'],
        'phone': request.json['phone']
    }
    try:
        # Succeed to Register
        user.insert_one(new_user)
        return jsonify({'msg': 'success',
                        'mail': request.json['mail'],
                        'pwd': request.json['pwd'],
                        'name': request.json['name'],
                        'phone': request.json['phone']})
    except:
        # Failed to Register
        return jsonify({'msg': 'fail'})

@app.route('/api/user/settings', methods=['POST'])
def user_settings():

    db = client.get_database(db_name)
    user = db.User
    query = {'mail': request.json['mail']}
    new_user = {'$set': {'pwd': request.json['pwd'],
                            'name': request.json['name'],
                            'address': request.json['address'],
                            'phone': request.json['phone'],
                            'apid': request.json['apid']}}
    try:
        # Succeed to Change Settings
        user.update_one(query, new_user)
        return jsonify({'msg': 'success'})
    except: 
        # Failed to Change Settings
        return jsonify({'msg': 'fail'})

@app.route('/api/user/showGoods', methods=['POST'])
def user_show_goods():

    db = client.get_database(db_name)
    goods = db.Goods
    time_range = datetime.timedelta(hours = 8)
    try:
        # Succeed to Show Goods
        all_list = list()
        for document in goods.find():
            all_list.append({'id': str(document.get('_id')),
                            'time': (document.get('_id').generation_time + time_range).strftime("%m/%d/%Y%H:%M:%S"),
                            'store': document['store'],
                            'item': document['item'],
                            'amount': document['amount'],
                            'price': document['price'],
                            'LaL': document['LaL'],
                            'due': document['due'],
                            'apid': document['apid']})
        return jsonify({'msg': 'success', 'data': all_list})
    except:
        # Failed to Show Goods
        return jsonify({'msg': 'fail'})

@app.route('/api/user/checkStore', methods=['POST'])
def user_check_store():

    db = client.get_database(db_name)
    store = db.Store
    post = store.find_one({'apid': request.json['apid']})
    if post:
        # Succeed to Check Store
        return jsonify({'msg': 'success',
                        'comment': post['comment']})
    # Failed to Check Store
    return jsonify({'msg': 'fail'})

@app.route('/api/user/order', methods=['POST'])
def store_order():

    db = client.get_database(db_name)
    goods = db.Goods
    post = goods.find_one({'_id': ObjectId(request.json['gid'])})
    if post:
        if int(request.json['amount']) <= post['amount']:
            try:
                db.Case.insert_one({'mail': request.json['mail'],
                                    'item': post['item'],
                                    'amount': int(request.json['amount']),
                                    'price': post['price'],
                                    'apid': request.json['apid']})
                if int(request.json['amount']) == post['amount']:
                    try:
                        goods.delete_one({'_id': ObjectId(request.json['gid'])})
                    except:
                        # Failed to Order
                        return jsonify({'msg': 'fail first'})
                else:
                    try:
                        query = {'_id': ObjectId(request.json['gid'])}
                        new_goods = {'$set': {'amount': post['amount'] - int(request.json['amount'])}}
                        goods.update_one(query, new_goods)
                    except:
                        # Failed to Order
                        return jsonify({'msg': 'fail second'})
            except:
                # Failed to Order
                return jsonify({'msg': 'fail third'})
            return jsonify({'msg': 'success'})
        else:
            # Goods Shortage
            return jsonify({'msg': 'shortage fourth'})
    # Failed to Order
    return jsonify({'msg': 'fail fifth'})

if __name__ == '__main__':
    app.run(debug=True)