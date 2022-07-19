const mysql=require("mysql")
const express=require("express")
const time=require("./node_time_set1")
const Home=express.Router()
var sql_config={}
// Home.use(express.static(""))
Home.get("/home",function(request,response){
    response.send("Home"+time.get_time_now())
})

module.exports=Home