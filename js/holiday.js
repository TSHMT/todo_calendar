function checkHoliday(year, month, day) {
    let dayOfWeek = new Date(year,month-1,day).getDay();
    let numOfWeek = Math.floor((day-1)/7)+1;

    switch (month){
        case 11:
            if (day == 3)   return true;
            if (day == 23)  return true;
            break;
    }
    return false;
}

function checkFurikae(year,month,day){
    let dayOfWeek   = new Date(year,month-1,day).getDay();
    let furikaeFlag = false;

    if (dayOfWeek==1){
        furikaeFlag=checkHoliday(year,month,day-1);
    }
    if (dayOfWeek==2 && furikaeFlag != true){
        furikaeFlag=checkHoliday(year,month,day-1)
        && checkHoliday(year,month,day-2);
    }
    if (dayOfWeek==3 && furikaeFlag != true){
        furikaeFlag=checkHoliday(year,month,day-1)
        && checkHoliday(year,month,day-2)
        && checkHoliday(year,month,day-3);
    }
    if ((dayOfWeek!=0 && dayOfWeek!=6) && furikaeFlag!=true){
        let prevDate = new Date(year,month-1,day);
        let nextDate = new Date(year,month-1,day);
        prevDate.setDate(prevDate.getDate()-1);
        nextDate.setDate(nextDate.getDate()+1);

        furikaeFlag = checkHoliday(prevDate.getFullYear()
                                ,  prevDate.getMonth()+1
                                , prevDate.getDate())
                    &&checkHoliday(nextDate.getFullYear()
                                ,  nextDate.getMonth()+1
                                , nextDate.getDate())
    }
    return furikaeFlag;
}