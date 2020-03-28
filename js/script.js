function init() {
    var mapdata = {};
    var unfound = []
    $.each(countries, function(code, val) {
        if (cases_global[val.en]) {
            var data = cases_global[val.en]["data"];
            mapdata[code] = {"value": data[data.length-1], "en": val.en, "jp": val.jp};
        } else {
            unfound.push(code);
            mapdata[code] = {"value": 0, "en": val.en, "jp": val.jp };
        }
    });
    $(".mapcontainer-world").mapael({
        map : {
            name : "world_countries",
            zoom: {
                enabled: true
            },
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
                        console.log(id);
                        var countryName = elemOptions.en;
                        $('#countryName').html(countryName);
                        if (unfound.includes(id)) {
                            $('#cases').html("Cases: 0");
                            $('#deaths').html("Deaths: 0");
                            $('#recovered').html("Recovered: 0");
                            $('#videos').empty(); // need to clear out previous links
                            var charts = ['chart-cases', 'chart-deaths', 'chart-recovered'];
                            $.each(charts, function(index, chart) {
                                var canvas = document.getElementById(chart);
                                var ctx = canvas.getContext('2d');
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                            });
                        } else {        
                            var chart_names = ['chart-cases', 'chart-deaths', 'chart-recovered'];
                            var labels = ['Confirmed Cases', "Deaths", "Recovered"]
                            var datasets = [cases_global[countryName], deaths_global[countryName], recovered_global[countryName]];
                            var doms = ["#cases", "#deaths", "#recovered"];
                            $.each(chart_names, function(index, chart_name) {
                                var data = datasets[index]["data"];
                                $(doms[index]).html(labels[index] + " : " + data[data.length -1]);
                                var ctx = document.getElementById(chart_name).getContext('2d');
                                var chart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels: datasets[index]["dates"],
                                        datasets: [{
                                            label: labels[index],
                                            borderColor: 'rgb(255, 99, 132)',
                                            data: data
                                        }]
                                    },
                                    options: {
                                        scales: {
                                            xAxes: [{
                                                type: 'time', 
                                                time: {
                                                    unit: 'day'
                                                }
                                            }]
                                        },
                                        legend: {
                                            display: false
                                        }
                                    }
                                })
                            });
                            $('#videos').empty(); // need to clear out previous links
                            if (country_videos[id]) {
                                $.each(country_videos[id], function(index, value) {
                                    var ytVideo = $("<iframe/>");
                                    ytVideo.attr({      
                                        src: value,
                                        frameborder: 0,
                                        margin: "auto",
                                        width: 300
                                    });
                                    $('#videos').append(ytVideo);
                                })
                            }
                        }
                    }
                }
            }
        },
        legend : {
            area: {
                display: true,
                title: "Confirmed cases",
                mode: "vertical",
                titleAttrs: {
                    fill: "#fafafa",
                },
                labelAttrs: {
                    fill: "#fafafa",
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