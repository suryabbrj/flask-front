from flask import Flask, render_template, request


from gradio_client import Client


app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/after', methods=['GET', 'POST'])
def after():
    file = request.files['file1']
    file.save('static/file.jpg')

    client = Client("https://suryabbrj-collegeprojectv2.hf.space/")

    caption = client.predict('static/file.jpg', api_name="/predict")
    print(caption[16:-1])
    result = caption[16:-1]
    return render_template('predict.html', result=result)


if __name__ == "__main__":
    app.run(debug=True)
