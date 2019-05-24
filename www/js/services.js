angular.module('starter.services', [])

  .factory('SettingFactory', function () {

    var setting = {
      abbr: 'en',
        language: 'English'
    };
    return {
      getSetting: function () {
        return setting;

      },
      setSetting: function (newSetting) {
        setting = newSetting;
      }
    };
  })

  .factory('PlaceFactory', function () {
    var place = {
      id: 0,
      name: 'Berlin',
      latitude: '52.520008',
      longitude: '13.404954'
    };
    return {
      getPlace: function () {
        return place;

      },
      setPlace: function (newPlace) {
        place = newPlace;
      }
    };
  })

  .factory('Weathers', function ($http, SettingFactory, PlaceFactory) {
    var place = PlaceFactory.getPlace();
    var setting = SettingFactory.getSetting();
    var baseUrl = "http://localhost:8080/weathers" ;
    return {
      dailyWeather: function () {
        var dailyUrl = baseUrl + "/daily?latitude=" + place.latitude + "&longitude=" + place.longitude + "&lang=" + setting.abbr;
        return $http.get(dailyUrl).then(function (response) {
          return response.data;
        });
      },
      hourlyWeather: function () {
        var hourlyUrl = baseUrl + "/hourly?latitude=" + place.latitude + "&longitude=" + place.longitude + "&lang=" + setting.abbr;
        return $http.get(hourlyUrl).then(function (response) {
          return response.data;
        });
      }
    };
  })

  .factory('Places', function ($http, SettingFactory) {
    var places = [{
      id: 0,
      name: 'Berlin',
      latitude: '52.520008',
      longitude: '13.404954'
    }, {
      id: 1,
      name: 'Paris',
      latitude: '48.856613',
      longitude: '2.352222'
    }, {
      id: 2,
      name: 'Amsterdam',
      latitude: '52.370216',
      longitude: '4.895168'
    }, {
      id: 3,
      name: 'Barcelona',
      latitude: '41.385063',
      longitude: '2.173404'
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
  })

  .factory('Languages', function ($http) {
    var baseUrl = "http://localhost:8080/languages";
    return {
      all: function () {
        return $http.get(baseUrl).then(function (response) {
          return response.data;
        });
      }
    };
  });
