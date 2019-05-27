angular.module('PlacesService', [])

  .factory('PlacesService', function ($http, SettingFactory) {
    var places = [{
      id: 0,
      name: 'Berlin',
      latitude: '52.520008',
      longitude: '13.404954',
      selected: false
    }, {
      id: 1,
      name: 'Paris',
      latitude: '48.856613',
      longitude: '2.352222',
      selected: false
    }, {
      id: 2,
      name: 'Amsterdam',
      latitude: '52.370216',
      longitude: '4.895168',
      selected: false
    }, {
      id: 3,
      name: 'Barcelona',
      latitude: '41.385063',
      longitude: '2.173404',
      selected: false
    }];

    return {
      all: function () {
        return places;
      },
      placesWeather: function () {
        var baseUrl = "http://localhost:8080/weathers";
        var placesData = [];

        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          (function (places) {
            var setting = SettingFactory.getSetting();
            var dailyUrl = baseUrl + "/daily?latitude=" + place.latitude + "&longitude=" + place.longitude + "&lang=" + setting.abbr;
            $http.get(dailyUrl).then(function (response) {
              var pushedObject = {
                data: response.data.daily.data[0],
                place: places,
                icon: response.data.daily.iconToShow
              };
              placesData.push(pushedObject);
            });
          }(place));
        }
        return placesData;
      },
      dailyWeather: function () {
        var dailyUrl = baseUrl + "/daily";
        var setting = SettingFactory.getSetting();
        return $http.get(dailyUrl).then(function (response) {
          return response.data.daily.data;
        });
      },
    };
  });
