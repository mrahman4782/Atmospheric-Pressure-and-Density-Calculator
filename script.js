var aconv = 0;
var tconv = 0;
var pconv = 0;
var newdens = 0;
var newa = 0;
var newt = 0;
const alttxt = document.querySelector('#alttxt');
const temptxt = document.querySelector('#temptxt');
const presstxt = document.querySelector('#presstxt');
const denstxt = document.querySelector('#denstxt');


function densityCalculate() {
    if (presstxt != 0) {
        if (newt != 0) {
            newdens = pconv / (.2869 * (newt + 273.1));
            properDisplay();
        }
        else {
            newdens = pconv / (.2869 * (tconv + 273.1));
            properDisplay();
        }
        // Calculates density
    }
}

function calculations() {

    if (aconv < 11000) {
        newt = 15.04 - (0.00649 * aconv);
        console.log(newt);
        pconv = Math.pow(((newt + 273.1) / 288.08), 5.256)*101.29;
        
    }
    if (aconv <= 25000 && aconv >= 11000) {
        newt = -56.46;
        pconv = Math.exp(1.73 - (0.000157 * aconv)) * 22.65;
        
    }
    if (aconv > 25000) {
        newt = (0.00299 * aconv) - 131.21;
        pconv = Math.pow(((newt + 273.1) / 216.6), -11.388)*2.488;
        
    }
    // Main calculations for pressureCalculate()
}

function pressureCalculate() {
    if (alttxt.value != "" && temptxt.value == "") {
        calculations();
    }
    // Calculates pressure when altitude values are entered

    if (alttxt.value == "" && temptxt.value != "") {
        if (atmoslayer.options[atmoslayer.selectedIndex].text == "Upper Stratosphere") {
            aconv = (131.21 - -tconv)/0.00299;
            newa = aconv;
            calculations();
            properDisplay();
        }
        if (atmoslayer.options[atmoslayer.selectedIndex].text == "Troposphere") {
            aconv = (tconv - 15.04) / -.00649;
            newa = aconv;
            calculations();
            properDisplay();
        }
    }
    // Calculates pressure when temperature and atomospheric layers are entered
}

function properDisplay() {
    if (alttxt.value != "" && temptxt.value == "") {
        if (tempchoices.options[tempchoices.selectedIndex].text == "°C") {
            temptxt.value = newt;
        }
        if (tempchoices.options[tempchoices.selectedIndex].text == "°F") {
            temptxt.value = (newt * (9 / 5)) + 32;
        }
        if (tempchoices.options[tempchoices.selectedIndex].text == "K") {
            temptxt.value = newt + 273.15;
        }
        if (aconv < 11000) {
            atmoslayer.options[atmoslayer.selectedIndex].text = "Troposphere"
        }
        if (aconv > 25000) {
            atmoslayer.options[atmoslayer.selectedIndex].text = "Upper Stratosphere"
        }
        // Displays the temperature value and atmospheric layer when given altitude
    }
    if (alttxt.value != "" && temptxt.value != "") {
        if (presschoices.options[presschoices.selectedIndex].text == "kPa") {
            presstxt.value = pconv; 
        }
        if (presschoices.options[presschoices.selectedIndex].text == "mm Hg") {
            presstxt.value = pconv * 7.501;
        }
        if (presschoices.options[presschoices.selectedIndex].text == "atm") {
            presstxt.value = pconv / 101;
        }
        if (presschoices.options[presschoices.selectedIndex].text == "psi") {
            presstxt.value = pconv / 6.895;
        }
        // Displays the pressure value according to the desired units
    }
    if (alttxt.value == "" && temptxt.value != "") {
        if (altichoices.options[altichoices.selectedIndex].text == "m") {
            alttxt.value = newa;
        }
        if (altichoices.options[altichoices.selectedIndex].text == "ft.") {
            alttxt.value = newa * 3.281;
        }
        // Displays the altitude if given the temperature value and atmospheric layer
    }
    if (presstxt != 0) {
        if (denschoices.options[denschoices.selectedIndex].text == "kg/m³") {
            denstxt.value = newdens;
        }
        if (denschoices.options[denschoices.selectedIndex].text == "kg/L") {
            denstxt.value = newdens / 1000;
        }
        if (denschoices.options[denschoices.selectedIndex].text == "t/m³") {
            denstxt.value = newdens / 1000;
        }
        // Displays the density value according to the desired units
    }


}

function convertUnits() {
    
    if (altichoices.options[altichoices.selectedIndex].text == "m") {
        aconv = alttxt.value;
    }
    if (altichoices.options[altichoices.selectedIndex].text == "ft.") {
        aconv = alttxt.value / 3.281;
    }
    if (tempchoices.options[tempchoices.selectedIndex].text == "°C") {
        tconv = temptxt.value;
    }
    if (tempchoices.options[tempchoices.selectedIndex].text == "K") {
        tconv = temptxt.value - 273.15;
    }
    if (tempchoices.options[tempchoices.selectedIndex].text == "°F") {
        tconv = (temptxt.value - 32) * (5 / 9);
    }
    // Converts the input units for Altimeter and Temperature into easy-to-use metric units
   
}

function inputBlock() {
    if (alttxt.value == "" && temptxt.value == "") {
        temptxt.readOnly = false;
        alttxt.readOnly = false;
        return;
    }
    else if (alttxt.value == "") {
        temptxt.readOnly = false;
        alttxt.readOnly = true;
    }
    else if (temptxt.value == ""){
        alttxt.readOnly = false;
        temptxt.readOnly = true;
    }
    // Prevents user from making more than one input
}
function resetData() {
    temptxt.value = "";
    alttxt.value = "";
    presstxt.value = "";
    denstxt.value = "";
    aconv = 0;
    tconv = 0;
    pconv = 0;
    newdens;
    newa = 0;
    newt = 0;
    // Resets all input & output fields
    
}