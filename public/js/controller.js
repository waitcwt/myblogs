  define(function(require,exports,module){
	var controller = {};
	//导航条的controller
	controller.headerController = function($scope,$location,$location){
		var tabs =$scope.tabs = [{"name":'Home',"url":'#/',"mark":'index'},{"name":'MyPhoneList',"url":'#phone',"mark":'phone'},{"name":'MyImages',"url":'#imgs',"mark":'img'},{"name":'others',"url":'#other',"mark":'other'}];
		function getActive(mark){
		  angular.forEach(tabs, function(tab,key) {
			  if(tab.mark==mark){tab.isactive = "active"}
			  else{
			   tab.isactive = "false";		
			  }
		  });
		}
		$scope.clk = function(mark){
			getActive(mark);
		}		
		//getActive(0);
		var url = $location.$$url.match(/(\w+)/);	
		url ? getActive(url[0]):getActive('index');
	}
	//首页的controller
	controller.indexController = function($scope,Files){
		function getpage(num){
			Files.getFiles(num).success(function(data){
				 $scope.content=data.files.main;
				 $scope.isshow="inline-block";
				if($scope.page*2+$scope.content.length>=data.files.total){
					$scope.isshow = $scope.page==0 ? "xx" :'none';
				}				
				 $scope.total = Math.ceil(data.files.total/2);
		});
		}
		$scope.page = 0;
		$scope.gopage=function(num){
			 num==1 ? $scope.page++ : $scope.page--;
			getpage($scope.page);
		}
		getpage(0);
	}
	//二级页的controller
	controller.detailController = function($scope,Files,$location,$routeParams){
		var dataid = $routeParams.dataId;
		$scope.file={};
		Files.getFile(dataid).success(function(data){
			$scope.file = data.file;
		})
		$scope.edit=function(){
			$scope.ison="edit"
		}
		$scope.cancel=function(){
			$scope.ison="false"
		}
		$scope.save=function(){
		     Files.putFile(dataid,$scope.file).success(function(data){
			 $scope.ison="false";
		  })		
		}
		$scope.del=function(){
			Files.delFile(dataid).success(function(data){
				$location.url('/#index');
			  })		

		}
		$scope.ison="false";
	}

	//phone 的controller
	controller.PhoneController = function($scope,$location,$timeout, $routeParams, $firebase, fbURL,phoneBooks){
		$scope.phonebooks = phoneBooks;	
		//phone 里面editBook
		 var projectUrl = fbURL + $routeParams.bookId;
		  $scope.book = $firebase(new Firebase(projectUrl));   
		  $scope.destroy = function() {
			$scope.book.$remove();
			$location.path('/phone');
		  }; 
		  $scope.save = function() {
			$scope.book.$save();
			$location.path('/phone');
		  };
		  
	},
	//img 的controller
	controller.ImgController = function($scope,Imgs){
		//数据存成js文件，便于读写
		Imgs.getImgs().success(function(data){
			$scope.data = data.imgs;
		});
		$scope.enter = function(num){
			var li = document.querySelectorAll('.li');
			var div =li[num].querySelector('.front');
			var end =li[num].querySelector('.end');
			div.className='flip';
			timer = setTimeout(function(){
			div.className='front'; div.style.display="none"; end.style.display="block"},500);
		}
		$scope.leave=function(num){
			var li = document.querySelectorAll('.li');
			var div =li[num].querySelector('.front');
			var end =li[num].querySelector('.end');
			end.className='flip';
			setTimeout(function(){
			end.className='end'; end.style.display="none"; div.style.display="block"},500);
		}
		
	},
	//other 的controller
	controller.otherController = function($scope){
		$scope.lists = [{"title":"A-tab","content":"this is a tab"},{"title":"B-tab","content":"this is b tab"},{"title":"C-tab","content":"this is c tab"}];

	},
	//phone 里面addBook
	controller.addController = function($scope,$location,$timeout,phoneBooks){
		$scope.save = function() {
		  phoneBooks.$add($scope.book, function() {
			$timeout(function() { $location.path('/phone'); });
		  });
		};
	}
	
    module.exports = controller;
  });