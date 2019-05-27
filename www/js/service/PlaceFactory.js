angular.module('PlaceFactory', [])

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
  });
