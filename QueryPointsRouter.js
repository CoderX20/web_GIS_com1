const express=require("express")
const mysql=require("mysql")
const fs=require("fs")
const path=require("path")
const time=require("./node_time_set1")
const Query=express.Router()
var sql_config={
    host: "127.0.0.1",
    user: "root",
    port: '3306',
    password: "gx628572",
    database: "webgis_db"
}

function moment(param_ch4,param_h2s,param_time,param_alarming){
    this.ch4=param_ch4,
    this.h2s=param_h2s,
    this.time=param_time,
    this.is_alarming=param_alarming
}

Query.post("/queryPoint",function(request,response){
    var id=request.query.id
    console.log("Query point id="+id+" when "+time.get_time_now())
    var pointsData={
        id:id,
        area:"",
        data:[]
    }
    var con=mysql.createConnection(sql_config)
    var sql_query_str="select * from datasetsTable where id=2570 order by dateTime desc "
    con.connect()
    con.query(sql_query_str,function(err,result){
        if(err){
            throw err
        }
        else{
            for(var row_value in result){
                pointsData.area=result[row_value].area
                pointsData.data.push(new moment(result[row_value].ch4,result[row_value].h2s,result[row_value].dateTime,result[row_value].alarming))
            }
            response.send(pointsData)
        }
    })
    con.end()
})

module.exports=Query