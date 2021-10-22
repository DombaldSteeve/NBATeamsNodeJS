import express, { Router } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import ejs from 'ejs';
import User from './models/user.js';
import bcrypt from "bcrypt";
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';


import cookieSession from 'cookie-session';


const port = 3002;
const app = express();
const router = express.Router();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'))
app.use(cookieParser());


const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'secret-key',
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// const session;



mongoose.connect('mongodb://localhost:27017/nbateamsdb' , {useNewUrlParser:true});


app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})


app.get('/', (req,res) => {
    res.render('index');
});
app.get('/register', (req,res) => {
    res.render('register');
});
app.get('/about', (req,res) => {
    res.render('about');
});
app.get('/teams', (req,res) => {
    res.render('teams');
});
app.get('/userProfile', (req,res) => {
    res.render('userProfile');
});
app.get('/teamsUser', (req,res) => {
    res.render('teamsUser')
})

app.get('/register/connect', (req,res) => {
    // User.findOne({Email: req.body.email})
    //     .then(user => {
    //         if (!user) {
            res.render('connect');
            

    });

app.get('/teams', (req,res) => {
    if(req.session.id){
        res.render('teamsUser', {parms: getParms(PAGE_HOME), context:null, message:null});
    }
});




app.post('/register/inscription', function (req,res) {
    User.findOne({Email: req.body.email})
    .then(user => {
        if (user) {
            console.log('utilisateur existe déjà');
            res.render('connect');
            return
        }
        bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({

            Username: req.body.userName,
            Password: hash,
            Email: req.body.email
        });
        user.save(); 
        
        res.redirect('/register/connect');
    })   
    
});
})




app.post('/register/connect', function (req,res) {
    User.findOne({Email: req.body.email})
    .then(user => {
        if (!user ) {
            
            res.render('register');
            return
        }
        console.log('OK');
        // ici, établir une session ou connexion et la maintenir la connexion
        // req.session.UserId = pers.id;
        res.redirect('/userProfile');
        
        // req.session.Username = User._id;
    })
    
});


let sess;
app.post('/register/connect',(req,res) => {
    if(req.body.email == User.findOne({Email: req.body.email})){
        sess=req.session;
        sess.userid=req.body.email;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})








// router.get('/userProfile', function(req, res, next) {
//     req.session.id = User.id;
//     res.render('teamsUser', { userCount: req.session.id });
// });

// export default router


// sur le get, après authentification du user
// req.session.UserId = pers.id; // pers.id = id en base de données

// // Après sur tous les GET des pages où le user doit être connecté, il faut tester que le UserId est vrai avant de faire quelque chose
//     app.get('/index', (req,res)=>{
//         if(req.session.UserId){
//             // chargement de la page
//             res.render(PAGE_HOME, {parms: getParms(PAGE_HOME), context:null, message:null});
//         }
//     })

// // lorsqu'on clique sur un bouton "Se déconnecter" @Esteban : encore merci pour le code
// app.get('/disconnect', (req,res)=>{
//         if(req.session.UserId){
//             req.session.destroy((err)=> {if(err) throw err;});
//             res.redirect('/');
//         }
//     })

