// MUST TRY TO GET ESQID FROM URL IN CASE OF UPDATED INFO
var esqID = ""
var url = 'http://localhost:5001/api';
//PATHS
var paths = {
    "rawM": "/rawM",
    "aux": "/aux",
    "Products": "/Products",
    "HazardousMaterials": "/HazardousMaterials",
    "Fuels": "/Fuels",
    "AirEmissionsPointSources": "/AirEmissionsPointSources",
    "FugitiveAirEmissions": "/FugitiveAirEmissions",
    "WaterConsumption": "/WaterConsumption",
    "EffluentWastewater": "/EffluentWastewater",
    "SolidLiquidWaste": "/SolidLiquidWaste",
    "Noise": "/Noise",
    "Flare": "/Flare",
    "Incinerator": "/Incinerator",
    "LoadUnload": "/LoadUnload",
    "DredgingOperations": "/DredgingOperations",
    "OtherInformation": "/OtherInformation",
}
onClickSubmit()
//Get next btn
// btn = document.getElementById("Next")
// btn.addEventListener('click', function () {
//     onClickSubmit()
// })
function onClickSubmit() {
    try {
        data = new FormData(document.getElementById("Env"))
        if (esqID === "")
            esqID = postData(url + "/EnvForm", data);
        else
            updateData(url + "/EnvForm", data)
    } catch{
        console.log("There was an error setting up your request, please try again later")
        return;
    }

    for (var key in paths) {
        path = url + paths[key]
        try {
            data = new FormData(document.getElementById(key + "Form"))
            jsonData = setupArrayData(data, key)
            console.log(jsonData)
            postData(path, data, 1)
        }
        catch{
            console.log(`failed submit ${path} where`)
            // console.log(`Form = ${key}Form`)
            // console.log(`Controller = ${paths[key]}`)
        }
    }
}

//JSON OBJECT SETUP
function setupArrayData(data, objName) {
    //ADD ESQID
    var tempArr = []
    var temp = new Object()
    for (var [key, value] of data.entries()) {
        if (key == "empty") {
            tempArr.push(temp)
            temp = new Object()
        }
        temp[key] = value
        console.log(key, value)
    }
    return jsonData = { [objName]: tempArr }
    // console.log(jsonData)
}

//SEND REQUEST BLOCK
function postData(path, body, asyncFlag) {
    var response = ""
    var xhr = new XMLHttpRequest();
    xhr.open("post", path, asyncFlag)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300)
            console.log("success")
        else
            console.log("fail")
        // response = xhr.responseText
        // console.log(this.responseText)

    }
    xhr.send(JSON.stringify(body))
    // console.log(xhr.responseText)
    return xhr.responseText
}

//SUBMIT ARRAY OF OBJECTS TEST
// document.getElementById("submit").addEventListener('click', function(){



// var paths = {
//     env : "/EnvForm",
//     rawMaterials : "/rawM",
//     aux : "/aux",
//     products : "/Products",
//     hazards : "/HazardousMaterials",
//     fuels : "/Fuels",
//     air : "/AirEmissionsPointSources",
//     fugAir : "/FugitiveAirEmissions",
//     water : "/WaterConsumption",
//     effluent : "/EffluentWastewater",
//     solid : "/SolidLiquidWaste",
//     noise : "/Noise",
//     flare : "/Flare",
//     incinerator : "/Incinerator",
//     load : "/LoadUnload",
//     dredge : "/DredgingOperations",
//     other : "/OtherInformation", 
// }