from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    return {
        'name': "Hi"
    }

if __name__ == '__main__':
    app.run(debug=True)

# print(1+1)