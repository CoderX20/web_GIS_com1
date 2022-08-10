const express=require("express")
const mysql=require("mysql")
const fs=require('fs')
const path=require("path")
const All=express.Router()
var sql_config={}
All.post("/queryAll",function(request,response){
    fs.readFile(path.join(__dirname,"./DataInfor/DataPoints2.json"),"utf-8",function(err,data){
        if(err){
            throw err
        }
        response.send(JSON.parse(data))
    })
})

module.exports=All