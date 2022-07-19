const schedule=require("node-schedule")
const time=require("./node_time_set1")
function get_points_data(){
    var rule=new schedule.RecurrenceRule()
    rule.second=[]
    for(i=0;i<=60;i+=3){
        rule.second.push(i)
    }

    schedule.scheduleJob(rule,function(){
        // console.log(time.get_time_now())
    })
}

module.exports=get_points_data