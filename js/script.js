function init() {
    var mapdata = {};
    $.each(countries, function(code, val) {
        mapdata[code] = {"value": val.cases, "en": val.en, "jp": val.jp, "cases": val.cases, "deaths": val.deaths};
    });
    $(".mapcontainer-world").mapael({
        map : {
            name : "world_countries",
            defaultArea: {
                attrs: {
                    cursor: "pointer"
                },
                attrsHover: {
                    fill: "#a4e100"
                },
                text: {
                    attrs: {
                        cursor: "pointer",
                        "font-size": 10
                    }
                },
                eventHandlers: {
                    click: function (e, id, mapElem, textElem, elemOptions) {
                        $('.col-md-4 h4').html(elemOptions.en);
                        $('.col-md-4 #cases').html("Cases: " + elemOptions.cases);
                        $('#deaths').html("Deaths: " + elemOptions.deaths);
                        console.log(id);
                    }
                }
            }
        },
        legend : {
            area: {
                display: true,
                title: "Confirmed cases",
                titleAttrs: {
                    fill: "#fafafa"
                },
                labelAttrs: {
                    fill: "#fafafa"
                },
                slices : [
                    {
                        max: 10,
                        attrs: {
                            fill: "#6ECBD4"
                        },
                        label: "< 10"
                    },
                    {
                        max: 100,
                        min: 10,
                        attrs: {
                            fill: "#3EC7D4"
                        },
                        label: "10 ~ 100"
                    },
                    {
                        max: 1000,
                        min: 100,
                        attrs: {
                            fill: "#028E9B"
                        },
                        label: "100 ~ 1000"
                    },
                    {
                        min: 1000,
                        attrs: {
                            fill: "#01565E"
                        },
                        label: "> 1000"
                    }
                ]
            }
        },
        areas: mapdata
    });
}

$(function() {
    init();
});