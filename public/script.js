
//	'pokemonshowdown':{name:'Pokemon Showdown', dev:'osk', plays:'10K', link:'https://play.pokemonshowdown.com/', iframe:false}
//	'duelingbook':{name:'Dueling Book', dev:'osk', plays:'1K', link:'https://duelingbook.com', iframe:false}
//dueling nexus, cookie clicker
if (getCookie("playHistory") != "")
	var playHistory = getCookie("playHistory").split(" ");
else
	var playHistory = ['minecraftclassic','poki','evoworldio','evowarsio'];

//var displayedGames = {};
var updateLastPlayedList = function(){
	if (playHistory.length === 0)
		return;
	
	var content = "";
	for (let i in playHistory){
		//if (!displayedGames[playHistory[i]]){
			content += createGameThumb(playHistory[i]);
			//displayedGames[playHistory[i]] = true;
		//}
	}
	
	document.getElementById(`lastPlayedList`).innerHTML = content;
	document.getElementById(`lastPlayedTitle`).style.display = "block";
}


var updateGameList = function(sortBy,type,name,targetedDiv,displayMode){
	if (sortBy === null) return; //rating OR plays
	if (!(type === 'tag' || type === 'dev')) return; //tag or dev
	if (name === null) return; //name of (tag || dev)
	if (targetedDiv === null) return; //div id
	if (displayMode === null) return; //full OR short
	
	var content = "";
	var sortedList = [];
	console.log(tagData , "CHECK");
	var title = "";
	if (type === 'tag')
		title = tagData[name].fullName;
	else if (type === 'dev')
		title = `By ${devData[name]?.name}`;
	
	
	
	if (displayMode === 'short')
		content = `<div style="text-align:left"><h2 style="display:inline-block"><a href="/${type}/${name}" style="text-decoration:none">${title}</a></h2> <span style="font-size:14px;text-decoration:underline;cursor:pointer" onclick="window.open('/${type}/${name}','_self');">(More)</span></div>`;
	else
		content = `<h2>${title}</h2>`;
	
	//Draw Non-Sticky Games
	for (let item in gameData){
		if (gameData[item].sticky) continue;
		//if (playHistory.includes(item)) continue;
		//if (displayedGames[item]) continue;
		
		if (name != ""){
			if (type === 'tag'){
				if (gameData[item].tags.findIndex((a)=>(a === name)) === -1)
					continue;
			}
			else if (type === 'dev'){
				if (gameData[item].dev != name)
					continue;
			}
		}
		
		if (sortBy === 'rating')
			var temp = {id:item,ratingValue:gameData[item].ratingValue};
		else if (sortBy === 'plays')
			var temp = {id:item,ratingValue:gameData[item].plays};
		
		sortedList.push(temp);
	}
	sortedList.sort((a,b) => (b.ratingValue-a.ratingValue));
	
	//Draw Sticky Games
	for (let item in gameData){
		if (!gameData[item].sticky) continue;
		//if (playHistory.includes(item)) continue;
		//if (displayedGames[item]) continue;
		
		if (name != ""){
			if (type === 'tag'){
				if (gameData[item].tags.findIndex((a)=>(a === name)) === -1)
					continue;
			}
			else if (type === 'dev'){
				if (gameData[item].dev != name)
					continue;
			}
		}
		
		var temp = {id:item,ratingValue:0};
		sortedList.unshift(temp);
	}
	
	if (displayMode === 'short'){
		sortedList = sortedList.splice(0,4);
	}
	
	for (let item in sortedList){
		content += createGameThumb(sortedList[item].id);
		//displayedGames[sortedList[item].id] = true;
	}
	
	//document.getElementById(targetedDiv).style.overflowY = "hidden";
	document.getElementById(targetedDiv).innerHTML = content;
}

var createGameThumb = function(item){
	if (!gameData[item])
		return "";
	
	var appLink = '/app/' + item;
	var playLink = '/play/' + item;
	
	var onlineDisplay = "";
	
	if (gameData[item].plays != 0){
		if (gameData[item].plays >= 1000000)
			onlineDisplay = `<div class="onlineDisplay">${gameData[item].plays/1000000}M Online</div>`;
		else if (gameData[item].plays >= 1000)
			onlineDisplay = `<div class="onlineDisplay">${gameData[item].plays/1000}K Online</div>`;
		else
			onlineDisplay = `<div class="onlineDisplay">${gameData[item].plays} Online</div>`;
	}
	
	var changedRatingValue = gameData[item].ratingValue;
	if (changedRatingValue % 1 === 0)
		changedRatingValue = `${changedRatingValue}.0`;
	
	var finalGameName = gameData[item].name;
	if (finalGameName.length >= 23)
		finalGameName = finalGameName.slice(0, 20) + `...`;
	
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
}



var openGame = function(game){
	//document.body.style.backgroundImage = `url('/img/${game}-bg.png')`;
	
	savePlayHistory(game);
	updateLastPlayedList();
}







//Cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
	
var savePlayHistory = function(item){
	for (let i in playHistory){
		if (playHistory[i] === item)
			playHistory.splice(i,1);
	}
	
	playHistory.unshift(item);
	
	if (playHistory.length > 4){
		playHistory.pop();
	}
	
	var value = "";
	for (let i in playHistory){
		value += playHistory[i];
		
		if (i <= playHistory.length - 1)
			value += " ";
	}
	
	setCookie("playHistory",value,365);
}

var resizeCanvas = function(){
	document.getElementById("gameFrame").style.width = `${window.innerWidth * 0.9}px`;
	document.getElementById("gameFrame").style.height = `${window.innerHeight - 80}px`;
}

var loadGame = function(i){
	document.getElementById(`gameFrame`).innerHTML = `
		<iframe id="gameIframe" src="/play/${i}" style="height:100%;width:100%;border:0;"></iframe>
	`;
}