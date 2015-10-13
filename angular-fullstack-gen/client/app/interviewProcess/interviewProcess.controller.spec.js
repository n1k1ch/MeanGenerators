'use strict';

describe('Controller: InterviewProcessCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackDemoApp'));
  beforeEach(module('socketMock'));

  var InterviewProcessCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InterviewProcessCtrl = $controller('InterviewProcessCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
