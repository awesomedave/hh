
(function ($) {
  module.service(
      "databaseService", function() {
    // Return public API.
    return({
      insert: insert,
      readAll: readAll,
      readById: readById,
      update: update,
      deleteRow: deleteRow
    });


    // ---
    // PRIVATE METHODS.
    // ---

    function prepareDB(callback){
      var dB;
      var name = "sibaDB";
      var version = "8";
      var stores = ["saloons","comments","savedProperty","savedSearch"];

      var request = window.indexedDB.open(name, version);
      request.onsuccess = function(e) {
        dB = e.target.result;
        callback(dB);

      };
      request.onerror = function(event) {
        // Do something with request.errorCode!
        console.log("Error db creation");
      };

      //When version is incremented this runs
      request.onupgradeneeded = function(event) { 
        console.log("Onupgrade DB");
        dB = event.target.result;

        deleteStores(dB, stores);

        // Create objectStores for this database
        var saloonStore = dB.createObjectStore("saloons", { keyPath: "id", autoIncrement: true });
        saloonStore.createIndex('index', 'index', { unique: true });

        var commentStore = dB.createObjectStore("comments", { keyPath: "id", autoIncrement: true });
        commentStore.createIndex('index', 'index', { unique: true });

        var savedPropertyStore = dB.createObjectStore("savedProperty", { keyPath: "id", autoIncrement: true });
        savedPropertyStore.createIndex('index', 'index', { unique: true });

        var savedSearchStore = dB.createObjectStore("savedSearch", { keyPath: "id", autoIncrement: true });
        savedSearchStore.createIndex('index', 'index', { unique: true });
      };

    }

    function deleteStores(dB, stores){
      for(store in stores) {
        if(dB.objectStoreNames.contains(stores[store])){
          dB.deleteObjectStore(stores[store]);
        }
      }
    }
    // ---
    // PUBLIC METHODS.
    // ---
    function insert(storeName, data) {
      var d = $.Deferred();

      prepareDB(function(dB){
        var trans = dB.transaction(storeName, "readwrite");
        var store = trans.objectStore(storeName);
        var request = store.add(data);

        request.onsuccess = function(e) {
          console.log("Succcess data added");
          d.resolve();
        };

        request.onerror = function(e) {
          console.log("Error data not added");
          d.reject(e);
        };
      });

      return d;
    }

    //need rework
    function readAll(storeName) {
      var d = $.Deferred();

      prepareDB(function(dB){
        var trans = dB.transaction(storeName, "readonly");
        var store = trans.objectStore(storeName);
        var storeItems = [];
        store.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;

          if(cursor) {
            storeItems.push(cursor.value);
            cursor.continue();
          }else {
            console.log('Entries all read.');
            if(storeItems.length > 0){
              d.resolve(storeItems);
            }else{
              d.reject(storeItems);
            }

          }
        };

      });

      return d;
    }

    function readById(storeName, indexName, id){
      var d = $.Deferred();

      prepareDB(function(dB){
        var trans = dB.transaction([storeName], "readonly");
        var store = trans.objectStore(storeName);
        var result = null;
        var index = store.index(indexName);
        index.get(id).onsuccess = function(event) {

          result = event.target.result;
        };

        trans.oncomplete = function(event) {
          console.log("Read by id success");
          d.resolve(result);
        };

        trans.error = function(err) {

          console.log("Read by id error");
          d.reject(err);
        };

      });

      return d;
    }

    function update(storeName, flag, updates, callback){
      prepareDB(function(dB){
        read(storeName, flag).then(function(storeItems){
          var holder = storeItems[0];
          for(var data in updates){
            holder[data] = updates[data];
          }
          // Put this updated object back into the database.
          var trans = dB.transaction(storeName, "readwrite");
          var store = trans.objectStore(storeName);
          var requestUpdate = store.put(holder);
          requestUpdate.onerror = function(event) {
            // Do something with the error
            console.log("error updating");
          };
          requestUpdate.onsuccess = function(event) {
            // Success - the data is updated!
            console.log("updated");
            callback();

          };

        }).fail(function(){

        });
      });

    }

    function deleteRow(storeName, id){
      var d = $.Deferred();
      prepareDB(function(dB){
        var trans = dB.transaction([storeName], "readwrite");
        var store = trans.objectStore(storeName);
        var request = store['delete'](id);

        request.onsuccess = function(e) {
          console.log("Deleted "+id);
          d.resolve();
        };

        request.onerror = function(e) {
          console.log(e);
          d.reject();
        };

      });

      return d;
    }

  }
  );

})(jQuery);