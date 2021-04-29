from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
import json

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
        'apid': request.json['apid']
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
    new_store = {'$set': {'pwd': request.json['pwd'],
                            'LaL': request.json['LaL'],
                            'store': request.json['store'],
                            'address': request.json['address'],
                            'phone': request.json['phone'],
                            'apid': request.json['apid']}}
    try:
        # Succeed to Change Settings
        store.update_one(query, new_store)
        return jsonify({'msg': 'success'})
    except: 
        # Failed to Change Settings
        return jsonify({'msg': 'fail'})

# @app.route('/api/store/addCase', methods=['POST'])
# def store_add_case():

#     db = client.get_database(db_name)
#     case = db.Case
#     new_case = {
        # 'mail': request.json['mail'],
        # 'pwd': request.json['pwd'],
        # 'LaL': request.json['LaL']
    # }
    # try:
    #     # Succeed to Register
    #     case.insert_one(new_case)
    #     return jsonify({'msg': 'success')
    # except:
    #     # Failed to Register
    #     return jsonify({'msg': 'fail'})

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

if __name__ == '__main__':
    app.run(debug=True)