<script>
import anime from "animejs";
import cities from '$lib/cunts.json';
import { page } from '$app/stores';

let search_active = false;

// console.log('testload');
// console.log($page.url.pathname); 

let searchTerm = "";
let search_results = [];
$: render_results = search_results;

// const cities = require('/data/cunts.json');

$: if (searchTerm.length != 0){
	search_results = get_results(searchTerm.toLowerCase());
	console.log(search_results);
}

function redirect_to(cityname){
	console.log(cityname);
	search_trigger();
}

function update_results(ar){
	let hole = document.getElementById('results');
}

function get_results(q, howmany=7){
	let temp_results = [];
	let co_results = [];
	console.log('triggered searchc');
	console.log(q);

	temp_results = cities.filter(function(city){
		let check = (city.ci).toLowerCase();
		return check.startsWith(q);
	});

	if (temp_results.length > howmany){
		temp_results.length = howmany;
	} else {
		co_results = cities.filter(function(city2){
			let check2 = (city2.co).toLowerCase();
			return check2.startsWith(q);
		});
		// console.log('co_results');
		// console.log(co_results);
		temp_results = temp_results.concat(co_results);
		if (temp_results.length > howmany) temp_results.length = howmany;
	}
	return temp_results;

}

function search_trigger(e){
	// let el_id = e.target.id;
	search_active = !search_active;
	document.getElementById("search").classList.toggle('fixit_search');
	document.querySelector("#search span").classList.toggle('ico_search');
	document.querySelector("#search span").classList.toggle('ico_close');

	document.querySelector("#search_wrap").classList.toggle('open_search');
	// console.log(el_id);

	if (search_active){
		document.querySelector('#search_expanded').style.display = 'block';
		anime({
	  		targets: "#search_expanded",
	  		opacity: 1,
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})
	  	document.getElementById('query').focus();
	} else {
		anime({
	  		targets: "#search_expanded",
	  		opacity: 0,
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})

	  	setTimeout(function(){
		    document.querySelector('#search_expanded').style.display = 'none';
			searchTerm = "";
			search_results = [];
		}, 150);
	}
}
</script>

<div id='search_wrap'>

<div id='search' on:click={(event) => search_trigger(event)}><span class='ico_search icon_mmm'></span><span class='placehold'>Search ~5000 cities...</span></div>

<!-- <div id='search_on_home' on:click={(event) => search_trigger(event)}><span class='ico_search icon_mmm'></span></div> -->

<div id='search_expanded' style=''>

	<input type='search' placeholder="Search..." id='query' autocomplete="off" bind:value={searchTerm}>
	<div class='scrollhack'></div>

	<div id='results'>

		{#each render_results as { ci, co, p }, i}
			<a href='/{co.toLowerCase().substring(0,3) + co.slice(-1)}/{ci.toLowerCase()}' class='search_result' on:click={(event) => redirect_to(ci.replace(/\s+/g, '-').toLowerCase())}>
				<div class='result_img test_img' style="background-image: url(/assets/mini/{ci.replace(/\s+/g, '').replace('\'','').toLowerCase() + '-' + co.toLowerCase().substring(0,3) + co.slice(-1) + '-t'}.png), url(/assets/mini/random-t.png);"></div>
				<p class='result_text'><span class='cityname'>{ci}</span> · <span class='countryname'>{co}</span></p>
			</a>
		{/each}


		<!-- <div class='search_result'>
			<div class='result_img test_img'></div>
			<p class='result_text'><span class='cityname'>Prague</span> · <span class='countryname'>Czech Republic</span></p>
		</div>
		<div class='search_result'>
			<div class='result_img'></div>
			<p class='result_text'><span class='cityname'>Zurich</span> · <span class='countryname'>Switzerland</span></p>
		</div>
		<div class='search_result'>
			<div class='result_img'></div>
			<p class='result_text'><span class='cityname'>London</span> · <span class='countryname'>United Kingdom</span></p>
		</div>
		<div class='search_result'>
			<div class='result_img'></div>
			<p class='result_text'><span class='cityname'>Berlin</span> · <span class='countryname'>Germany</span></p>
		</div> -->
		<!-- <div class='search_result'>
			<div class='result_img'></div>
			<p class='result_cityname'>Zurich</p>
			<p class='result_countryname'> · <span class='countryname'>Switzerland</span></p>
		</div>
		<div class='search_result'>
			<div class='result_img'></div>
			<p class='result_cityname'>Berlin</p>
			<p class='result_countryname'> · <span class='countryname'>Germany</span></p>
		</div>
		<div class='search_result'>
			<div class='result_img'></div>
			<p class='result_cityname'>London Bioidhf</p>
			<p class='result_countryname'> · <span class='countryname'>United Kingdom</span></p>
		</div> -->
	</div>

</div>

</div>


<style>
#search_on_home {

}

