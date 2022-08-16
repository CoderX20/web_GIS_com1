var Time = {
    get_time_now: function () {
        var date = new Date()
        return date.getFullYear() + '-'
            + (date.getMonth() + 1) + '-'
            + date.getDate() + '-'
            + date.getHours() + '-'
            + date.getMinutes() + '-'
            + date.getSeconds() + '-'
            + date.getMilliseconds()
    },
    time_to_number:function(){
        var date = new Date()
        var year=date.getFullYear()
        var month=date.getMonth()+1
        var day=date.getDate()
        var hour=date.getHours()
        var minutes=date.getMinutes()
        var second=date.getSeconds()
        // console.log(year,month,day,hour,minutes,second)
        if(month<10){
            month="0"+month
        }
        if(day<10){
            day="0"+day
        }
        if(hour<10){
            hour="0"+hour
        }
        if(minutes<10){
            minutes="0"+minutes
        }
        if(second<10){
            second="0"+second
        }
        // console.log(year+month+day+hour+minutes+second)
        return Number(year+month+day+hour+minutes+second)
    }
}

module.exports = Time

// console.log(Time.get_time_now(),Time.time_to_number(),typeof(Time.time_to_number()))
