
function gallarynumb(no)
{
    var nameplayer;
    var levelplayer;
    var gallaryno;
    gallaryno = no;
    var qur_str = window.location.search;
    qur_str = qur_str.substring(1);
    qur = qur_str.split('&');
    levelplayer = qur[0].split('=')[1];
    nameplayer = qur[1].split('=')[1];
    if (levelplayer == '1') {
        window.location = '/SUDOKU.html?gallaryno=' + gallaryno + '&name=' + nameplayer + '&level=' + levelplayer;
    }
    else if (levelplayer == '2') {
        window.location = '/SUDOKU_LEVEL2.html?gallaryno=' + gallaryno + '&name=' + nameplayer + '&level=' + levelplayer;
    }
}

window.addEventListener("load", function () {
    var ulElm = document.getElementsByTagName("ul")[0];
    ulElm.onclick=function () {
        gallarynumb(2)
    };   
});

window.addEventListener("load", function () {
    var ulElm1 = document.getElementsByTagName("ul")[1];
    ulElm1.onclick = function () {
        gallarynumb(3)
    };
});

window.addEventListener("load", function () {
    var ulElm2 = document.getElementsByTagName("ul")[2];
    ulElm2.onclick = function () {
        gallarynumb(1)
    };
});

window.addEventListener("load", function () {
    var ulElm3 = document.getElementsByTagName("ul")[3];
    ulElm3.onclick = function () {
        gallarynumb(4)
    };
});