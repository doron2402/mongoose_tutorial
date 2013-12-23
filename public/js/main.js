//Handle menu
$('ul#nav-header > li > a').each(function(key,val){
	var path = window.location.pathname;
	path = path.toString().substring(1);
	switch(path){
		case 'signup':
			path = 'signup';
			break;
		case 'about':
			path = 'about';
			break;
		case 'contact':
			path = 'contact';
			break;
		default:
			path = 'home';
			break;
	}

	if ($(val).text().toLowerCase() == path){
		$(val).parent().addClass('active');
	}
	else{
		$(val).parent().removeClass('active');
	}

});


$(document).ready(function(){
	$('a.ajaxPostLink').click(function(e){
		e.preventDefault();
		//Ajax call
		$.post($(e.target).attr('href'), function( data ) {
			console.log( data );
			if (data.response == 'ok'){
				$('.panel-title').html('Deleted id: ' + data.id + ' Succesfully!');
				$('.panel-body').html('<a href="/">Back</a>');
			}
		});
	});

});