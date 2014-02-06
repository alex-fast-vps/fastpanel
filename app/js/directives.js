'use strict';

/* Directives */


angular.module('fastPanel.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

app.directive('fpConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.fpConfirmClick || "Are you sure?";
                    var clickAction = attr.fpOnConfirm;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction);
                        }
                    });
                }
            };
    }])
