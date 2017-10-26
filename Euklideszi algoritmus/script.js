var scalingFactor;

function displayGCF() {
    var firstNum = $("#firstNum");
    var secondNum = $("#secondNum");
    var minVal, maxVal, currWidth;
    var gcf;

    if (! valuesAreValid()) {
        alert("Csak egész számokat adhatsz meg!");
        return;
    }

    clearReportData();

    minVal = Math.min(firstNum.val(), secondNum.val());
    maxVal = Math.max(firstNum.val(), secondNum.val());
    currWidth = Math.min(600, $("#container").width());
    scalingFactor = currWidth / maxVal;

    createTheGridDiv(minVal, maxVal);
    gcf = calculateGCF(minVal, maxVal);

    addTiles(gcf * scalingFactor);
    $("#gcf").css("display","block").html("Legnagyobb közös osztó: " + gcf);
}

/**
Egész számokat adj meg!
*/
function valuesAreValid() {
    var firstVal = Number($("#firstNum").val());
    var secondVal = Number($("#secondNum").val());

    if (isNaN(firstVal) || isNaN(secondVal)) {
        return false;
    }
    return (firstVal > 0 && 
            Number.isInteger(firstVal) && 
            secondVal > 0 && 
            Number.isInteger(secondVal));
}

function calculateGCF(minVal, maxVal) {

    var oldMaxVal, scratchVal;

    while ((maxVal % minVal) !== 0) {
        scratchVal = maxVal % minVal;
        oldMaxVal = maxVal;
        maxVal = minVal;
        minVal = scratchVal;
        showCalc(oldMaxVal, maxVal);
    }
    showCalc(maxVal, minVal);

    return minVal;
}

function createTheGridDiv(minVal, maxVal) {

    var diagram = $("#diagram");

    if ($("#showMe").is(':checked')) {
        diagram.width(maxVal * scalingFactor);
        diagram.height(minVal * scalingFactor);
        diagram.css("display","block");
    } else {
        diagram.css("display","none");
    }
}

function addTiles(finalGcf) {

    if ( ! $("#showMe").is(':checked')) {
        return;
    }

    var divs = $("#diagram div");
    var compColor;
    var numInnerTiles;

    divs.each(function(ndx, elem) {

        compColor = elem.getAttribute("data-color-complement");
        numInnerTiles = Math.pow(Math.round(elem.clientHeight / finalGcf), 2);

        for (var i=0; i<numInnerTiles; i++) {
            elem.innerHTML += "<div style=\"" +
                                  "width:" + finalGcf + "px;" + 
                                  "height:" + finalGcf + "px;" +
                                  "outline:dashed 1px " + compColor + ";\">" + 
                              "</div>";
        }

    });
}

function showCalc(maxVal, minVal) {

    if ( ! $("#showMe").is(':checked')) {
        return;
    }

    var divDim = Math.floor(maxVal/minVal);
    var divString; 
    var randomColors = new Array(randomRgbComponent(),randomRgbComponent(),randomRgbComponent());
    var randomColor = getRgbColor(randomColors);
    var compColor;
    $("#calculation").css("display","block").append(maxVal % minVal + " a maradék az osztásnál amikor " + maxVal +  "-at/et " + minVal + "-al/el osztunk" + "<br/>");

    for (var i=0; i<3; i++) {
        randomColors[i] = 255 - randomColors[i];
    }
    compColor = getRgbColor(randomColors);
    
    for (var i=0; i<divDim; i++) {
        divString = "<div style=\"" + 
                        "width:" + (minVal*scalingFactor) + "px;" + 
                        "height:" + (minVal*scalingFactor) + "px;" +
                        "background-color:" + randomColor + ";" +
                        "outline:solid 2px " + compColor + ";" +
                    "\" " +
                    "data-color-complement=\"" + compColor + "\">" + 
                    "</div>";
        $("#diagram").append(divString);
    }
}


function getRgbColor(components) {
    return "rgb(" + components[0] + "," + components[1] + "," + components[2] + ")";
}

function randomRgbComponent() {
    return Math.floor(Math.random() * (255 - 0));
}

function clearReportData() {
    $("#gcf").html("");
    $("#calculation").html("");
    $("#diagram").html("");
}

window.onload = function () {
    document.getElementById("submit").onclick = function () {
        displayGCF();
    };
};