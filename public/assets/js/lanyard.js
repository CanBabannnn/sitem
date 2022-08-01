const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

var data = {};
var received = false;

lanyard.onopen = function () {
  lanyard.send(
    JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: "906634054311481364",
      },
    })
  );
};

setInterval(() => {
  if (received) {
    lanyard.send(
      JSON.stringify({
        op: 3,
      })
    );
  }
}, 30000);

lanyard.onmessage = function (event) {
  received = true;
  data = JSON.parse(event.data);
  
  $(document).ready(function () {
      $('.preloader').fadeOut(500);
  })

  if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
    update_presence();
    console.log(data)
  }
};

function update_presence() {
  var netflix = data.d.activities.find(millsl => millsl.application_id === "926541425682829352");
  var codeAc = data.d.activities.find(mills => mills.application_id === "782685898163617802");
  if(netflix){
    var logo = netflix.assets.large_image
    var logourl = logo.substring(logo.indexOf("https/"));
    var replacedurl = logourl.replace('https/','https://');

    document.querySelector('.activity').innerHTML = `<span class="ml-2 text-color px-2 py-1 font-normal rounded-md text-sm"><i class="fa-solid text-color fa-play"></i> Watching <b>${netflix.name}</b></span></span>`;
    document.querySelector('#activityS').innerHTML = `
    <img draggable="false" id="activityImg" src="${replacedurl}" style="position:relative;float:left;margin-left:10px;width:90px;height:90px;object-fit:cover;border-radius:8px;" alt="app logo">
    <div class="mb-3 ml-4">
      <div style="margin-left:15px;">
      <span class="text-color mt-1"><b>&nbsp;${netflix.name}</b></span><br>
      <span class="text-color mt-3">&nbsp;${netflix.details.length > 26 ? netflix.details.split(0,26) : netflix.details}</span><br>
      ${netflix.state ? `<span class="text-color mt-3">&nbsp;${netflix.state}</span><br>` : `<br>`}
      </div>
    </div>
    `;
  }else if(codeAc){
    var logo = codeAc.assets.large_image
    var logourl = logo.substring(logo.indexOf("https/"));
    var replacedurl = logourl.replace('https/','https://');

    document.querySelector('.activity').innerHTML = `<span class="ml-2 text-color px-2 py-1 font-normal rounded-md text-sm"><i class="fa-solid text-color fa-play"></i> Playing <b>${codeAc.name}</b></span></span>`;
    document.querySelector('#activityS').innerHTML = `
    <img draggable="false" id="activityImg" src="${replacedurl}" style="position:relative;float:left;margin-left:10px;width:90px;height:90px;object-fit:cover;border-radius:8px;" alt="app logo">
    <div class="mb-3 ml-4">
      <div style="margin-left:15px;">
      <span class="text-color mt-1"><b>&nbsp;${codeAc.name}</b></span><br>
      <span class="text-color mt-3">&nbsp;${codeAc.details.length > 26 ? codeAc.details.split(0,26) : codeAc.details}</span><br>
      ${codeAc.state ? `<span class="text-color mt-3">&nbsp;${codeAc.state}</span><br>` : `<br>`}
      </div>
    </div>
    `;
  }else if(data.d.activities.find(millsl => millsl.type === 0)){
    const dat = data.d.activities.find(millsl => millsl.type === 0);
    document.querySelector('.activity').innerHTML = `<span class="ml-2 text-color px-2 py-1 font-normal rounded-md text-sm"><i class="fa-solid text-color fa-play"></i> Playing <b>${dat.name}</b></span></span>`;
    document.querySelector('#activityS').innerHTML = `
    <div class="mb-3 ml-4">
      <div style="margin-left:15px;">
      <span class="text-color mt-1"><b>&nbsp;${dat.name}</b></span><br>
      <span class="text-color mt-3">&nbsp;${dat.details.length > 26 ? dat.details.split(0,26) : dat.details}</span><br>
      ${dat.state ? `<span class="text-color mt-3">&nbsp;${dat.state}</span><br>` : `<br>`}
      </div>
    </div>
    `;
  }else {
    document.querySelector('.activity').innerHTML = ``;
    document.querySelector('#activityS').innerHTML = ``;
    document.querySelector('.activity').style.display = 'none'
    document.querySelector('#activityS').style.display = 'none'
  };

  document.querySelector('.discord_username').innerHTML = `${data.d.discord_user.username}<span class="text-color text-gray-500">#${data.d.discord_user.discriminator}</span>`;
  document.querySelector('.discord_user_img').src = `https://cdn.discordapp.com/avatars/` + data.d.discord_user.id + '/' + data.d.discord_user.avatar+'?size=4096';
  if(data.d.discord_status == "online"){
    document.querySelector('.status-bg').innerHTML = `<span class="ml-2 text-online px-2 py-1 font-normal rounded-md text-sm"><i class="fa fa-circle text-online mr-2"></i>Online</span>`
  } else if(data.d.discord_status == "idle"){
    document.querySelector('.status-bg').innerHTML = `<span class="ml-2 text-idle px-2 py-1 font-normal rounded-md text-sm"><i class="fa fa-circle text-idle mr-2"></i>Idle</span>`
  } else if(data.d.discord_status == "dnd"){
    document.querySelector('.status-bg').innerHTML = `<span class="ml-2 text-dnd px-2 py-1 font-normal rounded-md text-sm"><i class="fa fa-circle text-dnd mr-2"></i>Do not distrub</span>`
  } else if(data.d.discord_status == "offline"){
    document.querySelector('.status-bg').innerHTML = `<span class="ml-2 text-offline px-2 py-1 font-normal rounded-md text-sm"><i class="fa fa-circle text-offline mr-2"></i>Offline</span>`
  } else {
    document.querySelector('.status-bg').innerHTML = `<span class="ml-2 text-offline px-2 py-1 font-normal rounded-md text-sm"><i class="fa fa-circle text-offline mr-2"></i>Offline</span>`
  }
  
  var cstatus = data.d.activities.find(el => el.id === "custom"); 
  if(cstatus) {
    document.querySelector('.customStatus').innerHTML = `<span class="text-color text-sm customText">${cstatus.state}</span><hr style="margin-right:1rem;">`;
  }else {
    document.querySelector('.customStatus').innerHTML = ``;
    document.querySelector('.customStatus').style.display = "none";
  }

  setInterval(function(){
    if(data.d.listening_to_spotify == true) {
    var crD = new Date(data.d.spotify.timestamps.end).getTime();
    var now = new Date().getTime();
    var distance = crD - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var spotify_time = minutes + "m " + seconds + "s ";
    var artist = data.d.spotify.artist.split(";")[0].split(",")[0]
    var song = data.d.spotify.song.split("(")[0];
    if(window.getComputedStyle(document.querySelector('.listening-activity')).display == "none"){ document.querySelector('.listening-activity').style.display = 'flex'; }

    document.querySelector('.listening-activity').innerHTML = `<span class="ml-2 text-color px-2 py-1 font-normal rounded-md text-sm"><i class="fa-brands text-color fa-spotify"></i> Listening to <a href="https://ope.spotify.com/track/${data.d.spotify.track_id}" target="_blank">${song}</a> by ${artist} <span class="text-color">— left ${spotify_time}</span></span></span>`
    } else {
      document.querySelector('.listening-activity').innerHTML = ``;
      document.querySelector('.listening-activity').style.display = "none";
    }
  }, 1000)
}
