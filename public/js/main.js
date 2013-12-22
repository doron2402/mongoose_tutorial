$('ul#nav-header > li > a').each(function(key,val){
	var path = window.location.pathname;
	path = path.toString().substring(1);
	switch(path){
		case 'signup':
			path = 'signup';
			break;
		default:
			path = 'home';
			break;
	}

	if ($(val).text().toLowerCase() == path){
		console.log($(val).text().toLowerCase());
		$(val).parent().addClass('active');
	}
	else{
		console.log('else %s', $(val).text().toLowerCase());
		$(val).parent().removeClass('active');
	}

});