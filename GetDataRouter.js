const schedule=require("node-schedule")
const time=require("./node_time_set1")
const fs =require("fs")
const path=require("path")
function get_points_data(){
    var rule=new schedule.RecurrenceRule()
    rule.second=[]
    for(i=0;i<=60;i+=30){
        rule.second.push(i)
    }
    
    schedule.scheduleJob(rule,function(){
        // console.log(time.get_time_now())
        fs.readFile(path.join(__dirname,"./DataInfor/PointsInfor.json"),"utf-8",function(err,data){
            if(err){
                console.log("Reading Failed")
                throw err
            }
            else{
                var points_data=JSON.parse(data)
                for(i=0;i<points_data.length;i++){
                    // console.log(points_data[i].properties.id)
                }
            }
        })
    })
}

module.exports=get_points_data

//function test code
get_points_data()