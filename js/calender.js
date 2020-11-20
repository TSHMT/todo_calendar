function makeCalender(year,month) {
    //変数の準備をする。
    const monthDays = new Date(year,month,0).getDate();
    const firstDay  = new Date(year,month-1,1).getDay();
    const lastDay   = new Date(year,month-1,monthDays).getDay();
    let dayOfWeek   = firstDay;
    
    //テーブルの頭を作る。変数を用意して、そこにタグと内容を追記していく。
    let str =   "";
    str     +=  "<table>";
    str     +=  "<tr>";
    str     +=  "<th id='sun'>日</th>";
    str     +=  "<th id='mon'>月</th>";
    str     +=  "<th id='tue'>火</th>";
    str     +=  "<th id='wed'>水</th>";
    str     +=  "<th id='thu'>木</th>";
    str     +=  "<th id='fri'>金</th>";
    str     +=  "<th id='sat'>土</th>";
    str     +=  "</tr>";
    str     +=  "<tr>";

    //&nbsp;を書き足していく。
    for (let i=0; i<firstDay; i++) {
        str += "<td>&nbsp;</td>";
    }
    
    //当月日数分、カレンダーのマス目をつくる
    for (let j=1; j<=monthDays; j++) {
        if (( firstDay + j ) % 7 == 1) {
            dayOfWeek=0;
            str += "</tr>";
            str += "<tr>";
        }
        str += "<td";
        str += " year      = '" + year      + "'";
        str += " month     = '" + month     + "'";
        str += " day       = '" + j         + "'";
        str += " dayOfWeek = '" + dayOfWeek + "'";
        if ( year   == new Date().getFullYear() 
        && month    == new Date().getMonth()+1 
        && j        == new Date().getDate()
        ) {
        str += " id        = 'today'            ";
        }
        if (dayOfWeek == 0 || checkHoliday(year,month,j) || checkFurikae(year,month,j)){
            str += " class='holiday'";
        }
        str += " onclick='selectDay(this);'";
        str += ">" + j + "</td>";
        dayOfWeek++;
    }
    for (let k=0; k<(6-lastDay); k++) {
        str += "<td>&nbsp;</td>";
    }
    str += "</tr>";
    str += "</table>";


    document.getElementById("headerYear").innerHTML=year;
    document.getElementById("headerMonth").innerHTML=month;

    document.getElementById("calendar").innerHTML=str;
}

//1)選択したイベントオブジェクトのもつ要素（maleCalender関数で各日の要素に設定した項目。）を抜き出し。
//2)カレンダーを非表示、インプットエリアを表示。
//3)カレンダーエリアのID:selectInfoにHTMLを書き出し。
function selectDay(e){

    var year        = e.getAttribute("year");
    var month       = e.getAttribute("month");
    var day         = e.getAttribute("day");
    var dayOfWeek   = "日月火水木金土日"[e.getAttribute("dayOfWeek")];

    showInputArea();
    document.getElementById("selectInfo").innerHTML = "<h2>" + month + "月" + day + "日(" + dayOfWeek + ")の予定</h2>";

    sessionStorage.setItem("day",day);
    
    getDayData();
}