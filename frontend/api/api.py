from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
import json

app = Flask(__name__)
client = MongoClient("mongodb+srv://SDMproject:SDMGROUP2@cluster0.w0fzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db_name = 'SDM_project'

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
                            'name': post['name'],
                            'store': post['store'],
                            'address': post['address'],
                            'phone': post['phone']})
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
        'name': request.json['name'],
        'store': request.json['store'],
        'address': request.json['address'],
        'phone': request.json['phone']
    }
    try:
        # Succeed to Register
        print('before insert')
        store.insert_one(new_store)
        print('afteer insert')
        return jsonify({'msg': 'success',
                        'mail': request.json['mail'],
                        'pwd': request.json['pwd'],
                        'name': request.json['name'],
                        'store': request.json['store'],
                        'address': request.json['address'],
                        'phone': request.json['phone']})
    except:
        # Failed to Register
        return jsonify({'msg': 'fail'})

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
                            'store': post['store'],
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
        'store': request.json['store'],
        'phone': request.json['phone']
    }
    try:
        # Succeed to Register
        user.insert_one(new_user)
        return jsonify({'msg': 'success',
                        'mail': request.json['mail'],
                        'pwd': request.json['pwd'],
                        'name': request.json['name'],
                        'store': request.json['store'],
                        'phone': request.json['phone']})
    except:
        # Failed to Register
        return jsonify({'msg': 'fail'})

if __name__ == '__main__':
    app.run(debug=True)