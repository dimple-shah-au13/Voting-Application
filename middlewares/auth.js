import pool from '../database/db.js';


const auth = (req,res,next) => {
    try {
       let {username} = req.body;
       if (!username){
          console.log("Please provide username")
       } 
       pool.query(`SELECT role FROM users WHERE username = $1`, [username], (err,results) => {
        if (err) {console.log(err +'🔴')}
        console.log(results)
        if(results.rows[0].role === "admin"){
            next()
            pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
                if (err) throw err;
                //console.log(results.rows)
                res.render("count",
                   {userid: req.query.userid, 
                    candidate1: results.rows[0].candidatename,
                    candidate2: results.rows[1].candidatename,
                    candidate3: results.rows[2].candidatename,
                    candidate4: results.rows[3].candidatename } );
            }) 
        }
        if(results.rows[0].role === "user_role"){
            next()
            pool.query(`SELECT userid FROM users WHERE username = $1`, [username], (err,result) => {
                if(err) throw err;
              
            pool.query(`SELECT * FROM candidates` ,[], (err,results) => {
                if (err) throw err;
                //console.log(results.rows)
                res.render("voting",
                   {userid: result.rows[0].userid,

                    candidate1: results.rows[0].candidatename,
                    candidate2: results.rows[1].candidatename,
                    candidate3: results.rows[2].candidatename,
                    candidate4: results.rows[3].candidatename } );
            })
        });
        }
        
       })
    } catch (error) {
        console.log(error)
    }
}


export default auth;