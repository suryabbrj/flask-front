# flask-front

- credits for DiyaDhajithK, and Aghil Joseph for their active contribution for the creation of this project.

this is a simple front-end application designed in flask as a practical implementation for our Content Moderation API, this flask app serves a simple static html page that takes in an image as input and return a generated caption and the tone of the posted image using sentimetent analysis, and weather this post is allowed on the site or not!
# Working of this project.

- API inference - https://suryabbrj-collegeprojectv2.hf.space/

This app routes user request to the above API hosted on HF, and decides if a particular image should be posted on a platform or not.
This is done by, first  evaluating the user inputted image, by converting it into a textual description using a machine learning model, then comparing that description against a set of pre-defined terms, meaning an image containing that particular object or condition( in this case, i've configured it to block any images that contain, "firearms", "weapons", "blood", "intimacy" etc.) which can be easily reconfigured by modifying a 'guidelines' list inside the flask's main 'app.py' file. 

screenshots of the aptly named "Moderated-gram" the long lost and well obidient brother of Instagram :

![image](https://user-images.githubusercontent.com/68824645/233796070-70f053f6-91e7-49b2-81d3-9476c88d0bd1.png height)

trying to post a photo in our moderated-gram's photo upload field.....

![image](https://user-images.githubusercontent.com/68824645/233796115-1ea5e884-7b41-49e6-b7ce-800a50927374.png)

lets try this photo from pixels.com

<img src="https://user-images.githubusercontent.com/68824645/233796172-81496242-ff86-422a-bdc9-062c3cd710e0.png" height="30%" width="30%">

since this doesn't contain any violating terms. 

the post should be added to the feed!!

![image](https://user-images.githubusercontent.com/68824645/233796310-e29c28ab-face-4f25-98f0-08a898d58f6c.png)
(the generated caption is also displayed below the photo, [highlighted])

trying a different image now

<img src="https://user-images.githubusercontent.com/68824645/233796457-6f37aca0-7924-4b87-86b6-5d0998672865.png height="30%" width="30%">

and as expected the app, blocks the  image from being posted!!

![image](https://user-images.githubusercontent.com/68824645/233796487-5860aa09-4ff8-4ae1-a458-5d43e84a5d84.png)


BOOM!!!!!


