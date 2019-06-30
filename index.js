const express           = require('express'),
      bodyParser        = require('body-parser'),
      bcrypt            = require('bcrypt'),
      cors              = require('cors'),
      knex              = require('knex'),
      register          = require('./Contollers/register'),
      signin            = require('./Contollers/signin'),
      profile           = require('./Contollers/profile'),
      image             = require('./Contollers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : 'postgresql-tapered-48160',
        user : 'postgres',
        password : 'bluwaters2001',
        database : 'smartbrain'
    }
});

const app = express();
const saltRounds = 10;


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Smart Brain App is working ...') });
app.post('/signin', signin.handleSignin(db, bcrypt ));
app.post('/register', register.handleRegister(db, bcrypt, saltRounds ));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Smartbrain server running on port ${process.env.PORT}`);
});