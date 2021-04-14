from flask import Flask, request, render_template, jsonify

app = Flask(__name__)


@app.route('/api', methods=['POST'])
def index():

    mail = request.json['mail']
    pwd = request.json['pwd']
    msg = {'mail': mail, 'pwd': pwd, 'msg': 'you had login'}
    return jsonify(msg)


if __name__ == '__main__':
    app.run(debug=True)
