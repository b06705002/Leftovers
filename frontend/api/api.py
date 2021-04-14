from flask import Flask, request, render_template, json

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def index():
    # print(json.load(request.data))
    request_data = json.loads(request.data)
    todo = request_data['content']
    print(todo)
    return {'Hi': todo}

if __name__ == '__main__':
    app.run(debug=True)

# print(1+1)