.test_img {
/*		background-image: url("/assets/mini/ilu_prague.jpg"), url("/assets/mini/ilu_fallback.jpg");*/
}

.result_countryname {
}

.cityname {
	color: rgba(0, 0, 0, 1.0);
}

.result_text{
	font-size: 22px;
	font-weight: 400;
	line-height: 40px;
	float: left;
	margin-left: 16px;
	color: rgba(0, 0, 0, 0.46);
	width: calc(100% - 80px - 16px);
/*		background-color: #903;*/
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.result_img {
	width: 80px;
	height: 40px;
	background-color: #083;
	float: left;
	border-radius: 40px;
	background-size: cover;
}

.search_result {
	width: 100%;
	height: 40px;
/*		margin-top: 12px;*/
	display: block;
	padding: 6px 0px;
/*		background-color: #978;*/
}

#results {
	position: fixed;
	top: 80px;
	left: 16px;
	width: calc(100% - 32px)
}

.scrollhack {
	font-size: 40px;
	color: #888;
	height: 101vh;
	width: 1px;
	position: absolute;
	top: 0;
}

#query {
	position: fixed;
	top: 30px;
	left: 16px;
	font-family: Satoshi;
	font-size: 20px;
	font-weight: 400;
	border: 0;
	outline: 0;
	background: transparent;
	border: none;
}

#search_expanded {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
/*		opacity: 0.8;*/
	overflow: scroll;
	overscroll-behavior: contain;
/*		pointer-events: none;*/
/*		z-index: 20;*/
	display: none;
	opacity: 0;
}

#search_expanded::-webkit-scrollbar {
    display: none;
}


input[type="search"]::-webkit-search-cancel-button {
		-webkit-appearance: none;
}

.icon_mmm {
	position: absolute;
	top: 2px;
	left: 2px;
	width: 48px;
	height: 48px;
	display: block;
	pointer-events: none;
}

.placehold {
	display: inline-block;
	line-height: 52px;
	margin-left: 50px;
	color: rgba(0, 0, 0, 0.8);
}

div#search {
	/*position: absolute;
	top: 16px;
	right: 16px;
	width: 48px;
	height: 48px;
	background-color: rgba(215, 200, 199, 0.4);
	border-radius: 48px;*/
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(215, 200, 199, 0.4);
	border-radius: 48px;
	z-index: 1;
/*		color: rgba(0, 0, 0, 0.5);*/
/*		backdrop-filter: blur(20px);*/
/*  		-webkit-backdrop-filter: blur(20px);*/
}

div#search_wrap {
	position: relative;
	margin-left: 16px;
	margin-top: 30px;
	margin-bottom: 16px;
	width: calc(100% - 32px);
	height: 52px;
/*		background-color: rgba(210, 195, 194, 0.4);*/
	border-radius: 48px;
	z-index: 5;
}

div#search_wrap.open_search {
	position: fixed;
	top: 16px;
	right: 16px;
	width: 48px;
	height: 48px;
	background-color: rgba(215, 200, 199, 0.4);
	border-radius: 48px;
	z-index: 5;
}

@media (min-width: 1056px) {
	div#search_wrap {
		margin-left: 5%;
		width: calc(90%);
	}
}

@media (min-width: 1520px) {
	div#search_wrap {
		margin-left: 10%;
		width: calc(80%);
	}
}
</style>
