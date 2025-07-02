# AniGate BE

## Dependencies
1. Express
2. Mongoose
3. Cors
4. CookieParser
5. dotenv
6. jsonwebtoken
7. bcrypt

## server.ts
### Import Dependencies
- Express for building RESTFUL APIs and handling HTTP requests
- Mongoose for managing database connections and provides a way to model our data
- DotEnv for loading environmental variables from a .env file in our root into process.env to use in other files while maintaining senstivity.
- Cors as middleware to enable secure interactions between the frontend and the backend.
- Cookie-Parser for authentication and session handling

### Import Routes and Middleware
- Empty for now

### Load Environment Variables From .env
- dotenv.config(); : Allows us to load our environmental variables from the .env file and use the "process.env.INSERT_VARIABLE_HERE" 

### Type Delclarations For Environment Variables
- const CLIENT_URL = process.env.CLIENT_URL as string; : Contains the url from our React frontend so we can connect it to the backend using Cors

- const MONGO_URI = process.env.MONGO_URI as string; : Contains the connection string required to connect to MongoDB Compass or MongoDB Atlas

- const PORT = Number(process.env.PORT) || 5000; : A port to run the server on, defaulting to 5000 if not specified.

### Create the Express Application
const app = express(); : Taken from the express package to create an instance of an express application or app

### Connect to Frontend Client URL
app.use(cors({origin: CLIENT_URL, credentials: true})); : 
- app.use is a built-in function from express that allows us to use middleware to the application. 
- In this case app.use(cors(...)) enables us to use the Cors middleare to handle request from different origins, which is the frotned and backend. 
- origin: CLIENT_URL is an option from Cors that restricts requests to only those coming from URL specifed in the CLIENT_URL.
- credentials: true is an option that allows cookies and authentication headers to be included in this cross origin request. This will be important authentication of unique users.

### Connect to Frontend Client URL
app.use(express.json()); : 
-  Middlware intended to parse JSON request bodies so that we can access the data in `req.body` and use it in our application.

### Parse HTTP-Only cookies
app.use(cookieparser()); : 
- Parse cookies from the request headers for the purpose of authentication.

### Database Connection
- dataBaseConnections() is an async function that is responsible for connecting the application to a MongoDB database using Mongoose. 
- Inside the try block is an await that attempts to establish a connection to a MongoDB instance that is specified by the MONGO_URI environment variable.

### Start The Server
- serverStart() is an async function that handles the startup process of the Express server. Inside the function it waits for the database to connect from the await dataBaseConnection(). This ensures that the server only starts after the connection is established.
- app.listen(PORT, () => {...} starts the Express server on the specified PORT environment variable. A console.log will deliver a message upon successfully starting the server.

### models/user.ts

- `export interface IUser extends mongoose.Document{
    username: string;
    password: string;
    createdAt?: Date; 
}`
- This IUser interface will extend to the Document aspect of mongoose. This means any User Document will have all the properties and methods provided by Mongoose. As a result the user must have the properties of Username, Password, and an optional createdAt (relates to timestamps:true in the userSchema)

- const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3 
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
        maxlength: 75 
    }
}, {timestamps: true}); 

- This is the userSchema that defines the structure for the User Documents in mongoose. These properties are type defined and have rules that follow respective to their property. The properties are as follows: Username, Password, and timestamps.
- username: Typed as string, is mandatory, minimum length is 3 characters, and NO two users can share the same name.
- password: Typed as string, is mandatory, minimum lenght is 8 characters, maximum length is 75 characters if you're about that.
- the timestamps option tells Mongoose to automatically add the createdAt and updatedAt fields to each document, which assists in tracking for when users are created or updated.

- const User = mongoose.model<IUser>('User', userSchema);
- This creates a model used by Mongoose based upon the structure set by userSchema and bound by the type checking set by the interface of IUser.
- A model is a class that provides an interface to interact with a specified MongoDB collection (Users in this case).
- <IUser> will tell the model to follow this interface. 



