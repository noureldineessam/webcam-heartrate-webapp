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

Read more about this through the following researches:
- [Real Time Heart Rate Monitoring From Facial RGB Color Video Using Webcam](https://ep.liu.se/ecp/129/002/ecp16129002.pdf)
- [Remote plethysmographic imaging using ambient light](https://www.osapublishing.org/oe/fulltext.cfm?uri=oe-16-26-21434&id=175396)
- [Non-contact, automated cardiac pulse measurements using video imaging and blind source separation](https://www.osapublishing.org/oe/fulltext.cfm?uri=oe-18-10-10762&id=199381)

