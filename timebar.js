/* 
** timebar.js
** Created by: Anna Sob
** Date: October 25, 2010
*/

(function () {

    var Timebar = this.Timebar = function (seconds) {

      var state = "paused";
      var totalDuration = seconds;
      var duration = seconds;
      var buffer;
      var bar;
      var videoElement;
      var pauseButton   = this.pauseButton   = document.createElement("button");
      var playButton    = this.playButton    = document.createElement("button");
      var buffer        = this.buffer        = document.createElement("div");
      var ellapsedTime  = this.ellapsedTime  = document.createElement("div");
      var totalDuration = this.totalDuration = document.createElement("span");

      
     var pause = function () {
        videoElement.pause()
        playButton.style.display = "inline";
        pauseButton.style.display = "none";
     };
     var play = function (){
        videoElement.play()
        pauseButton.style.display = "inline";
        playButton.style.display = "none";
      };
     var updateSeekable = function(){
      var endVal = videoElement.seekable && videoElement.seekable.length ? videoElement.seekable.end() : 0;
      //FF has a buffered event
      /*if (endVal === 0) {
        videoElement.buffered;
        for (var i=0; i<r.length; i++) {
        {
        }
      }*/
      buffer.style.width = (100 / (duration || 1) * endVal) + '%';
     }
     var updateEllapsedTime = function(){
      ellapsedTime.style.left = videoElement.currentTime +"px";
     }
     this.draw = function(width, height, targetDiv, video) {
      videoElement = video;
      videoElement.addEventListener('timeupdate', updateEllapsedTime, false);
      //buffer bar for progress
      videoElement.addEventListener('progress', updateSeekable, false);
      //Firefox in its video element that causes the video.seekable.end() value not to be the same as the duration. 
      //To work around this issue, we can also listen for the durationchange event
      videoElement.addEventListener('durationchange', updateSeekable, false);
      
      playButton.title = "play";
      playButton.value = "play";
      playButton.innerHTML = "&#x25BA;";
      playButton.style.display = "inline";
      playButton.onclick = play;
      
      pauseButton.title = "pause";
      pauseButton.value  = "pause";
      pauseButton.innerHTML  = "&#x2590;&#x2590;";
      pauseButton.style.display = "inline";
      pauseButton.onclick = pause;
      
      buffer.title = "Preloaded";
      buffer.setAttribute("style","width:0px;height:15px; position:absolute; -moz-opacity: 0.5; opacity: 0.5; background-color: grey;");
           
      ellapsedTime.title = "Ellapsed Time";
      ellapsedTime.setAttribute("style","width:3px;height:15px; position:absolute; background-color: black ;");
       
      totalDuration.title ="total";
      totalDuration.setAttribute("style","width:"+duration+"px;height:15px; position:absolute; border-style:solid;border-width:3px;position: absolute; border-radius:10px; -moz-border-radius: 10px;-webkit-border-radius: 10px;");
      
      //add buffered and ellapsedTime to the total duration div so they stay on top of each other
      totalDuration.appendChild(buffer);
      totalDuration.appendChild(ellapsedTime);
      //put the bars in a separate div
      var barContainer = document.createElement("span");
          barContainer.appendChild(totalDuration);
          
      var container = document.createElement("span");
          container.style.width="25%";
          container.appendChild(playButton);
          container.appendChild(pauseButton);
          container.appendChild(barContainer);
        
      targetDiv.appendChild(container);
      play();
     }   
    };
}());
