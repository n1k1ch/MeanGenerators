'use strict';

describe('Controller: InterviewReportCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackDemoApp'));
  beforeEach(module('socketMock'));

  var InterviewReportCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InterviewReportCtrl = $controller('InterviewReportCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
