### This is our project for HackIllinois 2020 and the Checkbook.io challenge!

## Background
Checkbook.io is a modern solution to the checking system. It digitalizes checks and creates a platform for individuals and businesses to send and receive checks online, thereby eliminating the need for paper checks. Unlike paper checks that can take multiple days to process, digital checks from checkbook.io may be deposited instantly. Moreover, the company’s platform offers features to streamline the check-writing process, making it easier for large businesses to adopt and utilize technology. Read more about checkbook here: https://checkbook.io/resource/about

## Inspiration
For this year's Hack Illinois challenge, we were prompted to utilize Checkbook’s API to develop innovative features that would help the company expand digitally. Our goal was to develop features that would help the company gain an edge over potential competitors and also increase its accessibility and popularity. 

To begin this task we first looked at all the platforms that supported checkbook.io and noticed that the company only offered a web interface. Realizing the importance of a mobile platform in the modern age, we first set out to develop an app for the company. We utilized the company’s API to integrate a variety of features offered on the web interface, such as the ability to create and update bank accounts mobility, send and receive checks, and verify bank account information. We also adopted additional features such as Augmented Reality. 

## What it does
Full List of Features Implemented in App: 
- Ability to store user information in the backend (Firebase.io) 
- Augmented Reality to View 3D models of Items (ar.js) 
- Fully Functional Android App with iOS compatibility (ReactR and Expo)
- Streamline Models to the Server and Query 3D images - AR functionality (Glitch Server) 
- Ability to onboard a User into a Marketplace (REST API)
- Create and Update Bank Accounts (REST API)
- Get all User Account Info (REST API)
- Send and Receive Checks (REST API)
- Verify Bank Accounts (REST API)

## How I built it
We first used React Native to develop the application on a local browser. We utilized the checkbook.io’s REST API to develop basic functionality for the web application and later added the ability for users to log in by integrating the frontend application with the backend, storing user information on firebase.io. Next, we utilized the ar.js to integrate virtual reality features and pair them with uniquely generated QR codes. We then used ReactR and Expo - an open-source platform for making universal native apps - to support mobile app compatibility for our react based code.

## Challenges I ran into
We ran into multiple challenges while developing our app. Our first challenge was understanding how to use the API. None of us had worked with the API before, so we began experimenting with it, making calls to the API through the provided sandbox. We began implementing simple transactions before setting up market places and experimenting with more complicated features. 

After we became comfortable with using the API we began working on the app. One of the largest challenges that we ran into was developing the AR technology. One major problem that we ran into was that there was no way to render 3D models for augmented reality locally. Thus, we had to set up a Glitch server to dynamically integrate the models into the app. We set up a process to automatically streamline models to the server and later queried the images into our app. 

## Accomplishments that I'm proud of
One of the features that we are most proud of is our augmented reality marketplace. As the world becomes more and more technological, it is important that businesses adapt to it. 

Our goal with the augmented reality feature was to increase the popularity of the app and encourage individuals to make transactions using  checkbook.io’s payment platform. The app enables vendors to create unique QR codes for their products. When individuals scan these QR codes in our app, they are able to view 3D models of vendor’s products. Then, if an individual is interested in buying the product, they can instantly purchase the product. The vendor and buyer’s information is automatically updated in the app, allowing buyers to purchase with checkbook with a click of a button. By marketing their AR platform, the company can attract vendors and buyers alike to sell and buy products through the app. 

## What I learned
This was one of your first projects using AR. It was interesting learning about an entirely new library and despite running into many challenges, we were able to develop great problem-solving skills and work around a variety of challenges that we encountered. It was also really interesting seeing how our teams work all came together to create a final product. 

## What's next for Checkbook.io
There are a variety of changes we can implement in our app in the future. We would definitely like to focus on further developing features in the app as well as improving the UI and supporting higher resolution augmented reality features.


