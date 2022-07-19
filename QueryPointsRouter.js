const express=require("express")
const mysql=require("mysql")
const time=require("./node_time_set1")
const Query=express.Router()
var sql_config={}

Query.post("/queryPoints",function(request,response){
    var id=request.query.id
    console.log("Query point id="+id+" when "+time.get_time_now())
})

module.exports=Query