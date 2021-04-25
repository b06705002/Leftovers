from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("mongodb+srv://SDMproject:SDMGROUP2@cluster0.w0fzh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db_name = 'SDM_project'

@app.route('/api/store/login', methods=['POST'])
def store_login():

    mail = request.json['mail']
    pwd = request.json['pwd']
    msg = {'mail': mail, 'pwd': pwd, 'msg': 'you had login'}
    return jsonify(msg)

@app.route('/api/store/register', methods=['POST'])
def store_register():

    db = client.get_database(db_name)
    store = db.Store
    mail = request.json['mail']
    pwd = request.json['pwd']
    store_ = request.json['store']
    address = request.json['address']
    phone = request.json['phone']
    name = request.json['name']
    new_store = {
        'mail': mail,
        'pwd': pwd,
        'name': name,
        'store': store_,
        'address': address,
        'phone': phone
    }
    try:
        store.insert_one(new_store)
        msg = {'msg': 'success'}
        return jsonify(msg)
    except:
        msg = {'msg': 'fail'}
        return jsonify(msg)
    

if __name__ == '__main__':
    app.run(debug=True)
