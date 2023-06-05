
<script>
  import MeowScore from '$lib/MeowScore.svelte'
  import Footer from '$lib/Footer.svelte'
  import anime from "animejs";
  import SearchHome from '$lib/SearchHome.svelte'
  import { afterUpdate, onMount } from 'svelte';
  import { scales } from '$lib/helpers.js';

  let overlay_protection = '';
  let disabledScroll = false;
  let y = 0;
  // console.log(scales);
  let kitty = '';

  onMount(() => {
  	// console.log('moiduhsfd');
  	overlay_protection = document.getElementById('overlay');
  	overlay_protection.addEventListener('click', () => {
		is_expanded = !is_expanded;
		toggle_card(expanded_id);
	}, false)
	kitty = document.getElementById('meowhome');
	
  });

  afterUpdate(() => {
		// determine whether we should auto-scroll
		// once the DOM is updated...
  });

  function redirect_to(cityname){
	// console.log(cityname);
	// search_trigger();
}

  function animate_cat(val){
  	// console.log(val)
  	if (kitty == '') return;
  	if (val < 100){
  		kitty.style['-webkit-filter'] = 'blur(0px)';
	  	kitty.style['filter'] = 'blur(0px)';
	  	kitty.style.opacity = 1;
	  	kitty.style.top = 60 - val/50 + '%';
  	} else {
  		kitty.style['-webkit-filter'] = 'blur(' + (val-100)/10 + 'px)';
  		kitty.style['filter'] = 'blur(' + (val-100)/10 + 'px)';
  		kitty.style.opacity = (1 - (val-100)/400);
  		kitty.style.top = 60 - (val)/50 + '%';
  	}
  	



  // -moz-filter: blur(0px);
  // -o-filter: blur(0px);
  // -ms-filter: blur(0px);
  	// anime({
  	// 	targets: '#meowhome',
  	// 	opacity: (1 - val/100),
  	// 	duration: 0,
  	// 	easing: 'easeOutQuad'
  	// })
  }

  $: animate_cat(y)

  $: screenWidth = 0;
  $: screenHeight = 0;


</script>


<svelte:head>
    <title>Meoweler.com</title> 
</svelte:head>

<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight} bind:scrollY={y}/>

<!-- <h1>{y}</h1> -->

<!-- <main class:scroll-lock={disabledScroll}> -->

<div id='overlay'></div>

<div id='meowhome'></div>
<div id='meowhomehuge'></div>

<div class='text_intro'>
	<h2>Meow,<br>meow-meow</h2>
</div>

<SearchHome />

<div id='popular_list'>

	<div class='p1 col'>
	{#each scales.popular as city, i}
	{#if i <= 4}
	<a href='/{city[1].toLowerCase().substring(0,3) + city[1].slice(-1)}/{city[0].toLowerCase()}' class='search_result' on:click={(event) => redirect_to(city[0].replace(/\s+/g, '-').toLowerCase())}>
				<div class='result_img test_img' style="background-image: url(/assets/mini/{city[0].replace(/\s+/g, '').toLowerCase() + '-' + city[1].toLowerCase().substring(0,3) + city[1].slice(-1) + '-t'}.png), url(/assets/mini/random-t.png);"></div>
				<p class='result_text'><span class='cityname'>{city[0]}</span> · <span class='countryname'>{city[1]}</span></p>
	</a>
	{/if}
	{/each}
	</div>


	<div class='p2 col'>
	{#each scales.popular as city, i}
	{#if (i > 4) && (i <= 9)}
	
	<a href='/{city[1].toLowerCase().substring(0,3) + city[1].slice(-1)}/{city[0].toLowerCase()}' class='search_result' on:click={(event) => redirect_to(city[0].replace(/\s+/g, '-').toLowerCase())}>
				<div class='result_img test_img' style="background-image: url(/assets/mini/{city[0].replace(/\s+/g, '').toLowerCase() + '-' + city[1].toLowerCase().substring(0,3) + city[1].slice(-1) + '-t'}.png), url(/assets/mini/random-t.png);"></div>
				<p class='result_text'><span class='cityname'>{city[0]}</span> · <span class='countryname'>{city[1]}</span></p>
	</a>
	
	{/if}
	{/each}
	</div>


	<div class='p3 col'>
	{#each scales.popular as city, i}
	{#if i > 9}
	
	<a href='/{city[1].toLowerCase().substring(0,3) + city[1].slice(-1)}/{city[0].toLowerCase()}' class='search_result' on:click={(event) => redirect_to(city[0].replace(/\s+/g, '-').toLowerCase())}>
				<div class='result_img test_img' style="background-image: url(/assets/mini/{city[0].replace(/\s+/g, '').toLowerCase() + '-' + city[1].toLowerCase().substring(0,3) + city[1].slice(-1) + '-t'}.png), url(/assets/mini/random-t.png);"></div>
				<p class='result_text'><span class='cityname'>{city[0]}</span> · <span class='countryname'>{city[1]}</span></p>
	</a>
	{/if}
	{/each}
	</div>

</div>


<div class="restwrap">

<div class="space_xl"></div>
<div class="space_m"></div>

<div id='meow_foot_wrap'>
	<Footer/>
</div>

</div>


<!-- </main> -->


<style>

	.restwrap {
		background-color: #fff;
	}

	#popular_list {
		padding-left: 16px;
		padding-top: 16px;
/*		width: calc(100% - 32px);*/
		background-color: #fff;
		border-radius: 24px;
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
		width: calc(100% - 32px);
		height: 40px;
/*		margin-top: 12px;*/
		display: block;
		padding: 6px 0px;
/*		background-color: #978;*/
	}

	main {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 0;
	}

	#meowhome, #meowhomehuge {
		width: 90%;
		height: 100%;
		max-width: 600px;
		position: fixed;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: url(/assets/meowhome.png) no-repeat scroll;
		background-size: contain;
		z-index: -1;
	}

	#meowhome {
		mix-blend-mode: darken;
	}

	#meowhomehuge {
		width: 200%;
		height: 200%;
		top: 90%;
		opacity: 0.2;
		-webkit-filter: blur(100px);
		filter: blur(100px);
		z-index: -2;
	}

	h2 {
		font-size: 40px;
		font-weight: 300;
		line-height: 42px;
		color: #000;
		margin-left: 16px;
		margin-top: 50vh;
		z-index: 2;
		display: block;
	}

	@media (min-width: 800px) {

		#meow_foot_wrap {
			margin-left: 5%;
		}

	}


	@media (min-width: 1056px) {



		.col {
			width: 33%;
			float: left;
		}

		.p1 {
			
		}

		.p2 {
			
		}

		.p3 {
			
		}

		h2 {
			margin-left: 5%;
		}

		#popular_list {
			margin-left: 5%;
			padding-left: 0;
			background-color: unset;
		}

		.search_result {
/*			width: 30%;*/
/*			background-color: #098;*/
		}

		.restwrap {
			background-color: unset;
		}
	}

	@media (min-width: 1520px) {
		h2, #popular_list {
			margin-left: 10%;
		}

		.col {
			width: 30%;
			float: left;
		}
	}


</style>















