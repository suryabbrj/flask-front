from flask import Flask, render_template, request, jsonify
from gradio_client import Client
import datetime

app = Flask(__name__)



client = Client("https://suryabbrj-collegeprojectv2.hf.space/")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/process-image', methods=['POST'])
def after():
    url = request.form['pphoto']
    result = client.predict(url, api_name="/predict")
    now = datetime.datetime.now()

    # Format the date and time as a string
    date_string = now.strftime("%Y-%m-%d %H:%M:%S")

    # Open the file and write the date and time to it
    
    with open("log.txt", "a") as f:
        f.write("\n" + date_string +" : \t" + result + "\n")
    print('\n\n\n',result,'\n\n\n')
    
    guidelines = ["phone", "knife", "gun", "violance", "hurting"]
    post_ok = False
    caption_ok = False

    for guidelines in guidelines:
        if guidelines in result:
            print("\n\n this cannot be posted on the side as this contains a violating content:", guidelines, '\n\n\n')
            caption_ok = True
            break
    else:
        print("can be permitted as this doesnt contain any violating terms", '\n\n\n')
        post_ok = True
    
    return render_template('index.html', result=result, caption_ok = caption_ok, post_ok = post_ok, url=url)

if __name__ == "__main__":
    app.run(debug=True)
