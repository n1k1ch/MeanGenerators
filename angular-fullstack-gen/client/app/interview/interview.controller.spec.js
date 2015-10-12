'use strict';

describe('Controller: InterviewCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackDemoApp'));
  beforeEach(module('socketMock'));

  var InterviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    console.log('before each 1');
    scope = $rootScope.$new();
    console.log('before each 2');
    InterviewCtrl = $controller('InterviewCtrl', {
      $scope: scope
    });
    console.log('before each 3');
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
