let gData;
const addDataToMap = () => {
    var mapdata = {};
    $.each(gData, function(code, val) {
        mapdata[code] = {"value": val.cases, "tooltip": {
            "content": "<span style=\"font-weight:bold;\">" + val.en + "</span><br />Cases : "+ val.cases
        }}
    });
    $(".mapcontainer").mapael({
        map : {
            name : "world_countries",
            defaultArea: {
                attrs: {
                    cursor: "pointer"
                },
                text: {
                    attrs: {
                        cursor: "pointer",
                        "font-size": 10
                    }
                }
            }
        },
        areas: mapdata
});

}

$(function () {
    $.getJSON("data/basic-data.json", function(data) {
        gData = data;
        addDataToMap();
        });    
});