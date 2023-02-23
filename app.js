const express = require("express");
const https = require("https");
const app = express();


const port = 8000;
app.listen(process.env.PORT||port,()=>{
    console.log(`Your Server has started and running on http://localhost:${port}`);
});
app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const Email = req.body.email;
    

    const data = {
        members:[
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };

    

    const jsonData = JSON.stringify(data);
    let url = "https://us8.api.mailchimp.com/3.0/lists/edd4c1ba55";
    const options = {
        method:"POST",
        auth: "Bijender:fbb9af15ee82fb7ac03aa0c7f3756bcc-us8"
    }
    const request = https.request(url,options,(response)=>{
        let status = response.statusCode;
        if (status == 200) {
            res.sendFile(__dirname+"/success.html")
            
        }
        else{
            res.sendFile(__dirname+"/error.html")
        }
        
        response.on("data",(data)=>{
           
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.get("/failure",(req,res)=>{
    res.redirect("/");
})

//fbb9af15ee82fb7ac03aa0c7f3756bcc-us8
//list id: edd4c1ba55