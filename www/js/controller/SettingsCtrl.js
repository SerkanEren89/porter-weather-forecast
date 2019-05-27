angular.module('SettingsCtrl', [])
  .controller('SettingsCtrl', function ($scope, LanguagesService, SettingFactory) {
    var selectedSettings = SettingFactory.getSetting();
    function changeSelection(result, selectedSettings) {
      for (var index = 0; index < result.length; ++index) {
        result[index].selected = selectedSettings.abbr === result[index].abbr;
      }
    }

    $scope.settings = LanguagesService.all().then(function (result) {
      changeSelection(result, selectedSettings);
      $scope.settings = result;
    });

    $scope.selectLanguage = function (setting) {
      SettingFactory.setSetting(setting);
      changeSelection($scope.settings, setting)
    };
  });
