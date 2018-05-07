var arr_game;
var flagResult = [];
var flagResultrow = [];
var flagResultcol = [];
var flagarr = false;
var text_value = "";
var count = 0;
var countmin = 0;
var countadd = 0;
var groupNo;
var gallaryno;
var s;  // no of card 4 or  9
var numb;  // array of images before random
var level;


//alert(numb.length)

//  game timer

var watch_sec = 0;
var watch_min = 0;
var btn_work = false;
var flagtimer = false;
var timertime;

function start_watch(timeset) {
    watch_sec++;
    if (watch_sec >= 60) {
        watch_sec = 0;
        watch_min++;
        if (timeset == 4)
            timertime = 1;
        else
            timertime = 2;
        if (watch_min == timertime) {
            flagtimer = true;
            stop_timer();
            result();
        }
    } 

    if (watch_sec < 10 && watch_min < 3) {
        document.getElementsByTagName("h2")[0].innerHTML = "0" + watch_min + ":0" + watch_sec;
    }
    else {
        if (watch_min < 3) {
            document.getElementsByTagName("h2")[0].innerHTML = "0" + watch_min + ":" + watch_sec;
        }
        else {
            document.getElementsByTagName("h2")[0].innerHTML = watch_min + ":" + watch_sec;
        }
    }
}//start watch end

function start_timer(s) {
    if (btn_work == false) {
        timerId = setInterval("start_watch(s)", 1000);
        btn_work = true;
    }
}//start timer end

function stop_timer() {
    flagtimer = false;
    clearInterval(timerId);
    if (watch_min == timertime)
        document.getElementsByTagName("h2")[0].innerHTML = "00:00";
    btn_work = false;
}//stop timer end

//end of game timer

//  array random function
function fun_rand(arr) {
    var arr_len = arr.length;
    var rand_arr = [];
    for (var i = 0; i < arr.length; i++) {
        rand = Math.floor(Math.random() * arr_len);
        rand_arr[i] = arr[rand];
        for (var j = rand; j < arr_len - 1; j++) {
            arr[j] = arr[j + 1];
        }
        arr[arr_len - 1] = rand_arr[i];
        arr_len--;
    }
    return rand_arr;
};//end of random array

var flag = [];
var j = 0;
var min = 0;

// play start button
function play() {
    // get level and player name from query string
    var qur_str = window.location.search;
    qur_str = qur_str.substring(1);
    qur = qur_str.split('&');
    gallaryno = qur[0].split('=')[1];
    nameplayer = qur[1].split('=')[1];
    level = qur[2].split('=')[1];  

    // background image depend on the choosing gallary
    document.body.style.backgroundImage = "url('img/" + gallaryno + "/10.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

    // choose array of number based on level
    if (level == '1') {
        numb = [null, null, null, "img/" + gallaryno + "/1.png", "img/" + gallaryno + "/2.png", null, null, null,
            "img/" + gallaryno + "/3.png", "img/" + gallaryno + "/4.png", null, null, null, null, null, null];
    }
    else {
        numb = [null, null, null, "img/" + gallaryno + "/1.png", "img/" + gallaryno + "/2.png",
            null, null, null, "img/" + gallaryno + "/3.png", "img/" + gallaryno + "/4.png", null,
            null, null, null, null, null, "img/" + gallaryno + "/5.png", "img/" + gallaryno + "/6.png",
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, "img/" + gallaryno + "/7.png", "img/" + gallaryno + "/8.png",
            null, null, null, null, null, null, null, null, null, null, null, null, null, null,
            "img/" + gallaryno + "/9.png", null, null, null, null, null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        ];
    }

    arr_game = fun_rand(numb);  //  array after random for play

    if (arr_game.length == 16) {
        rr = 12; s = 4; h = 2; timertime = 1; //  rr  depend on it game will end
        // s number of card images       h  for   matrix 2*2
    }
    else {
        rr = 72; s = 9; h = 3; timertime = 2;
    }


    // hide all div and span in page and display only start button and name
    divElm = document.getElementsByTagName("div");
    for (var u = 0; u < divElm.length-1; u++) {
        divElm[u].style.display="block";
    }
    spanElm = document.getElementsByTagName("span");
    spanElm[0].style.display = "none";

    btn = document.getElementsByTagName("input")
    btn[btn.length - 1].style.display = "none";

    start_timer(s);   //start timer
     
    p = 1; //  counter for display img in ul
    for (var i = 0; i < arr_game.length; i++) {

        if (arr_game[i] != null) {   //check to display random images on grid for play
            tdElement = document.getElementsByTagName("td");
            textdelete = tdElement[i].children;
            tdElement[i].removeChild(textdelete[0]);  //remove text box and replace it with img
            imgElement = document.createElement("img");
            imgElement.setAttribute("src", arr_game[i]);
            imgElement.setAttribute("width", "50px");
            imgElement.setAttribute("height", "50px");
            imgElement.setAttribute("onclick", "flipimg(" + i + ")");
            tdElement[i].appendChild(imgElement);

            // display images in ul under grid 
            ulElm1 = document.getElementsByTagName("ul")[0];
            liElm1 = document.createElement("li");
            ulElm1.appendChild(liElm1);
            imgElm2 = document.createElement("img");
            imgElm2.setAttribute("src", "img/" + gallaryno + "/" + p + ".png");
            liElm1.appendChild(imgElm2);
            p++;
            flag[j] = i;    // flag to get all start image 
            j++;
        }
    }
}


