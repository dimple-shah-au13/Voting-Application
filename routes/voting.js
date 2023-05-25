import express from 'express';
import { Router } from "express";
import pool from '../database/db.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/voting', async (req,res) => {
    console.log(req.query.userid)
    pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
        if (err) throw err;
        res.render("voting",
           {userid: req.query.userid, 
            candidate1: results.rows[0].candidatename,
            candidate2: results.rows[1].candidatename,
            candidate3: results.rows[2].candidatename,
            candidate4: results.rows[3].candidatename } );
    })
})

router.post("/voting", async (req,res) => {
    let userid = req.query.userid
    let voterid = req.body.exampleRadios
    let count = 1

    pool.query(`SELECT COUNT(count) FROM votings WHERE userid = $1`, [userid], async(err, results) =>{
        if (err) {console.log(err + '🟡')}
        if(results.rows[0].count >= 1){
            return res.render('alert', {message: "You already Voted"});
        }

        pool.query(`INSERT INTO votings VALUES ($1, $2, $3) ` , [voterid, userid, count], async(err, results) => {
            if (err) {console.log(err + '🛑')}
           return res.render('alert', {message: "Voting done successfully"});

        })
    })
})



export default router;