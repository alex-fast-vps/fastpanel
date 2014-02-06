'use strict';

/* Controllers */

angular.module('fastPanel.controllers', []).
     controller('MenuCtrl', ['$scope', '$cookieStore', '$location', function ($scope, $cookieStore, $location) {
        $scope.views = [{'title' : 'Welcome', 'hash' : '/'},
                        {'title': 'DNS manager', 'hash': '/dns/'},
                        {'title': 'Test', 'hash': '/test/'}];

        $scope.languages = ['Еnglish', 'Русский'];
/*console.log($location.path());
	var i = "";
	i = jQuery.grep($scope.views, function(e){ return e.hash == $location.path();});
	console.log(i[0].title);*/


	// on run??? 
	//$scope.views.current = jQuery.grep($scope.views, function(e){ return e.hash == $location.path();})[0].title || $scope.views[0];

        if ($cookieStore.get("language") !== undefined) {
            $scope.languages.selected = $cookieStore.get("language");
        } else {
            $scope.languages.selected = $scope.languages[0];
        }


        $scope.selectView = function (title) {
            $scope.views.current = title;
            console.log('selectView');
        };
	
	$scope.selectLanguage = function(key){
		$scope.languages.selected = key;
		$cookieStore.put("language", key);
	};			


  }])
  .controller('WelcomeCtrl', [function() {

  }])
  .controller('DnsCtrl', ['$scope','$filter', function($scope,  $filter) {


  	//on load
  	$scope.ip  =[{"value":"178.63.152.157"},{"value":"199.63.152.255"}];
  	$scope.service = [{"id":1,"enabled":true}]; //?
  	$scope.domains = [{"id":"9","name":"www.www","ip":"178.63.152.157","master":null,"last_check":null,"type":"","notified_serial":null,"account":null},{"id":"10","name":"ru.ru","ip":"199.63.152.255","master":null,"last_check":null,"type":"","notified_serial":null,"account":null}];
  	$scope.records = [{"id":"93","domain_id":"10","name":"ru.ru.","type":"MX","content":"mail.ru.ru.","ttl":"86400","prio":"10","change_date":null},{"id":"90","domain_id":"10","name":"ru.ru.","type":"NS","content":"ns2.fastvps.ru.","ttl":"86400","prio":null,"change_date":null},{"id":"89","domain_id":"10","name":"ru.ru.","type":"NS","content":"ns1.fastvps.ru.","ttl":"86400","prio":null,"change_date":null},{"id":"87","domain_id":"10","name":"ru.ru.","type":"A","content":"178.63.152.157","ttl":"86400","prio":null,"change_date":null},{"id":"86","domain_id":"10","name":"mail","type":"A","content":"178.63.152.157","ttl":"86400","prio":null,"change_date":null},{"id":"85","domain_id":"10","name":"www","type":"A","content":"178.63.152.157","ttl":"86400","prio":null,"change_date":null},{"id":"76","domain_id":"9","name":"www","type":"A","content":"178.63.152.157","ttl":"86400","prio":null,"change_date":null},{"id":"80","domain_id":"9","name":"www.www.","type":"NS","content":"ns1.fastvps.ru.","ttl":"86400","prio":null,"change_date":null},{"id":"82","domain_id":"9","name":"www.www.","type":"NS","content":"ns3.fastvps.ru.","ttl":"86400","prio":null,"change_date":null},{"id":"83","domain_id":"9","name":"www.www.","type":"NS","content":"ns4.fastvps.ru.","ttl":"86400","prio":null,"change_date":null},{"id":"84","domain_id":"9","name":"www.www.","type":"MX","content":"mail.www.www.","ttl":"86400","prio":"10","change_date":null}];
  	$scope.types = ["A", "AAAA", "NS", "MX", "SRV", "TXT", "CNAME"];


  	$scope.f = {};
	$scope.f.domain_id = -1;


	//domains
	$scope.addDomain = function(){
		console.log('add domain');
		 $scope.inserted = {
     		id: $scope.domains.length+1, //??
      		name: '',
      		ip: null
    	};
    	$scope.domains.push($scope.inserted);
	};	

	$scope.saveDomain = function($data, id){
		console.log('save domain');
	};

	$scope.removeDomain = function(index){
		console.log('remove domain');
		$scope.domains.splice(index, 1);
	};

	$scope.selectDomain = function(domain){

		//console.log('select domain' + id);
		
		$scope.f.domain_id = domain.id;
	};

	$scope.checkDomainName = function(data){
		console.log('check domain');
	};

	$scope.showIP = function(domain){
   	 var selected = [];
     if(domain.ip) {
       selected = $filter('filter')($scope.ip, {value: domain.ip});
     }
    return selected.length ? selected[0].value : 'Not set';
  };



  //records
  $scope.addRecord = function(){
    console.log('add record');
	$scope.inserted2 = {
     	id: $scope.records.length+1, //??
      	name: '',
      	ip: null
    	};

    	$scope.records.push($scope.inserted2);
  };

  $scope.removeRecord = function(index){
		console.log('remove record');
		$scope.records.splice(index, 1);
  };

  $scope.showType = function(record){
   	 var selected = [];
     if(record.type) {
       selected = $filter('filter')($scope.types, record.type);
     }
    return selected.length ? selected[0] : 'Not set';
  };

  }]);





//test


app.controller('TestCtrl', function($scope, $filter, $http) {
 $scope.users = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ]; 

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null 
    };
    $scope.users.push($scope.inserted);
  };
});

// --------------- mock $http requests ----------------------
/*app.run(function($httpBackend) {
  $httpBackend.whenGET('/groups').respond([
    {id: 1, text: 'user'},
    {id: 2, text: 'customer'},
    {id: 3, text: 'vip'},
    {id: 4, text: 'admin'}
  ]);
    
  $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    return [200, {status: 'ok'}];
  });
});*/