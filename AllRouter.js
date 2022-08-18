const express = require("express")
const mysql = require("mysql")
const fs = require('fs')
const path = require("path")
const time = require("./node_time_set1")
const All = express.Router()
var sql_config = {
    host: "127.0.0.1",
    user: "root",
    port: '3306',
    password: "gx628572",
    database: "webgis_db"
}

function point(para_id, para_area) {
    this.geometry = {
        type: "Point",
        coordinates: [0, 0]
    };
    this.properties = {
        id: para_id,
        area: para_area,
        ch4: -1,
        h2s: -1,
    }
}



All.post("/queryAll", function (request, response) {
    var DataPoints = {
        first: [],
        second: [],
        normal: [],
        pie_infor: {
            ch4: [
                {
                    value: 0,
                    name: "high(>=10)",
                },
                {
                    value: 0,
                    name: "mid(2-10)"
                },
                {
                    value: 0,
                    name: "low(<=2)"
                }
            ],
            h2s: [
                {
                    value: 0,
                    name: "high(>=1)"
                },
                {
                    value: 0,
                    name: "mid(0.5-1)"
                },
                {
                    value: 0,
                    name: "low(<=0.5)"
                }
            ],
            level: [
                {
                    value: 0,
                    name: "一级报警"
                },
                {
                    value: 0,
                    name: "二级报警"
                },
                {
                    value: 0,
                    name: "正常"
                }
            ]
        }
    }
    var now_date = time.time_to_number()
    var con = mysql.createConnection(sql_config)
    var sql_query_str = "select * from latest group by id"
    con.connect()
    con.query(sql_query_str, [now_date, now_date], function (err, result) {
        if (err) {
            throw err
        }
        else {
            fs.readFile(path.join(__dirname, "./DataInfor/PointsInfor.json"), "utf-8", function (err1, data) {
                if (err1) {
                    throw err1
                }
                else {
                    data = JSON.parse(data)
                    // console.log(typeof(data))
                    for (var row_value in result) {
                        var point_id = result[row_value].id
                        var point_area=result[row_value].area
                        var point_ch4 = result[row_value].ch4
                        var point_h2s = result[row_value].h2s
                        var point_alarming = result[row_value].alarming
                        var one_point = new point(point_id, point_area)
                        point_id="p"+point_id
                        // console.log(data[point_id])
                        one_point.geometry.coordinates = data[point_id].geometry.coordinates[0]
                        one_point.properties.ch4 = point_ch4
                        one_point.properties.h2s = point_h2s

                        if (point_alarming === "first") {
                            DataPoints.first.push(one_point)
                            DataPoints.pie_infor.level[0].value+=1
                        }
                        else if(point_alarming==="second"){
                            DataPoints.second.push(one_point)
                            DataPoints.pie_infor.level[1].value+=1
                        }
                        else{
                            DataPoints.normal.push(one_point)
                            DataPoints.pie_infor.level[2].value+=1
                        }

                        if(point_ch4>=10){
                            DataPoints.pie_infor.ch4[0].value+=1
                        }
                        else if(point_ch4>2&&point_ch4<10){
                            DataPoints.pie_infor.ch4[1].value+=1
                        }
                        else{
                            DataPoints.pie_infor.ch4[2].value+=1
                        }

                        if(point_h2s>=1){
                            DataPoints.pie_infor.h2s[0].value+=1
                        }
                        else if(point_h2s>0.5&& point_h2s<1){
                            DataPoints.pie_infor.h2s[1].value+=1
                        }
                        else{
                            DataPoints.pie_infor.h2s[2].value+=1
                        }

                        
                    }
                    // console.log(DataPoints.first.length+DataPoints.second.length+DataPoints.normal.length)
                    response.send(DataPoints)
                }
            })
        }
    })
    con.end()

})

module.exports = All