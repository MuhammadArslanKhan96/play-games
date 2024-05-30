//	'pokemonshowdown':{name:'Pokemon Showdown', dev:'osk', plays:'10K', link:'https://play.pokemonshowdown.com/', iframe:false}
//	'duelingbook':{name:'Dueling Book', dev:'osk', plays:'1K', link:'https://duelingbook.com', iframe:false}
//dueling nexus, cookie clicker
if (getCookie("playHistory") != "")
  var playHistory = getCookie("playHistory").split(" ");
else var playHistory = ["minecraftclassic", "poki", "evoworldio", "evowarsio"];
  

export var openGame = function (game, gameData) {
  document.body.style.backgroundImage = `url('https://playem.io/img/${game}-bg.png')`;

  savePlayHistory(game);
};

//Cookie
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  if (typeof document === "undefined") return "";
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export var savePlayHistory = function (item) {
  for (let i in playHistory) {
    if (playHistory[i] === item) playHistory.splice(i, 1);
  }

  playHistory.unshift(item);

  if (playHistory.length > 4) {
    playHistory.pop();
  }

  var value = "";
  for (let i in playHistory) {
    value += playHistory[i];

    if (i <= playHistory.length - 1) value += " ";
  }

  setCookie("playHistory", value, 365);
};

export var resizeCanvas = function () {
  document.getElementById("gameFrame").style.width = `${
    window.innerWidth * 0.9
  }px`;
  document.getElementById("gameFrame").style.height = `${
    window.innerHeight - 80
  }px`;
};

export var loadGame = function (i) {
  document.getElementById(`gameFrame`).innerHTML = `
		<iframe id="gameIframe" src="/play/${i}" style="height:100%;width:100%;border:0;"></iframe>
	`;
};

export { playHistory };
