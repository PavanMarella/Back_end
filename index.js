const http = require("http");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const { Int32, Double } = require("bson");

    const uri = "mongodb+srv://pavan:pavan@cluster0.owolaok.mongodb.net/WatchDB?retryWrites=true&w=majority";
    
    mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    });
    mongoose.connection.on('connected',()=>{
        console.log("connected")
    });
    
    
    const watchschema = mongoose.Schema({
    
    id: String,
    Watch_series:String,
    new_feature:Array,
    year_of_release:String,
    OS:String,
    product_discontinued:Boolean,

   
    
    });
    
    const watchdata =mongoose.model('features',watchschema);

const server = http.createServer((req, res) => {
    
    
    
    
    if (req.url === '/') {
    
    
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, '/fol', 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, '/', 'about.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
    else if (req.url==='/api')
    {
        console.log("Entered");
       
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Please note the content-type here is application/json
        

        
       
        watchdata.find({

        }


        ).then(data=>{
            res.setHeader('Content-Type', 'application/json','utf-8');
            res.end(JSON.stringify(data));
        })
        
       
        
    }
    
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

   
});

const PORT=process.env.PORT||3828;
server.listen(PORT,()=>console.log(`server running ${PORT}`));