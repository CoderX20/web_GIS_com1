const express = require("express")
const mysql = require("mysql")
const fs = require("fs")
const path = require("path")
const time = require("./node_time_set1")
const Query = express.Router()
var sql_config = {
    host: "127.0.0.1",
    user: "root",
    port: '3306',
    password: "gx628572",
    database: "webgis_db"
}

function moment(param_ch4, param_h2s, param_time, param_alarming) {
    this.ch4 = param_ch4,
        this.h2s = param_h2s,
        this.time = param_time,
        this.is_alarming = param_alarming
}

Query.post("/queryPoint", function (request, response) {
    var id = request.query.id
    console.log("Query point id=" + id + " when " + time.get_time_now())
    var pointsData = {
        id: id,
        area: "",
        data: []
    }
    var now_date = time.time_to_number()
    var check_con = mysql.createConnection(sql_config)
    check_con.connect()
    check_con.query("select * from datasetsTable where id = ?", [id], function (err0, data) {
        if (err0) {
            throw err0
        }
        else {
            if (data.length == 0) {
                pointsData.id = -1
                response.send(pointsData)
            }
            else {
                var con = mysql.createConnection(sql_config)
                var sql_query_str = "select * from datasetsTable where id=? and dateTime>=?-1000000 and dateTime%10000=0 group by dateTime order by dateTime asc "
                con.connect()
                con.query(sql_query_str, [id, now_date], function (err, result) {
                    if (err) {
                        throw err
                    }
                    else {

                        for (var row_value in result) {
                            pointsData.area = result[row_value].area
                            pointsData.data.push(new moment(result[row_value].ch4, result[row_value].h2s, result[row_value].dateTime, result[row_value].alarming))
                        }
                        response.send(pointsData)

                    }
                })
                con.end()
            }
        }
    })
    check_con.end()

})

module.exports = Query