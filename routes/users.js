import express from 'express';
import { Router } from "express";
import pool  from "../database/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import auth from '../middlewares/auth.js';
import userController from '../controllers/userController.js';
const router = express.Router();

router.get("/home", async (req,res) => {
  console.log(req.body);
  res.render("home");
})

//router.post("register", userController.register)
router.get("/register", userController.register)

router.post("/register", async (req,res) => {
    //let { username, password, email, phone } = req.body;
  try {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let phone = req.body.phone
    let role = req.body.role
    let errors= []

    console.log({
        username,
        password,
        email,
        phone
      });

      const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        
        //phone: Joi.number().max(10).min(7)
        phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),

        role: Joi.string()
    })  
     
    let results = schema.validate({...req.body});
    console.log(results)

    //if (!username || !password || !email || !phone) {
      if(results.error){
      errors.push({ message: results.error });
      throw errors
    }

    if (password.length < 5) {
        errors.push({ message: "Password must be a least 5 characters long" });
      }
   
    if (errors.length > 0) {
      res.render("register", { errors, username, password, email, phone });
    }else{
        let hashedPassword = await bcrypt.hash(password, 10  );
        console.log(hashedPassword);

        pool.query(`SELECT * FROM users WHERE email = $1 and username = $2`, [email, username], (err,results) => {
            if(err){
                console.log(err)
            }
            console.log(results.rows);

            if(results.rows.length > 0){
                return res.render("register", {message : "Email already registered"})
            }else{
                pool.query(`INSERT INTO users (userid, username, password, email, phone, role)
                VALUES($1, $2, $3, $4, $5, $6)`, [uuidv4(), username, hashedPassword, email ,phone , role], (err,results) =>{
                    if (err) {
                      console.log(err);
                    return  res.render("register", {message: "This name already exists, Please register with new name."})
                    }else{

                    };
                    //console.log(results.rows)
                     res.redirect("/api/v1/login")
                }
              )
            }
            //res.redirect("/login")
 
        })
    }
  } catch (error) {
    console.log(error);
  }

    
})


router.get('/login', async (req,res) => {
    res.render("login");
})


router.post("/login", auth, async (req, res) => {
     let { username, password} = req;
     //console.log(username,password + '🟨');

     pool.query(`SELECT * FROM users WHERE username = $1 `,  [username], async (err,results) => {
        if (err) throw err;
        //console.log(results.rows);

        if(results.rows.length > 0){
            const user = results.rows[0];

            bcrypt.compare(password, user.password,  (err, isMatch) => {
                //console.log(password, user.password)
                if (err) { console.log(err + "🔴"); }
                if (isMatch) {
                    return user;
                } else {
                    return ({ message: "Password is incorrect" });
                }

            })
            const userid = results.rows[0].userid
            return res.redirect("/api/v1/voting/?userid=" + userid ) 

        }else{
            return ({message: "No user exists with that email address"});
        }

     })

})



router.get("/logout", (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    //return res.render('home', {message: "You have successfully logged out.", color: "red"});
    return res.redirect("/api/v1/home")

  });


export default router;