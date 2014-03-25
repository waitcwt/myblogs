 define(function(require,exports,module){
// tabs = angular.module('tabs',[]).directive('tabset',function(){
	directive={};
	directive.tabset=function(){
		return {
			restrict : 'E',
			transclude : true,
			priority:100,
            scope:{},
			controller:function otherCtrl($scope){
				var lists= $scope.lists = [] ;
				this.addtab = function(list){
				lists.push(list);
				if(lists.length==1){
					list.active = true;
					}
				}
				this.select =function(selecttab){
					angular.forEach(lists, function(list) {
				     list.active = false;
				
 				   });
				   selecttab.active =true;
				};
			},
			template:'<div><ul ng-transclude  class="nav nav-tabs"></ul><div class="panel"><div class="tabp" tab-content-transclude="list" ng-repeat="list in lists" ng-class="{active:list.active}">{{list.list.content}}</div></div></div>',
			replace:true
			
		}
	}
	directive.tab=function(){
		return {
			require:'^tabset',
			restrict : 'E',
			replace:true,
			transclude : true,
			template:'<li ng-class="{active:active}" ng-click="select()"><a href="javascript:;">{{list.title}}</a></li>',
			compile: function(elm, attrs, transclude) {
                  return function postLink(scope, elm, attrs, otherCtrl) {
					otherCtrl.addtab(scope);
					scope.$watch('active',function(active){
						if(active){
							otherCtrl.select(scope);
						}
					});
					scope.select=function(){
						scope.active=true;
					}
				  }
				 
			}
		}
	};
	module.exports = directive;
});
