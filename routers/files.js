const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const { fileLocaltion } = require("../constants");

router.post("/file-upload", (req, res) => {
    //create a formidable instance
    var form = new formidable.IncomingForm();
    //parse the "multipart/form-data" data and get back fields (which are textual input of the form) and files (which are file input if the form)
    form.parse(req, function (err, fields, files) {
      //this is the old path of the file (the path on which node saved it on out computer), but we need it in a certain location in out project namely newPath
      var oldpath = files.filetoupload.filepath;
      //we change the original file a little bit by adding the current date to it which is expressed in seconds and cannot be repeated so we won't override any files
      var newpath = fileLocaltion  + files.filetoupload.originalFilename;
      //now we just rename the file (basically assigning it a new location) and move it to the new path
      fs.rename(oldpath, newpath, function (err) {
        //if there is an error we throw it
        if (err) throw err;
        //if there is no error we send a response to the client
        res.write('File uploaded and moved!');
        res.end();
      });
  })
  });




  router.post("/multiple_files", (req, res) => {
    //create a formidable instance
    const form = formidable({ multiples: true });
    //parse the "multipart/form-data" data and get back fields (which are textual input of the form) and files (which are file input if the form)
    form.parse(req, async (err, fields, files) => {
      //because we uploaded mutiple files files.filetoupload is an array so we need to 
        files.filetoupload.forEach((file) => {
                //this is the old path of the file (the path on which node saved it on out computer), but we need it in a certain location in out project namely newPath
                var oldpath = file.filepath;
                //we change the original file a little bit by adding the current date to it which is expressed in seconds and cannot be repeated so we won't override any files
                const newFileName = `${Date.now()}_${file.originalFilename}`;
                //and add this file name to out filelocation (a variable representing the folder where we want to place the files). In the end we get the full path and we name it newPath
                const newPath = fileLocaltion + newFileName;
                //now we just rename the file (basically assigning it a new location) and move it to the new path
                fs.rename(oldpath, newPath, function (err) {
                  //if there is an error we throw it
                    if (err) throw err;
                    //if there is no error we send a response to the client
                    res.write('File uploaded and moved!');
                    res.end();
                  });
        });
      });
  });




//   nodemon : File C:\Users\olgar\AppData\Roaming\npm\nodemon.ps1 cannot be loaded. The file C:\Users\olgar\AppData\Roaming\npm\nodemon.ps1 is not digitally signed. You cannot run 
// this script on the current system. For more information about running scripts and setting execution policy, see about_Execution_Policies at 
// https:/go.microsoft.com/fwlink/?LinkID=135170.
// At line:1 char:1
// + nodemon app.js
// + ~~~~~~~
//     + CategoryInfo          : SecurityError: (:) [], PSSecurityException
//     + FullyQualifi

router.get("/", (req, res) => {
    //we use the fs module to read the files in the images folder
    fs.readdir(`${__dirname}/images`, (err, files) => {
    res.send(files);
    });
});

router.delete("/:filename", (req, res) => {
    //we use the fs module to delete the file with the name that we get from the request params
    fs.unlink(`${fileLocaltion}${req.params.filename}`, function (err) {
    //if there is an error we throw it
    if (err) throw err;
    //if there is no error we send a response to the client
    res.send('File deleted!');
  });
});




module.exports = router;