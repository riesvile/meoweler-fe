
<script>

let search_active = false;
import anime from "animejs";
import cities from '$lib/cunts.json';
import { page } from '$app/stores';
// import { onMount } from 'svelte';

// console.log('testload');
// console.log($page.url.pathname); 

let searchTerm = "";
let search_results = [];
$: render_results = search_results;

// const cities = require('/data/cunts.json');

// $: if (searchTerm.length != 0){
// 	search_results = get_results(searchTerm.toLowerCase());
// 	console.log(search_results);
// } 

$: {
	search_results = get_results(searchTerm.toLowerCase());
	// console.log(search_results);
} 


function redirect_to(cityname){
	// console.log(cityname);
	search_trigger();
}


function update_results(ar){
	let hole = document.getElementById('results');

}


function get_results(q, howmany=7){
	if (q == '') console.log();
	let temp_results = [];
	let co_results = [];
	// console.log('triggered searchc');
	// console.log(q);

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
	// console.log(el_id);

	if (search_active){
		document.querySelector('#search_expanded').style.display = 'block';
		document.querySelector('#search_overlay').style.pointerEvents = 'auto';
		anime({
	  		targets: "#search_expanded",
	  		opacity: 1,
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})
	  	anime({
	  		targets: "#search_overlay",
	  		opacity: 1,
	  		backdropFilter: 'blur(4px)',
  			'-webkit-backdrop-filter': 'blur(4px)',
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})
	  	document.getElementById('query').focus();
	  	search_results = get_results(searchTerm.toLowerCase());
	} else {
		document.querySelector('#search_overlay').style.pointerEvents = 'none';
		anime({
	  		targets: "#search_expanded",
	  		opacity: 0,
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})
	  	anime({
	  		targets: "#search_overlay",
	  		opacity: 0,
	  		backdropFilter: 'blur(0px)',
  			'-webkit-backdrop-filter': 'blur(0px)',
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




{#if $page.url.pathname != '/'}

<div id='search_overlay' on:click={(event) => search_trigger(event)}></div>

<div id='search_wrap'>


<div id='search' on:click={(event) => search_trigger(event)}><span class='ico_search icon_mmm'></span><span class='placehold'>Search...</span></div>


<!-- <div id='search_on_home' on:click={(event) => search_trigger(event)}><span class='ico_search icon_mmm'></span></div> -->

<div id='search_expanded' style=''>

	<input type='search' placeholder="Search..." id='query' autocomplete="off" bind:value={searchTerm}>
	<div class='scrollhack'></div>

	<div id='results'>

		{#each render_results as { ci, co, p }, i}
			<a href='/{co.toLowerCase().substring(0,3) + co.slice(-1)}/{ci.toLowerCase()}' class='search_result' on:click={(event) => redirect_to(ci.replace(/\s+/g, '-').toLowerCase())}>
				<div class='result_img test_img' style="background-image: url('/assets/mini/{ci.replace(/\s+/g, '').replace('\'','').toLowerCase() + '-' + co.toLowerCase().substring(0,3) + co.slice(-1) + '-t'}.png'), url(/assets/mini/random-t.png);"></div>
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

{/if}
<style>


	#search_overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 2;
		opacity: 0;
		display: none;
		pointer-events: none;
	}

	.placehold {
		display: none;
	}

	
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
		transition: 0.1s all;
	}

	.search_result {
		width: 100%;
		height: 40px;
/*		margin-top: 12px;*/
		display: block;
		padding: 6px 0px;
/*		background-color: #978;*/
		transition: 0.1s all;
	}

	.search_result:hover .result_text {
		transform: translateX(2px);
		transition: 0.1s all;
	}

	.search_result:hover .result_img {
/*		transform: scale(1.05);*/
		transition: 0.1s all;
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
		top: 0;
		left: 0;
		width: 48px;
		height: 48px;
		display: block;
		pointer-events: none;
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
		backdrop-filter: blur(20px);
  		-webkit-backdrop-filter: blur(20px);
	}

	div#search_wrap {
		position: fixed;
		top: 16px;
		right: 16px;
		width: 48px;
		height: 48px;
		background-color: rgba(215, 200, 199, 0.4);
		border-radius: 48px;
		z-index: 5;
	}

	div#search_wrap:hover {
		background-color: rgba(215, 200, 199, 0.6);
		cursor: text;
	}

	@media (min-width: 800px) {

		#search_overlay {
			display: block;
		}

		div#search_wrap {
			position: absolute;
			left: auto;
			top: 22px;
			right: 5%;
			height: 40px;
			width: 212px;
		}

		.icon_mmm {
			width: 40px;
			height: 40px;
			top: -4px;
/*			left: -4px;*/
			opacity: 0.72;
		}

		.placehold {
			display: block;
			line-height: 40px;
			margin-left: 42px;
			font-size: 15px;
			color: rgba(0, 0, 0, 0.72);
		}

		#search_expanded {
			position: absolute;
			z-index:2;
			left: auto;
			right: 0;
			width: 420px;
			height: 60px;
			border-radius: 16px;
			overflow: visible;
		}

		#query {
			position: absolute;
			top: 16px;
			left: 20px;
		}

		#results {
			position: absolute;
			top: 64px;
			left: 0;
			background-color: #fff;
			width: 420px;
			box-sizing: border-box;
			padding: 12px 16px;
			border-radius: 16px;
		}

	}

	@media (min-width: 1520px) {
		div#search_wrap {
			right: 10%;
		}
	}


</style>
