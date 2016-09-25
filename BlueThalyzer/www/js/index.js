/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var map;
var mark;
var db;
var currentPosition;
var homePosition;



function googleMaps(){

  db = window.sqlitePlugin.openDatabase({
      name: 'my.db',
      location: 'default',
      androidDatabaseImplementation: 3,
      androidLockWorkaround: 1
  });

  db.transaction(function(tx){
       tx.executeSql('CREATE TABLE IF NOT EXISTS config (home_lat, home_lng, name, lastname, phoneNum1, phoneNum2)');
    }, function(error) {
       console.log('Transaction ERROR: ' + error.message);
     }, function() {
       console.log('Populated database OK');
  });
  var div = document.getElementById("divMap");
  map =plugin.google.maps.Map.getMap(div);

  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

}

function onMapReady() {
   var button = document.getElementById("addHome");
   button.addEventListener("click", onAddHomeClicked);

   goToCurrentPosition();

}

function onAddHomeClicked(){
  mark.getPosition(function(position){
    homePosition=position;
    db.transaction(function(tx){
        console.log('BD Access');
        tx.executeSql('INSERT INTO config VALUES (?,?,?,?,?,?)', [homePosition.lat, homePosition.lng, 'Juan', 'Zheng', '6642879876', '123456789' ]);
      },
      function(error) {
          console.log('Error');
      },
      function() {
        console.log('addhome select');
    });
    alert('Nueva ubicación de hogar actualizada');
  });

    db.transaction(function(tx) {
        tx.executeSql('SELECT name, lastname, phoneNum1, phoneNum2, home_lat, home_lng FROM config', [], querySuccess, errorCB);
    });
}

function querySuccess(tx, results) {
    //alert("Coordenadas = " + results.rows.item(0)['home_lat'] + ', ' + results.rows.item(0)['home_lng']);
}

function errorCB(err) {
    console.log("Error processing SQL: "+err.code);
}

function goToCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function(position){
    map.animateCamera({
      target: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      zoom: 17,
      tilt: 0,
      bearing: 50,
      duration: 1000,
    }, function() {

      // Add a maker
      map.addMarker({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        draggable: true,
        title: "Welecome to \n" +
               "Cordova GoogleMaps plugin for iOS and Android",
        snippet: "This plugin is awesome!",
        animation: plugin.google.maps.Animation.BOUNCE
      }, function(marker) {
        mark=marker;
        setTimeout(startScan, 1000);
      });
    });

  });


  // Move to the position with animation

}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', googleMaps, false);
        //$('#uberBtn').on('click',this.uberAction);
    },

    uberAction: function(){
      alert('llamando a un uber');
      navigator.geolocation.getCurrentPosition(function(position){
        //alert('uber');
        var uberData = {
            clientId: "YOUR_CLIENT_ID",
            toLatitude: homePosition.lat,
            toLongitude: homePosition.lng,
            toAddress: "",
            toNickname: "Home",
            fromLatitude: position.coords.latitude,
            fromLongitude: position.coords.longitude,
            fromNickname: 'Actual position',
            fromAddress: "",
            productId: "a1111c8c-c720-46c3-8534-2fcdd730040d"
        };
         window.uber(uberData, function(error) {
             console.log('Uber error'+error);
         });
      });
    },



    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

    }
};


    // Dictionary of devices.

    // Timer that displays list of devices.
    var timer = null;
    var delay= 10000;
    // function onDeviceReady()
    // {
    //     // Start tracking devices!
    //     setTimeout(startScan, 1000);
    //     // Timer that refreshes the display.
    // }

    var flag =false;
    function startScan()
    {

        var _udpScanPort= 55555; // port to listen

        //alert("startScan");
        chrome.sockets.udp.create({}, function (createInfo) {
            var _socketUdpId= createInfo.socketId;
            /// connect the socket to the port 55555
            chrome.sockets.udp.bind(_socketUdpId, "0.0.0.0", _udpScanPort, function(result) {
                console.log(result);
            });
            /// add the listener
            chrome.sockets.udp.onReceive.addListener(function (info) {
                //var list = [];
                var data= arrayBuffer2str(info.data);
                //alert(data);
                $('#dataText').text(data);
                if(data>=200 && !flag){
                  app.uberAction();
                  alert('El nivel de alcohol es mayor al permitido');
                  flag=true;
                }
                if(data<200){
                  flag=false;
                }
                console.log(data);
            });

            /// the timeout set the end of the listening
            setTimeout(function() {
                //chrome.sockets.udp.close(_socketUdpId, null);
            }, delay);
        });
        console.log("hola");
    }


    function arrayBuffer2str(buf) {
        var str= '';
        var ui8= new Uint8Array(buf);
        for (var i= 0 ; i < ui8.length ; i++) {
            str= str+String.fromCharCode(ui8[i]);
        }
        return str;
    }


       //document.querySelector('#found-devices').innerHTML = html

    //document.addEventListener('deviceready', onDeviceReady, false);


app.initialize();
