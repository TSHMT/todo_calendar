//グローバルでデータストアを格納する変数を宣言しておく。
let db;
//ここでDB名とストア名（テーブル名）を定義してしまう。
const DB_NAME = "jibunDB";
const DB_STORE= "jibunSTORE";

function initDB(){
    let openRequest = indexedDB.open(DB_NAME);

    openRequest.onupgradeneeded = function(event){
        db = event.target.result;
        
        //オブジェクトストア（SQLで言うところのテーブル？）を作成する。
        let store = db.createObjectStore(DB_STORE,{keyPath:"yyyymmddhhmm"});
        //作ったストアにインデックスを設ける。今回は一意としない。
        store.createIndex("yyyymmdd","yyyymmdd",{unique:false});
        console.log("IndexDBの準備（新規作成/バージョン更新）が完了しました。");
    }

    openRequest.onsuccess   = function(event){
        console.log("IndexDBのオープンに成功しました。");
        db = event.target.result;
    }
    openRequest.onerror     = function(event){
        console.log("IndexDBのオープンに失敗しました。");
    }
}

function setValue() {

    let day     = sessionStorage.getItem("day");
    let hour    = document.getElementById("hour").value;
    let minute  = document.getElementById("minute").value;
    let memo    = document.getElementById("memo").value;
    let idx     = String(year)+(("0"+month).slice(-2)) + (("0"+day).slice(-2));
    let key     = idx + hour + minute;

    const transaction = db.transaction([DB_STORE],"readwrite");
    const store = transaction.objectStore(DB_STORE);
    //オブジェクトストアには値は必ずキーとバリューのセットで存在する。
    //ストア内のキー同士の値は直接の繋がりはない。
    const request = store.put({
        "yyyymmdd"      : idx,
        "yyyymmddhhmm"  : key,
        "hour"          : hour,
        "minute"        : minute,
        "memo"          : memo,
        "date"          : new Date(),
    });

    request.onsuccess   = function (event) {
        document.getElementById("hour").value   = "00";
        document.getElementById("minute").value = "00";
        document.getElementById("memo").value   = "";
    }

    request.onerror     = function (event) {
        console.error(event.target.errorCode);
    }

    getDayData();
}

function getDayData(){

    let day = sessionStorage.getItem("day");
    let idx = String(year) + (("0" + month).slice(-2)) + (("0"+day).slice(-2));

    const result = document.getElementById("result");
    result.innerHTML = "";

    const transaction   = db.transaction([DB_STORE],"readonly");
    const store         = transaction.objectStore(DB_STORE);
    const request       = store.index("yyyymmdd").openCursor(IDBKeyRange.only(idx));
    request.onsuccess   = function (event) {
        if (event.target.result == null) return;

        const cursor        = event.target.result;
        let resultStr       = "";
        resultStr           = "<input class='deleteBtn' type='button' value='削除' >";
        resultStr           +=" > ";
        resultStr           +="&nbsp;";
        resultStr           +=cursor.value.hour + ":" + cursor.value.minute;
        resultStr           +="<p>" + cursor.value.memo + "</p><hr>";

        result.innerHTML    +=resultStr;
        cursor.continue();
    }

    request.onerror = function (event){
        console.error(event.target.errorCode);
    }
}

function outputData () {
//    if (confirm("全てのデータをJSON形式で出力します。よろしいですか？")){
    $("#outputDataStart").dialog({
        model:true,
        title:("JSON形式で出力する"),
        buttons:{"出力する":function(){
            const transaction   = db.transaction([DB_STORE],"readonly");
            const store         = transaction.objectStore(DB_STORE);
            const request       = store.getAll();
    
            request.onsuccess   = function(event){
                let json        = JSON.stringify(event.target.result);
                var blob        = new Blob([json],{"type":"applicatiopn/json"});
                document.location.href=URL.createObjectURL(blob);
            }
            request.onerror     = function(event){
                console.error(event.target.errorCode);
            }
        //}
        console.log(this);
        $(this).dialog("close");}}});
}