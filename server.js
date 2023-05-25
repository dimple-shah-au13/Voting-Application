import express from "express";
import chalk from 'chalk';
import morgan from 'morgan';
//import pool from '../Voting-Application/database/db.js';
import dotenv from 'dotenv';
import votingRoutes from './routes/voting.js';
import path from "path";
import { fileURLToPath } from 'url';
import userRoutes from "./routes/users.js";
import countRoutes from "./routes/count.js";
//import homeRoutes from "./routes/users.js";
//import pool from "../database/db.js";

import mustacheExpress from 'mustache-express';


const app = express();
const port = process.env.PORT || 8000;

dotenv.config({ path: 'config.env' });

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.set("view engine", "hbs");
//hbs.registerPartials('/views/partials', function (err) {});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEWS_PATH = path.join(__dirname, '/views');
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))

app.set('view engine', 'mustache')
app.use('/css', express.static('css'));







  
app.use("/api/v1/", userRoutes )
app.use("/api/v1/", votingRoutes )
app.use("/api/v1/", countRoutes )
//app.use("/api/v1/", homeRoutes )




// app.get('/register', (req,res) => {
//     res.render("register");
// })

// app.get('/login', (req,res) => {
//     res.render("login");
// })

// app.get('/voting', (req,res) => {
//     res.render("voting");
// })


app.listen(port, async () => {
    console.log(chalk.bgYellow.black(`App running on port ${port} 😊...`))

})