function flipimg(index) {    // change from image to textbox 
    tdElement = document.getElementsByTagName("td");
    textdelete = tdElement[index].children;
    if (flag.length == 4) {   //  check flag of start image to stop user to change it for 4*4
        if (flag[0] != index && flag[1] != index && flag[2] != index && flag[3] != index) {
            tdElement[index].removeChild(textdelete[0]);
            textElement = document.createElement("input");
            textElement.setAttribute("type", "text");
            textElement.setAttribute("onfocus", "flip(" + index + ")");
            tdElement[index].appendChild(textElement);
            countmin++; //count to calc all click on images
            textElement.focus();
        }
    }
    else {//  check flag of start image to stop user to change it for 9*9
        if (flag[0] != index && flag[1] != index && flag[2] != index && flag[3] != index && flag[4] != index && flag[5] != index && flag[6] != index && flag[7] != index && flag[8] != index) {
            tdElement[index].removeChild(textdelete[0]);
            textElement = document.createElement("input");
            textElement.setAttribute("type", "text");
            textElement.setAttribute("onfocus", "flip(" + index + ")");
            tdElement[index].appendChild(textElement);
            countmin++;
            textElement.focus();
        }
    }
}

function flip(index)  //change from textbox to image
{
    tdElement = document.getElementsByTagName("td");
    textdelete = tdElement[index].children;

    //allow only number from 1 to 4 for 4*4 and 1 to 9 for 9*9
    textdelete[0].onkeypress = function (event) {
        if (isNaN(event.key)) {
            event.preventDefault();
        }
        else {   
            if (event.key > 0 && event.key <= s) {
                text_value = event.key;  // index of changed cell from text to image
                tdElement[index].removeChild(textdelete[0]);
                imgElement = document.createElement("img");
                imgElement.setAttribute("width", "50px");
                imgElement.setAttribute("height", "50px");
                imgElement.setAttribute("src", "img/" + gallaryno +"/" + text_value + ".png");
                imgElement.setAttribute("onclick", "flipimg(" + index + ")");
                tdElement[index].appendChild(imgElement);
                arr_game[index] = "img/" + gallaryno + "/" + text_value + ".png";     
                countadd++;
                //if ((countadd - countmin == rr) || (countadd - countmin == -rr)) {
                //    count = index;    // end game depend on number of move and number of change images
                //    result();
                //}
                event.preventDefault();
                $('input').first().focus();
            }
            else {
                event.preventDefault();
            }
        }
    }
};//end of flip

function checkarr(arr) {   //  array to check not equal for match
    for (var i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])) {
            return false;
        }
    }
    return true;
}

function checkequal(arr) {  //array to check equal for match
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== true) {
            return false;
        }
    }
    return true;
}

