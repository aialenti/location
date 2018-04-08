import * as $ from 'jquery';
import * as dc_leaflet from 'dc.leaflet'
import dc from 'dc'
import d3 from 'd3'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default (function () {
    if ($('#leaflet-map').length > 0) {

        d3.tsv("/assets/static/data/demo1.tsv", function (data) {
            var xf = crossfilter(data);
            var groupname = "marker-select";
            var facilities = xf.dimension(function (d) { return d.geo; });
            var facilitiesGroup = facilities.group().reduceCount();

            var greenIcon = L.icon({
                iconUrl: '/assets/static/images/leaf-green.png',
                shadowUrl: '/assets/static/images/leaf-shadow.png',

                iconSize: [38, 95], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            var mapChart = dc_leaflet.markerChart("#leaflet-map", groupname)
                .dimension(facilities)
                .group(facilitiesGroup)
                .center([54.4924964, -6.4493525])
                .zoom(6)
                .renderPopup(true)
                .popup(function (d, marker) {
                    return d.key + " : " + d.value;
                });

            mapChart.icon((d, map) => {
                return L.icon({
                    iconUrl: '/assets/static/images/leaf-green.png',
                    shadowUrl: '/assets/static/images/leaf-shadow.png',

                    iconSize: [38, 95], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
            })
            dc.renderAll(groupname);

            mapChart.map().zoomControl.setPosition('bottomright');


        });


        $('#omnibox-layers').click(() => {
            var open = false;
            if ($('#sidebar-layers').hasClass('open')) {
                open = true;
            }
            $(".sidebar").animate({
                left: "-300"
            }, 250, function () {
                // Animation complete.
            });
            $('.sidebar').removeClass('open')
            if (!open) {
                $("#sidebar-layers").animate({
                    left: "0"
                }, 250, function () {
                    // Animation complete.
                });
                $('#sidebar-layers').addClass('open')
            } else {

            }
        });

        $('#omnibox-filters').click(() => {
            var open = false;
            if ($('#sidebar-filters').hasClass('open')) {
                open = true;
            }
            $(".sidebar").animate({
                left: "-300"
            }, 250, function () {
                // Animation complete.
            });
            $('.sidebar').removeClass('open')
            if (!open) {
                $("#sidebar-filters").animate({
                    left: "0"
                }, 250, function () {
                    // Animation complete.
                });
                $('#sidebar-filters').addClass('open')
            } else {
            }
        })
    }

}())
