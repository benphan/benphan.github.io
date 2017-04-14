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
  var header = document.getElementById('header');
  header.addEventListener('click', onClickAdsHandler);

  var skip = document.getElementById('skip');
  skip.addEventListener('click', onClickSkipAdsHandler);

  player.play();

  startAuto();
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
