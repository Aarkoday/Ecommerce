var mobilesdropdownstate = 'closed';

function dropdownreturn(dropdownname){
	mobilesdropdownstate = 'closed'
	const currentstatehtml = document.querySelector(`.${dropdownname}-dropdown`);
	currentstatehtml.classList.remove('move-dropdown');
}

function showdropdown(maindropdown){
	const main = document.querySelector(`.${maindropdown}-dropdowns-all`)
	main.classList.add(`dropdown-shown`);
}

function hidedropdown(maindropdown, sidedropdown){
	mobilesdropdownstate = 'closed'
	const slidingdropdown = document.querySelector(`.${maindropdown}-dropdown`);
	const main = document.querySelector(`.${maindropdown}-dropdowns-all`)
	const side = document.querySelector(`.${sidedropdown}-dropdown`)
	main.classList.remove(`dropdown-shown`);
	if (mobilesdropdownstate === 'closed'){
		slidingdropdown.classList.remove('move-dropdown');

	}
	else if (mobilesdropdownstate === 'open') {
		main.classList.add('move-dropdown');
	} else {
		console.log('error')
	}
}

function changingDropdown(currentState, nextstate, sidedropdownname){
	const currentstatehtml = document.querySelector(`.${currentState}-dropdown`);
	const nextstatehtml = document.querySelector(`.${nextstate}-dropdown`);
	const sideMenu = document.querySelector(`.${sidedropdownname}-dropdown`)

	mobilesdropdownstate = 'open'
	if (mobilesdropdownstate === 'open') {
		sideMenu.innerHTML = nextstatehtml.innerHTML
		currentstatehtml.classList.add('move-dropdown');
	} else {
		console.log('error')
	}
}


var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector('.navbar').classList.remove('navbarhide');
  } else {
    document.querySelector('.navbar').classList.add('navbarhide');
  }
  prevScrollpos = currentScrollPos;
}

var modetogglebuttonstate = 'light'
function togglebuttontoggled(){
	const togglebuttoncontainer = document.querySelector(`.modetogglebutton-outsidebox`)
	const togglebuttonmover = document.querySelector(`.modetogglebutton-insidebox`)
	const entirewebsite = document.querySelector('html')
	const allimages = document.querySelectorAll('img')
	if (modetogglebuttonstate === 'light'){
		modetogglebuttonstate = 'dark'
		togglebuttonmover.classList.add(`modetogglebuttonmove`)
		togglebuttoncontainer.classList.add(`modecontainerchange`)
		entirewebsite.classList.add(`darkmode`)
		allimages.forEach(function(img){
			const parentButton = img.closest('button');
			if (!parentButton) {
				if (!(img.classList.contains('dontadddarkmode')))
				img.classList.add('nodarkmode');
			}

		})
	} else{
		modetogglebuttonstate = 'light';
		togglebuttonmover.classList.remove(`modetogglebuttonmove`)
		togglebuttoncontainer.classList.remove(`modecontainerchange`)
		entirewebsite.classList.remove(`darkmode`)
		allimages.forEach(function(img){
			img.classList.remove('nodarkmode')
		})
	}
}

document.getElementById("search-form").addEventListener("submit", function(event) {
	event.preventDefault();
	
	const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
	
	const deviceMapping = {
		"iphone 12": "../item page/iphone12_item-page.html",
		"iphone 11": "../item page/iphone11_item-page.html",
		"iphone 13": "../item page/iphone13_item-page.html",
		"iphone 14": "../item page/iphone14_item-page.html",
		"iphone 15": "../item page/iphone15_item-page.html"
	};
	
	if (deviceMapping.hasOwnProperty(searchInput)) {
		const devicePage = deviceMapping[searchInput];
		window.location.href = devicePage;
	} else {
		alert("Device not found. Please try a different search term.");
	}
});

