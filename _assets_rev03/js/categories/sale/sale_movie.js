
var yt;var isDone=false;var tag=document.createElement('script');tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName('script')[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);function onYouTubeIframeAPIReady(){yt=new YT.Player('mv-video',{videoId:$('#mv-video').data('video'),playerVars:{controls:0,showinfo:0,autoplay:1,rel:0,disablekb:1,modestbranding:0,playsinline:1},events:{'onReady':onYoutubePlayerReady,'onStateChange':onYoutubePlayerStateChange}});}
function onYoutubePlayerReady(){yt.mute();yt.playVideo();}
function checkCurrent(){if(yt.getDuration()-1<yt.getCurrentTime()){yt.seekTo(0);}
setTimeout(checkCurrent,500);}
function onYoutubePlayerStateChange(e){if(e.data==YT.PlayerState.PLAYING&&!isDone){$(yt.f).addClass('done');isDone=true;checkCurrent();}}