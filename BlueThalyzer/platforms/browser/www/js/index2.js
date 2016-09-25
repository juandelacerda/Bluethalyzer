
;(function()
{
    // Dictionary of devices.

    // Timer that displays list of devices.
    var timer = null;
    var delay= 10000;
    function onDeviceReady()
    {
        // Start tracking devices!
        setTimeout(startScan, 1000)

        // Timer that refreshes the display.

    }

    function startScan()
    {

        var _udpScanPort= 55555; // port to listen


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
                alert(data);

             /*   var row= {
                    "addr": info.remoteAddress,
                    "data": data
                };*/
             //  list.push(row);
                console.log(data);
            });

            /// the timeout set the end of the listening
            setTimeout(function() {
                chrome.sockets.udp.close(_socketUdpId, null);
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

    document.addEventListener('deviceready', onDeviceReady, false);

 })();
