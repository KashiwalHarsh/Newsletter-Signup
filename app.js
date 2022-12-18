const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const Email = req.body.Email;

    const data = {
        members:[
            {
                email_address:Email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
// they require data in form of stringlified JSON format
    const jsonData = JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/6345d5423e";

    const options={
        method:"POST",
        auth:"harsh1:b8afc166dcbf1fd962c3e4a2081fd556-us21"

    }

    const request = https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();


})


//try agian button redirting to home route of the webpage
app.post("/failure",function(req,res){
    res.redirect("/")
})
const PORT = process.env.PORT || 3000
app.listen(PORT,function(){
    console.log("server is up and running at 3000");
})

      // {
      //   "src": "/style.css",
      //   "dest": "/css/style.css"
      // },
      // {
      //   "src": "/logo.png",
      //   "dest": "/images/logo.png"
      // }