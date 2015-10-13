'use strict';

describe('Controller: AddQuestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackDemoApp'));
  beforeEach(module('socketMock'));

  var AddQuestionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddQuestionsCtrl = $controller('AddQuestionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
