window.addEventListener("load", function() {
	makecart()
});

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





var addtocart = 'no'


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

function colorpicker(buttoncolor){
	document.querySelector('.itemcolor').innerHTML = buttoncolor
}

	
function addtocarttoggle(){
	var currentitemnumber = Number(localStorage.getItem('itemnumber'))
	const cartbutton = document.querySelector(`.addcart-button`)
	const addedtocartcontainer = document.querySelector(`.addedtocart-button-hidden`)
	const addtocartcontainer = document.querySelector(`.addtocart-button-hidden`)

	if (addtocart === 'no'){
		addtocart = 'yes';
		cartbutton.innerHTML = addedtocartcontainer.innerHTML
		currentitemnumber += 1
		
		const itemcartJson = {
			itemname: document.querySelector('.itemname').innerHTML,
			Model: document.querySelector('.itemmodel').innerHTML,
			color: document.querySelector('.itemcolor').innerHTML,
			price: document.querySelector('.final-price').innerHTML,
			quantity: Number(document.querySelector('.quantity').innerHTML),
		}
		const item = JSON.stringify(itemcartJson)
		localStorage.setItem(`item${currentitemnumber}`, item)
	} else {
		addtocart = 'no';
		cartbutton.innerHTML = addtocartcontainer.innerHTML
		localStorage.removeItem(`item${currentitemnumber}`)
		currentitemnumber -=1
	}
	localStorage.setItem('itemnumber', String(currentitemnumber))
}



function makecart(){
	var summedprice = 0
	for (let i=0; i<=(Number(localStorage.getItem('itemnumber'))+2); i++){
		try{
			const currentitem = JSON.parse(localStorage.getItem(`item${i}`))
			document.querySelector('.hidden-content .itemname').innerHTML = `${currentitem.itemname}`
			document.querySelector('.hidden-content .colorndsize').innerHTML = `${currentitem.Model}   ${currentitem.color}`
			document.querySelector('.hidden-content .final-price').innerHTML = `$${currentitem.price}`
			document.querySelector('.hidden-content .quantity').innerHTML = `${currentitem.quantity}`
			document.querySelector('.hidden-content .itemcategory').innerHTML = `${currentitem.category}`
			document.querySelector('.hidden-content .itemimage').src = `${currentitem.image}`
			
			
			document.querySelector('.hidden-content div').classList.add(`item${i}`)
			const priceWithoutDollar = currentitem.unitprice.replace('$', '');
			document.querySelector('.hidden-content .plus-button').setAttribute("onclick", `itemamountcalc(1, ${priceWithoutDollar}, 'item${i}')`)
			document.querySelector('.hidden-content .minus-button').setAttribute("onclick", `itemamountcalc(-1, ${priceWithoutDollar}, 'item${i}')`)
			document.querySelector('.hidden-content .removefromcart').setAttribute('onclick', `removefromcart('item${i}')`)
	
			document.querySelector('.itemsgrid').innerHTML += document.querySelector('.hidden-content').innerHTML
			document.querySelector('.hidden-content div').classList.remove(`item${i}`)
	
		}catch(error){

		}
	}
	var summedprice = 0
	for (let i=0; i<=(Number(localStorage.getItem('itemnumber'))+2); i++){
		try{
			const currentitem = JSON.parse(localStorage.getItem(`item${i}`))
			summedprice += Number(currentitem.price)
			document.querySelector('.summedprices').innerHTML = `$${summedprice.toFixed(2)}`
		}catch(error){

		}

	}
	var summedquantities = 0
	for (let i=0; i<=(Number(localStorage.getItem('itemnumber'))+2); i++){
		try{
			const currentitem = JSON.parse(localStorage.getItem(`item${i}`))
			summedquantities += Number(currentitem.quantity)
			document.querySelector('.itemno').innerHTML = `${summedquantities.toFixed(0)} items`
		}catch(error){

		}

	}
}


function plusminuschecker(){
	if(document.querySelector('.hidden-content .quantity-button').classList.contains('plus-button')){	
		return +1
	}else{
		return-1
	}
}

function itemamountcalc(buttontype, price, itemno){
	var itemamount = Number(document.querySelector(`.${itemno} .quantity`).innerHTML)
	itemamount += buttontype
	if (itemamount  === 0){
		itemamount = 1
	}
	finalpricecalc(price, itemamount, itemno)
	document.querySelector(`.${itemno} .quantity`).innerHTML = itemamount
	const itemobject = JSON.parse(localStorage.getItem(`${itemno}`))
	itemobject.quantity = itemamount
	const itemready = JSON.stringify(itemobject)
	localStorage.setItem(`${itemno}`, itemready)
	var summedquantities = 0
	for (let i=0; i<=(Number(localStorage.getItem('itemnumber'))+2); i++){
		try{
			const currentitem = JSON.parse(localStorage.getItem(`item${i}`))
			summedquantities += Number(currentitem.quantity)
			document.querySelector('.itemno').innerHTML = `${summedquantities.toFixed(0)} items`
		}catch(error){

		}

	}

}

function finalpricecalc(itemprice, itemamount, itemno){
	const finalpricehtml = document.querySelector(`.${itemno} .final-price`)
	var finalprice = itemprice * itemamount

	finalpricehtml.innerHTML = `$${finalprice.toFixed(2)}`

	const itemobject = JSON.parse(localStorage.getItem(`${itemno}`))
	itemobject.price = finalprice.toFixed(2)
	const itemready = JSON.stringify(itemobject)
	localStorage.setItem(`${itemno}`, itemready)
	var summedprice = 0
	for (let i=0; i<=(Number(localStorage.getItem('itemnumber'))+2); i++){
		try{
			const currentitem = JSON.parse(localStorage.getItem(`item${i}`))
			console.log(currentitem.price)
			summedprice += Number(currentitem.price)
			document.querySelector('.summedprices').innerHTML = `$${summedprice.toFixed(2)}`
		}catch(error){

		}

	}

}


function removefromcart(itemnumber){
	document.querySelector('.itemsgrid').removeChild(document.querySelector(`.${itemnumber}`))
	localStorage.removeItem(`${itemnumber}`)
	var currentitemnumber = Number(JSON.parse(localStorage.getItem('itemnumber')))
	currentitemnumber -= 1
	localStorage.setItem('itemnumber', String(currentitemnumber))
	var summedprice = 0
	for (let i=0; i<=(Number(localStorage.getItem('itemnumber'))+2); i++){
		try{
			const currentitem = JSON.parse(localStorage.getItem(`item${i}`))
			summedprice += Number(currentitem.price)
			document.querySelector('.summedprices').innerHTML = `$${summedprice.toFixed(2)}`
		}catch(error){

		}

	}
	var summedquantities = 0
	for (let i=0; i<=(Number(localStorage.getItem('itemnumber'))+2); i++){
		try{
			const currentitem = JSON.parse(localStorage.getItem(`item${i}`))
			summedquantities += Number(currentitem.quantity)
			document.querySelector('.itemno').innerHTML = `${summedquantities.toFixed(0)} items`
		}catch(error){

		}

	}
}

function cartbought(){
	localStorage.clear()
	window.location.reload()
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

