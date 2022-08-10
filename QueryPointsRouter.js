const express=require("express")
const mysql=require("mysql")
const fs=require("fs")
const path=require("path")
const time=require("./node_time_set1")
const Query=express.Router()
var sql_config={}

Query.post("/queryPoint",function(request,response){
    var id=request.query.id
    console.log("Query point id="+id+" when "+time.get_time_now())
    fs.readFile(path.join(__dirname,"./DataInfor/onePoints.json"),"utf-8",function(err,data){
        if(err){
            throw err
        }
        response.send(JSON.parse(data))
    })
})

module.exports=Query