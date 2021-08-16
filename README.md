# Webcam Heart Rate Web Application

Start by installing the requirments:
```
pip install requirements.txt 
```

Then in the terminal inside the folder type:
```
python application.py
```

This will run the application on 
```
http://127.0.0.1:5000/
```
If you need to run this app on mobile, especially an Apple device, you need to change to https.
You can do that by changing the last line in application.py to:
```
app.run(debug=True,ssl_context='adhoc')
```
View the Table of Content inside the codes to navigate through
