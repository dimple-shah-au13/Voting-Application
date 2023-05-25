import express from 'express';
import { Router } from "express";
import pool from '../database/db.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get("/count", async (req,res) => {
    try {
   // console.log(req.query.userid)
    // pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
    //     if (err) throw err;
    //     //console.log(results.rows)
    //     res.render("count",
    //        {userid: req.query.userid, 
    //         count1: 0,
    //         count2: 0,
    //         count3: 0,
    //         count4: 0,

    //         candidate1: results.rows[0].candidatename,
    //         candidate2: results.rows[1].candidatename,
    //         candidate3: results.rows[2].candidatename,
    //         candidate4: results.rows[3].candidatename } );
    // }) 
    } catch (error) {
        res.send(error)
    }
})

router.post("/count", async (req,res) => {
    try {
        let voterid = req.body.exampleRadios
       if(voterid == 1){
        pool.query(`SELECT COUNT(voterid) FROM votings WHERE voterid = $1`, [voterid], (err, results1) => {
            if (err) throw err;
            console.log(results1.rows[0])
            if(results1.rows[0].count ){
                pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
                    if (err) throw err;
                    //console.log(results.rows)
                    res.render("totalCounts",
                       {
                        count1: results1.rows[0].count,
                        count2: 0,
                        count3: 0,
                        count4: 0,
    
                        candidate1: results.rows[0].candidatename,
                        candidate2: results.rows[1].candidatename,
                        candidate3: results.rows[2].candidatename,
                        candidate4: results.rows[3].candidatename } );
                }) 
            }
        })
       }
       if(voterid == 2){
        pool.query(`SELECT COUNT(voterid) FROM votings WHERE voterid = $1`, [voterid], (err, results1) => {
            if (err) throw err;
            console.log(results1.rows[0])
            if(results1.rows[0].count ){
                pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
                    if (err) throw err;
                    //console.log(results.rows)
                    res.render("totalCounts",
                       {
                        count1: 0,
                        count2: results1.rows[0].count,
                        count3: 0,
                        count4: 0,
    
                        candidate1: results.rows[0].candidatename,
                        candidate2: results.rows[1].candidatename,
                        candidate3: results.rows[2].candidatename,
                        candidate4: results.rows[3].candidatename } );
                }) 
            }
        })
       }
       if(voterid == 3){
        pool.query(`SELECT COUNT(voterid) FROM votings WHERE voterid = $1`, [voterid], (err, results1) => {
            if (err) throw err;
            console.log(results1.rows[0])
            if(results1.rows[0].count ){
                pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
                    if (err) throw err;
                    //console.log(results.rows)
                    res.render("totalCounts",
                       {
                        count1: 0,
                        count2: 0,
                        count3: results1.rows[0].count,
                        count4: 0,
    
                        candidate1: results.rows[0].candidatename,
                        candidate2: results.rows[1].candidatename,
                        candidate3: results.rows[2].candidatename,
                        candidate4: results.rows[3].candidatename } );
                }) 
            }
        })
       }
       if(voterid == 4){
        pool.query(`SELECT COUNT(voterid) FROM votings WHERE voterid = $1`, [voterid], (err, results1) => {
            if (err) throw err;
            console.log(results1.rows[0])
            if(results1.rows[0].count ){
                pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
                    if (err) throw err;
                    //console.log(results.rows)
                    res.render("totalCounts",
                       {
                        count1: 0,
                        count2: 0,
                        count3: 0,
                        count4: results1.rows[0].count,
    
                        candidate1: results.rows[0].candidatename,
                        candidate2: results.rows[1].candidatename,
                        candidate3: results.rows[2].candidatename,
                        candidate4: results.rows[3].candidatename } );
                }) 
            }
        })
       }
   
      

    } catch (error) {
        res.send(error.message)

    }
})




export default router;