angular.module('SettingFactory', [])

  .factory('SettingFactory', function ($rootScope) {

    var setting = {
      abbr: 'en',
      language: 'English'
    };
    var city = {
      id: 0,
      name: 'Berlin',
      latitude: '52.520008',
      longitude: '13.404954'
    };

    return {
      getSetting: function () {
        return setting;

      },
      setSetting: function (newSetting) {
        setting = newSetting;
        $rootScope.$broadcast('settings-changed');
      },
      getCity: function () {
        return city;

      },
      setCity: function (newCity) {
        city = newCity;
        $rootScope.$broadcast('settings-changed');
      }
    };
  });
