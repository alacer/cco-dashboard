$(document).ready(function() {
    $('#dashboardtable').dataTable( {
    	    Parse.initialize({
                app_id : "QlR7raDX8sggg5ebpDkgBXVANXhPPmpUKZRmOaMS", // <-- enter your Application Id here
                rest_key : "urhXUisVSqEOMoHhYp4W624k3Putu4YZAeJ7E26p" // <--enter your REST API Key here   
            });

           	parse.get('metrics')


    } );
} );