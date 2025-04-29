if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./.././Youngs_Modulus_Uniform_Bending/service_worker_Youngs_Modulus_Uniform_Bending.js')
		.then(function(r) {
			console.log('NW  App now available offline');
		})
		.catch(function(e) {
			console.log('NW App NOT available offline');
			console.log(e);
		});
} else {
	console.log('Service workers are not supported');
}
