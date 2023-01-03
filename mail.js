const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

 
const app =  express();
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
 const firstName = req.body.fName;
 const lastName = req.body.lName;
 const email = req.body.email;

  const data = {
       members:[{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME:firstName,
            LNAME:lastName,
          }
        }]
  };

  let jsonData = JSON.stringify(data)

 const url = "https://us21.api.mailchimp.com/3.0/lists/6b74d967f3";

 const options = {
  method: "POST",
  auth: "Razak1:cffa24579fe65cd8c0bedeaffefbbb99-us21"
}

  const request = https.request(url, options, function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/fail.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
})
 //request.write(jsonData);
 request.end();
})

// Failure route...redirect to home "/" route
app.post("/fail",function(req,res){
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("server started: port 3000")
});
 


//cffa24579fe65cd8c0bedeaffefbbb99-us21
//6b74d967f3