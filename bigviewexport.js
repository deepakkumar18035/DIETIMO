module.exports = MainFN;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function getJson(url){
    var request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        dishinfo = JSON.parse(request.responseText);
    }
    return dishinfo;
}
function removeTags(str) {
    if ((str===null) || (str===''))
    return false;
    else
    str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}
function MainFN(foodid){
    var apiKey = "c485acc0fb4c4d0fa27af06032afc11e";
    var url = "https://api.spoonacular.com/recipes/"+foodid.toString()+"/information?includeNutrition=true&apiKey=";
    url = url + apiKey;
    dishinfo = getJson(url);
    var details = {
        "title":dishinfo["title"],
        "image":dishinfo["image"],
        "imageType":dishinfo["imageType"],
        "summary":removeTags(dishinfo["summary"]),
        "recipe":removeTags(dishinfo["instructions"]).replace(/\.+/g,'.|').replace(/\?/g,'?|').replace(/\!/g,'!|').split("|"),
        "percentCarbs":dishinfo["nutrition"]["caloricBreakdown"]["percentCarbs"],
        "percentFat":dishinfo["nutrition"]["caloricBreakdown"]["percentFat"],
        "percentProtein":dishinfo["nutrition"]["caloricBreakdown"]["percentProtein"]
    };
   return details;
}
