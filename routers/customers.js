const express = require("express");
const db = require("../services/db");
const router = express.Router();




//get all customers using query parameters
router.get("/", async (req, res) => {
    try{

        const {
          limit, 
          state
        } = req.query;
        //now we can use the limit and state variables in our query, but only if they are not null
        let sql = 'SELECT * FROM customers';
        let params = [];
        //if the state (in this case it is a USA state) is not null we add it to the query
        if (state) {
          sql += ' WHERE state = ?';
          params.push(state);
        }
        //if the limit is not null we add it to the query
        if (limit) {
          sql += ` LIMIT ${limit}`;
        }
        //now we execute the query
        db.query(
            sql,
            params,
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
              res.send(results);
            }
          );

      }
      //if there is an error we catch it and send it to the client
      catch (error){
          res.status(400).json({success: false, error:error});
      }
});




//get customer by id
router.get("/:customer_id", async (req, res) => {

    try{
        db.query(
            'SELECT * FROM customers WHERE customer_id = ?',
            [req.params.customer_id],
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
              res.send(results);
            }
          );
      }
      catch (error){
          res.status(400).json({success: false, error:error});
      }
});




router.route("/:id")
//get customer
.get(async (req, res) => {
    try{
        db.query(
            'SELECT * FROM customers WHERE customer_id = ?',
            [req.params.id],
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
              res.send(results);
            }
          );
      }
      catch (error){
          res.status(400).json({success: false, error:error});
      }
})
//update customer
.patch(async (req, res) => {
    const {
        first_name,
        last_name,
        city,
    } = req.body;

    try{
        var sql =`UPDATE customers 
                  SET first_name = ?, 
                      last_name = ?, 
                      city = ? 
                  WHERE customer_id = ?`;
        db.query(sql, [first_name, last_name ,city, req.params.id], function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        res.json(result);
  });
}catch (error){
    res.status(400).json({success: false, error:error});
}
})
//delete customer
.delete(async (req, res) => {
    try{
        db.query(
            'DELETE FROM customers WHERE customer_id = ?',
            [req.params.id],
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
              res.send(results);
            }
          );
      }catch(error){
          res.status(400).json({success: false, error:error});
      }
    })






//Other routes here
router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });

module.exports = router;