function result()
{

    // check for null if timer stop before finish game
    for (var y = 0; y < arr_game.length; y++) {
        if (arr_game[y] == null) {
            flagarr = true;
            break;
        }
    }


    var divElmresult = document.getElementsByTagName("div")[2];
    var divPlayGrid = document.getElementsByTagName("div")[1];
    var spanElmresult = document.getElementsByTagName("span")[1];
    var UlElmresult = document.getElementsByTagName("ul")[0];

    if (flagarr == false) {
        stop_timer();
        // result check row
        var tryarr = [];
        var arrcol = [];
        var arrmatrix = [];
        var xx = 0;
        var tt = 0;
        var vv = 0;
        var yyy = 0;
        // result check col 

        for (var v = 0; v < s; v++) {  // s number of grid 4 or 9
            xx = 0;
            vv += s;  
            tryarr = arr_game.slice(vv-s, vv); 
            flagResultrow[v] = checkarr(tryarr); // check row values equal or not
            
            for (var x = v; x < s * s + v; x += s) { 
                arrcol[xx] = arr_game[x];  // array of row
                xx++;
            }

            flagResultcol[v] = checkarr(arrcol); // check col values equal or not

        }

        ggg = 0;
        fl = false;
        // check 2*2  or 3*3
        for (var f = 0; f < s*h; f += h) {
            if (f > h){
                f += s;    // numb or grid 4 or 9
                fl = true;
                hm = s * s; // variable for inner for
            }
            else{
                hm = h * s;  
            }
            yyy = 0;
            for (var g = f; g < hm; g += s) {
                arrmatrix[yyy] = arr_game[g];
                yyy++;   // count to get cell and next cell in array for match matrix 2*2 or 3*3
                arrmatrix[yyy] = arr_game[g + 1]
                yyy++;
                if (s == 9){
                    arrmatrix[yyy] = arr_game[g + 2]
                    yyy++;
                }
            }
            flagResult[ggg] = checkarr(arrmatrix);
            ggg++;
            if (fl == true){
                f -= s;
            }
        }

        resultrow = checkequal(flagResultrow);   // result of equal for row
        resultcol = checkequal(flagResultcol); // result of equal for col
        resultmatrix = checkequal(flagResult); // result of equal for matrix

        // display div of result and hide other div
        divElm = document.getElementsByTagName("div");
        ulElm2 = document.getElementsByTagName("ul")[0];
        ulElm2.style= "display:none";
        for (var u = 0; u < divElm.length - 1; u++) {
            divElm[u].style = "display:none";
        }

        if (resultcol == true && resultrow == true && resultmatrix == true) {
            divPlayGrid.style = "display:none";
            UlElmresult.style = "display:none";
            divElmresult.style = "display:block";
            spanElmresult.innerText = "you win";
         
        }
        else {
            divPlayGrid.style = "display:none";
            UlElmresult.style = "display:none";
            divElmresult.style = "display:block";
            spanElmresult.innerText = "Game Over";           
        }
    }
    else {
        flagarr = false;
        divPlayGrid.style = "display:none";
        UlElmresult.style = "display:none";
        divElmresult.style = "display:block";
        spanElmresult.innerText = "Time Out Game Over";
    }

}


window.addEventListener("load", function () {
    // get player name from querystring and display welcome
    var qur_str = window.location.search;
    qur_str = qur_str.substring(1);
    qur = qur_str.split('&');
    var nameplayer = qur[1].split('=')[1];
    var nameplay = document.getElementsByTagName("span")[0];
    nameplay.innerText = "Welcome    " + nameplayer;
    var divresult;
    var messageRusltplay = document.getElementsByTagName("button")[0];
    messageRusltplay.onclick = function () {
        window.location.reload();
    };
    var messageRusltexit = document.getElementsByTagName("button")[1];
    messageRusltexit.onclick = function () {
        window.location = '/MainPage.html';
    };
   
});
 
$(function () {   // move on grid by arrow
    $('input').keyup(function (e) {
        $('input').first().focus();
        if (e.which == 39) {
            $(this).closest('td').next().find('input').focus();
        }
        else if (e.which == 37)
            $(this).closest('td').prev().find('input').focus();
        else if (e.which == 40)
            $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
        else if (e.which == 38)
            $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
    });
});