const schedule = require("node-schedule")
const time = require("./node_time_set1")
const fs = require("fs")
const path = require("path")
const mysql = require("mysql")
var sql_config = {
    host: "127.0.0.1",
    user: "root",
    port: '3306',
    password: "gx628572",
    database: "webgis_db"
}
function get_points_data() {
    var rule = new schedule.RecurrenceRule()
    rule.second = []
    for (i = 0; i <= 60; i += 30) {
        rule.second.push(i)
    }
    var list = []

    schedule.scheduleJob(rule, function () {
        // console.log(time.get_time_now())
        fs.readFile(path.join(__dirname, "./DataInfor/PointsDatasets.json"), "utf-8", function (err, data) {
            if (err) {
                throw err
            }
            else {
                data = JSON.parse(data)
                fs.readFile(path.join(__dirname, "./DataInfor/PointsInfor.json"), "utf-8", function (err1, pointsInfor) {
                    if (err1) {
                        throw err1
                    }
                    else {
                        pointsInfor = JSON.parse(pointsInfor)
                        var con = mysql.createConnection(sql_config)
                        con.connect()
                        var sql_delete_str = "delete from latest"
                        con.query(sql_delete_str, function (err0) {
                            if (err0) {
                                throw err0
                            }
                            else { }
                        })
                        for (var ind in pointsInfor) {
                            var i = Math.floor(Math.random() * data.data.length)
                            var id = pointsInfor[ind].properties.id
                            var place = pointsInfor[ind].properties.area
                            var gas_data = data.data[i]
                            var date = time.time_to_number()

                            var sql_insert_str = "insert into datasetsTable set ?"
                            var insert_values = { id: id, area: place, alarming: gas_data.alarming, ch4: gas_data.ch4, h2s: gas_data.h2s, dateTime: date }
                            con.query(sql_insert_str, insert_values, function (err2) {
                                if (err2) {
                                    throw err2
                                }
                                else { }
                            })
                            sql_insert_str = "insert into latest set ?"
                            con.query(sql_insert_str, insert_values, function (err3) {
                                if (err3) {
                                    throw err3
                                }
                                else { 
                                    // console.log(insert_values)
                                }
                            })

                        }
                        con.end()
                    }
                })
            }
        })
    })
}

module.exports = get_points_data

//function test code
get_points_data()