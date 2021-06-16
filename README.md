# MongoDB CRUD app based upon the FCC [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

App functionality: 
- Save a user to the database (Create)
- Add exercises to the user (Update)
- Get list of exercise logs between specfic dates (Read)
- Delete a user from the database (Delete) --- Not yet implemented ---

On each method a JSON object is returned with the information to the method just performed.

Although based on a FCC project, the app has been extended:
- Can add exercises with a username or databse _id (was previously by _id only)
- Can read from the database using an HTML form 
- Can delete a user

### Built with:

- JavaScript
- NodeJs 16.1.0 / Express 4.17.1
- HTML / CSS
- MongoDB / Mongoose 5.12.12

### To run:

```
$ npm install
```

```
$ npm run start
```

The app is now accessible from localhost:[YOUR_PORT]

You will need to provide your own MongoDB URI in environmental variables (process.env.MONG_URI).
