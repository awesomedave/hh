module.factory('slideFactory', function() {

  var sliderfactory = function() {
    var data = [];
    var gallery;
    return {
      set: function(info){
        data.push(info);      
      },
      clear: function(){
        var d = $.Deferred();
        for(var id in data){
          clearInterval(data[id]);
          data.pop(id);
        }
        d.resolve();
        return d;
      },
      dataLength: function(){
        return data.length;
      },
      setGallery: function(index){
        gallery = index;
      },
      getGallery: function(){
        return gallery;
      }
    }    

  }();

  return sliderfactory;
});