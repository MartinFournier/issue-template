(function() {
  var app = angular.module('it', ['ngRoute', 'firebase']);

  app.constant('Firebase', Firebase);
  app.constant('_', _);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './app/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/new-template', {
        templateUrl: './app/templates/template.html',
        controller: 'TemplateCtrl',
        resolve: {
          template: function() {
            return {
              name: '',
              owner: '',
              repo: '',
              template: '',
              fields: [
                {
                  name: '',
                  element: '',
                  type: '',
                  value: ''
                }
              ]
            }
          },
          mode: function() {
            return 'new';
          }
        }
      })
      .when('/:owner/:repo/:name/edit', {
        templateUrl: './app/templates/template.html',
        controller: 'TemplateCtrl',
        resolve: {
          template: function($q, util, TemplateService, $route) {
            var routeParams = $route.current.params;
            return util.getDataSnapshot($q, TemplateService, TemplateService.getTemplate, {
              name: routeParams.name,
              owner: routeParams.owner,
              repo: routeParams.repo
            });
          },
          mode: function() {
            return 'edit';
          }
        }
      })
      .when('/search', {
        templateUrl: './app/search/search-templates.html',
        controller: 'SearchTemplatesCtrl',
        resolve: {
          owners: function($q, util, TemplateService) {
            return util.getDataSnapshot($q, TemplateService, TemplateService.getAllTemplates);
          }
        }
      })
      .when('/:owner/:repo/:name', {
        templateUrl: './app/new-issue/new-issue.html',
        controller: 'NewIssueCtrl',
        resolve: {
          fields: function($q, util, TemplateService, $route) {
            var routeParams = $route.current.params;
            return util.getDataSnapshot($q, TemplateService, TemplateService.getTemplateFields, {
              name: routeParams.name,
              owner: routeParams.owner,
              repo: routeParams.repo
            });
          }
        }
      })
      .otherwise('/');
  });
})();