const express=require('express');
const cors = require('cors')
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smart_brain'
  }
});

// const database = {
// 	users:
// 	[
// 		{
// 			id:'123',
// 			name : 'John Doe',
// 			email : 'johndoe@gmail.com',
// 			password :'johnPassword',
// 			entries : 0,
// 			joined : new Date()

// 		},
// 		{
// 			id : '124',
// 			name : 'Sally',
// 			email : 'Sally@gmail.com',
// 			password:'sallyPassword',
// 			entries : 0,
// 			joined : new Date()

// 		}
	
// 	]
// }
////////////////////////////////////////////////////////////////
app.use(express.json());//to avoid parsering error -cannot read property of undefined
app.use(cors());//to avoid Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3001/. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing)

app.get('/', (req, res) => {res.send("success");})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT; 
app.listen(PORT,() => { 
	console.log(`The server is up and running. Listening on port ${PORT}`);
})

/* dev planning
	/       		 -->res = This is working V
	/signin 		 -->POST = success/fail   V
	/register 		 -->POST = user           V
	/profile/:userId -->GET = user            
	/image			 -->PUT -->user
*/