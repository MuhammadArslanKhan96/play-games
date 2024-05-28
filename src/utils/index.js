//	'pokemonshowdown':{name:'Pokemon Showdown', dev:'osk', plays:'10K', link:'https://play.pokemonshowdown.com/', iframe:false}
//	'duelingbook':{name:'Dueling Book', dev:'osk', plays:'1K', link:'https://duelingbook.com', iframe:false}
//dueling nexus, cookie clicker
if (getCookie("playHistory") != "")
  var playHistory = getCookie("playHistory").split(" ");
else var playHistory = ["minecraftclassic", "poki", "evoworldio", "evowarsio"];

var displayedGames = {};
export var updateLastPlayedList = function () { 
  if (playHistory.length === 0) return;

  var content = "";
  for (let i in playHistory) {
    if (!displayedGames[playHistory[i]]){
    // content += createGameThumb(playHistory[i]);
    displayedGames[playHistory[i]] = true;
    }
  }

  document.getElementById(`lastPlayedList`).innerHTML = content;
  document.getElementById(`lastPlayedTitle`).style.display = "block";
};

export var updateGameList = async function (
  sortBy,
  type,
  name,
  targetedDiv,
  displayMode,
  tagData,
  devData,
  gameData
) {
  if (!sortBy || !type || !name || !targetedDiv || !displayMode) return;

  console.log('Parameters:', { sortBy, type, name, targetedDiv, displayMode, tagData, devData, gameData });

  let content = "";
  let sortedList = [];
  let title = "";

  if (type === "tag") title = tagData[name]?.fullName;
  else if (type === "dev") title = `By ${devData[name]?.name}`;

  if (displayMode === "short") {
    content = `<div style="text-align:left"><h2 style="display:inline-block"><a href="/${type}/${name}" style="text-decoration:none">${title}</a></h2> <span style="font-size:14px;text-decoration:underline;cursor:pointer" onclick="window.open('/${type}/${name}','_self');">(More)</span></div>`;
  } else {
    content = `<h2>${title}</h2>`;
  }

  console.log('Initial content:', content);

  // Draw Non-Sticky Games
  for (let item in gameData) {
    if (gameData[item].sticky || playHistory.includes(item) || displayedGames[item]) continue;

    if (name) {
      if (type === "tag" && !gameData[item].tags.includes(name)) continue;
      else if (type === "dev" && gameData[item].dev !== name) continue;
    }

    let temp = { id: item, ratingValue: sortBy === "rating" ? gameData[item].ratingValue : gameData[item].plays };
    sortedList.push(temp);
  }
  sortedList.sort((a, b) => b.ratingValue - a.ratingValue);

  console.log('Sorted non-sticky games:', sortedList);

  // Draw Sticky Games
  for (let item in gameData) {
    if (!gameData[item].sticky || playHistory.includes(item) || displayedGames[item]) continue;

    if (name) {
      if (type === "tag" && !gameData[item].tags.includes(name)) continue;
      else if (type === "dev" && gameData[item].dev !== name) continue;
    }

    let temp = { id: item, ratingValue: 0 };
    sortedList.unshift(temp);
  }

  if (displayMode === "short") {
    sortedList = sortedList.slice(0, 4);
  }

  console.log("Final sorted list:", sortedList);

  for (let item of sortedList) {
    console.log('Creating game thumb for item:', item.id);
    content += await createGameThumb(item.id, gameData);
    displayedGames[item.id] = true;
  }

  const element = document.getElementById(targetedDiv);
  if (element) {
    element.innerHTML = content;
  } else {
    console.error(`Element with ID '${targetedDiv}' not found.`);
  }
};


export var createGameThumb = async function (item, gameData) {
    console.log('Item:', item);
    console.log('Game Data:', gameData);
  
    if (!gameData[item]) return "";
  
    var appLink = "/app/" + item;
    var playLink = "/play/" + item;
  
    var onlineDisplay = "";
  
    if (gameData[item].plays != 0) {
      if (gameData[item].plays >= 1000000) {
        onlineDisplay = `<div class="onlineDisplay">${gameData[item].plays / 1000000}M Online</div>`;
      } else if (gameData[item].plays >= 1000) {
        onlineDisplay = `<div class="onlineDisplay">${gameData[item].plays / 1000}K Online</div>`;
      } else {
        onlineDisplay = `<div class="onlineDisplay">${gameData[item].plays} Online</div>`;
      }
    }
  
    var changedRatingValue = gameData[item].ratingValue;
    if (changedRatingValue % 1 === 0) changedRatingValue = `${changedRatingValue}.0`;
  
    var finalGameName = gameData[item].name;
    if (finalGameName.length >= 23) finalGameName = finalGameName.slice(0, 20) + `...`;
  
    return `
      <div class="thumbDiv" onclick="window.open('${playLink}','_blank');">
        <img style="cursor: pointer; border-radius: 12px; width:100%;height:100%" src="/img/${item}.jpg" alt="Read Review: ${gameData[item].name}" />
        ${onlineDisplay}
        <div class="thumbDiv-moreInfo" onclick="event.stopPropagation();window.open('${appLink}','_blank');">
          <b>...</b>
        </div>
        <div class="ratingDisplay">${changedRatingValue}</div>
        <div class="thumbDiv-name" style="max-width:140px; height:16px;overflow:hidden;white-space: nowrap;">
          <a href="${playLink}" target="_blank" style="text-decoration:none;">${gameData[item].name}</a>
        </div>
      </div>
    `;
  };
  

export var openGame = function (game) {
  document.body.style.backgroundImage = `url('/img/${game}-bg.png')`;

  savePlayHistory(game);
  updateLastPlayedList();
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
