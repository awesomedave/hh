
(function ($) {
  module.service(
      "propertyListService",
      function( $http, $q ) {
        // Return public API.
        return({
          getProperties: getProperties,
          checkOnline: checkOnline
        });
        // ---
        // PUBLIC METHODS.
        // ---
        // 

        // Get all of the properties in the remote collection.
        function getProperties() {
          var d = $.Deferred();
          /*var request = $http({
            method: "get",
            url: "http://127.0.0.1/siibaserver/testsiiba.php",
            //url: "http://10.10.0.2/siibaserver/testsiiba.php",
            params: {
              action: "get"
            }
          });*/
          $.ajax({
            url: "http://127.0.0.1/siibaserver/testsiiba.php",
            dataType: 'json',
            type: 'GET',
            success: function(data) {
              d.resolve(data);
              
            },
            /*error: function(xhr, status, err) {
              d.reject(xhr, status, err);
            }*/
            error: function(e, x, settings, exception) {
              var message = [];
              message.push(e.statusText);
              message.push(e.status);
              message.push(x);
              
              /*return message;*/
              d.reject(message);
            }
          });
          return d;
        }
        // I remove the friend with the given ID from the remote collection.
        function checkOnline( ) {
          var d = $.Deferred();
          var networkState = navigator.connection.type;
      
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      
      if ((states[networkState] == 'No network connection') || (states[networkState] == 'Unknown connection')) {
        d.reject(states[networkState]);
      } else {
        d.resolve(states[networkState]);
      }
      return d;
        }
        // ---
        // PRIVATE METHODS.
        // ---
        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError(e, x, settings, exception) {
          var message;
          var statusErrorMap = {
              '400' : "Server understood the request, but request content was invalid.",
              '401' : "Unauthorized access.",
              '403' : "Forbidden resource can't be accessed.",
              '500' : "Internal server error.",
              '503' : "Service unavailable."
          };
          if (x.status) {
            message =statusErrorMap[x.status];
            if(!message){
              message="Unknown Error \n.";
            }
          }else if(exception=='parsererror'){
            message="Error.\nParsing JSON Request failed.";
          }else if(exception=='timeout'){
            message="Request Time out.";
          }else if(exception=='abort'){
            message="Request was aborted by the server";
          }else {
            message="Unknown Error \n.";
          }
          return message;
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
          return( response.data );
        }
      }
  );

})(jQuery);