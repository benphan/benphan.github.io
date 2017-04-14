//<script type="text/javascript" src="../jsLavaVpaid.js"></script>
 
var VPAID;
var player;
var video;
var guide;

window.addEventListener('load', onLoadHandler);

function onLoadHandler(evt) {
  
  //start VPAID here
  VPAID = new LAVA.LavaVpaid();
  VPAID.configure();

  guide = document.getElementById('guide');
  
  video = document.getElementById("videoBanner");
  video.addEventListener('timeupdate', onTimeUpdateHandler);
  video.addEventListener('click', onClickAdsHandler);

  player = new LAVA.VPaidPlayer();
  player.connect(video, VPAID);

  VPAID.startAd();

  var bg = document.getElementById('bg').style.display = 'none';
  var guide = document.getElementById('guide').style.display = 'none';
  var header = document.getElementById('header');
  header.addEventListener('click', onClickAdsHandler);

  var skip = document.getElementById('skip');
  skip.addEventListener('click', onClickSkipAdsHandler);

  player.play();

  startAuto();

  loadCustomParameters(window.frameElement.getAttribute('data-custom'));
}


function loadCustomParameters(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = xhttp.responseXML;
      var x = xmlDoc.getElementsByTagName("VpaidClickThrough");
      var y = xmlDoc.getElementsByTagName("VpaidClickTracking");

      var name;
      var tag;
      for(var i = 0; i < x.length; i ++) {
        name = x[i].getAttribute('name');
        tag = document.getElementById(name);
        if (tag) {
          tag.setAttribute('data-tracking', findTracking(name, y));
          tag.setAttribute('href', x[i].childNodes[0].nodeValue);
          
          tag.onclick = function(evt) {
            var track = new XMLHttpRequest();
            track.open("GET", this.getAttribute('data-tracking'), true);
            track.send();
          }
        }
      }      
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function findTracking(name, arr) {
  var att;
  for(var i = 0; i < arr.length; i ++) {
    att = arr[i].getAttribute('name');
    if (att == name) {
      return arr[i].childNodes[0].nodeValue;
    }
  }
  return '';
}         


function onClickAdsHandler(evt) {
  VPAID.clickThruAd();
}

function onClickSkipAdsHandler(evt) {
  player.stop();
  VPAID.skipAd();
}

function getGuideTextByTime(time) {
  return 'This ads runs for ' + (time > 9 ? time : '0' + time) + (time > 1 ? ' seconds'  : ' second') + ' - Ads by SOVID - LAVA DIGITAL';
}

function onTimeUpdateHandler(evt) {
  
  guide.innerHTML = getGuideTextByTime(Math.ceil(video.duration - video.currentTime));
}

function startAuto() {
  var autoTime = 5;

  var ti = setInterval(function() {
    autoTime --;
    
    if (autoTime == 0) {
      skip.style.display = 'block';
      clearInterval(ti);
    }
  
  }, 1000);
}
