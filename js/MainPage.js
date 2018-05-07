function checkvalue()
{
    txt_name = document.getElementsByTagName("input")[0].value;
    if (txt_name == "") {
        return false;
    }
    else {
        return true;
    }
}

function gotoGallary(level) {
    txt_name = document.getElementsByTagName("input")[0];
    fld = checkvalue();
    if (fld == false) {
        uname.style.display = "inline";
        //window.location = '/MainPage.html';
    }
    else {
        name = document.getElementsByTagName("input")[0].value;
        window.location = '/Gallary.html?level=' + level + '&name=' + name;
    }


}


window.addEventListener("load", function () {
    txt_name = document.getElementsByTagName("input")[0];
    txt_name.onfocus = function () {
        uname.style.display = "none";
    }
}); 