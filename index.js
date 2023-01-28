const express = require("express");
const path = require('path');
const customersRouter = require("./routers/customers"); 
const filesRouter = require("./routers/files"); 

const app = express();
const port = 3000;




//this tells express where to look for template files like pug
// app.set('views', './views')
app.set("view engine","pug")  

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.get('/form', function(req, res) {
  res.sendFile(path.join(__dirname, '/form.html'));
});

app.post("/form", (req, res) => {
  console.log(req.body);
  res.send("Form received");
})










app.use('/static', express.static('public'));
app.use('/images', express.static('images'));


app.get('/pug', (req, res) => {
  res.render('pugFile', { title: 'Hey', message: 'Hello there!' })
}) 

app.use("/customers", customersRouter);
app.use("/files", filesRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

