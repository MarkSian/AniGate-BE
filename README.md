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




