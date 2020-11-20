//背景色変更
function changeBackColor(){
    let r = document.getElementById("bgColorR").value;
    let g = document.getElementById("bgColorG").value;
    let b = document.getElementById("bgColorB").value;

    localStorage.setItem('main-bg-color-R',r);
    localStorage.setItem('main-bg-color-G',g);
    localStorage.setItem('main-bg-color-B',b);

    let rgb = "rgb(" + r + ","+ g + "," + b + ")";
    document.documentElement.style.setProperty("--main-bg-color",rgb);
}

function resetBackColor(){
    localStorage.removeItem('main-bg-color-R');
    localStorage.removeItem('main-bg-color-G');
    localStorage.removeItem('main-bg-color-B');

    document.getElementById("bgColorR").value = parseInt("ff",16);
    document.getElementById("bgColorG").value = parseInt("57",16);
    document.getElementById("bgColorB").value = parseInt("22",16);

    changeBackColor();
}

function setBackColor(){
    if ( localStorage.getItem("main-bg-color-R")==null ){
        resetBackColor();
    } else {
        let r = localStorage.getItem('main-bg-color-R');
        let g = localStorage.getItem('main-bg-color-G');
        let b = localStorage.getItem('main-bg-color-B');

        document.getElementById("bgColorR").value = r;
        document.getElementById("bgColorG").value = g;
        document.getElementById("bgColorB").value = b;

        changeBackColor();
    }
}



//フォント変更
function changeFontColor(){
    let r = document.getElementById("fontColorR").value;
    let g = document.getElementById("fontColorG").value;
    let b = document.getElementById("fontColorB").value;

    localStorage.setItem('main-font-color-R',r);
    localStorage.setItem('main-font-color-G',g);
    localStorage.setItem('main-font-color-B',b);

    let rgb = "rgb(" + r + ","+ g + "," + b + ")";
    document.documentElement.style.setProperty("--main-font-color",rgb);
}

function resetFontColor(){
    localStorage.removeItem('main-font-color-R');
    localStorage.removeItem('main-font-color-G');
    localStorage.removeItem('main-font-color-B');

    document.getElementById("fontColorR").value = parseInt("00",16);
    document.getElementById("fontColorG").value = parseInt("00",16);
    document.getElementById("fontColorB").value = parseInt("00",16);

    changeFontColor();
}

function setFontColor(){
    if(localStorage.getItem("main-bg-color_B")==null){
        resetBackColor();
    } else {
        let r = localStorage.getItem('main-font-color-R');
        let g = localStorage.getItem('main-font-color-G');
        let b = localStorage.getItem('main-font-color-B');

        document.getElementById("fontColorR").value = r;
        document.getElementById("fontColorG").value = g;
        document.getElementById("fontColorB").value = b;

        changeBackColor();
    }
}