
<script>
	
	import { createEventDispatcher } from 'svelte';
	import anime from "animejs";
	import { scales } from '$lib/helpers.js';

	export let meow_expanded;
	export let meow_data;
	export let meowscore;

	const dispatch = createEventDispatcher();

	$: if (meow_expanded == 1) {
		score_details(0);
		dispatch('message', {
			text: 'reset'
		});
	}

	// function overlay(state){
	//   	console.log(state);
	  	
	//   	if (state) {
	//   		overlay_protection.style.pointerEvents = 'auto';
	//   	} else {
	//   		overlay_protection.style.pointerEvents = 'none';
	//   	}

	//   	anime({
	//   		targets: overlay_protection,
	//   		opacity: +state,
	//   		backdropFilter: 'blur(4px)',
	//   		'-webkit-backdrop-filter': 'blur(4px)',
	//   		duration: 200,
	//   		easing: 'easeOutQuad'
	//   	})
	// }

	function score_details(state = 1){
		// console.log(e.target.id)
		console.log('tetet');

		if (state){
			document.getElementById('meow_score_expanded').style.opacity = 1;
			document.getElementById('meow_score').style.zIndex = 5;

			anime({
		  		targets: '#meow_score',
		  		backgroundColor: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	anime({
		  		targets: '#meow_score_expanded',
		  		scale: [0.8, 1],
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	anime({
		  		targets: '#meow_score_summary',
		  		translateX: ['0px', '8px'],
		  		translateY: ['0px', '12px'],
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	anime({
		  		targets: '#meow_what',
		  		opacity: 1,
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	dispatch('message', {
				text: 'overlay'
			});

		} else {
			// document.getElementById('meow_score_expanded').style.opacity = 0;
			

			anime({
		  		targets: '#meow_score',
		  		backgroundColor: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	anime({
		  		targets: '#meow_score_expanded',
		  		scale: [1, 0.8],
		  		opacity: 0,
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	anime({
		  		targets: '#meow_score_summary',
		  		translateX: ['8px', '0px'],
		  		translateY: ['12px', '0px'],
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	anime({
		  		targets: '#meow_what',
		  		opacity: 0,
		  		duration: 150,
		  		easing: 'easeOutQuad'
		  	})

		  	setTimeout(() => {
			  document.getElementById('meow_score').style.zIndex = 4;
			}, 150);

		}

		

	}

	function meow_emoji(num){
		if (num >= 9) return scales.meow[4]
		if (num >= 7) return scales.meow[3]
		if (num >= 5) return scales.meow[2]
		if (num >= 4) return scales.meow[1]
		if (num < 4) return scales.meow[0]
	}

	function meowscore_emoji(num){
		if (num > 100) return scales.meow[5];
		if (num >= 91) return scales.meow[4];
		if (num >= 81) return scales.meow[3];
		if (num >= 71) return scales.meow[2];
		if (num >= 61) return scales.meow[1];
		return scales.meow[0];
	}



</script>


<div id='meow_score'>
	<div id='meow_score_summary' on:click={(event) => score_details()}>
		<span id='meow_summary_emoji'>{meowscore_emoji(meowscore)}</span>{meowscore}<span class='dimmed'>/100</span>
	</div>
	<div id='meow_what'>What is MeowScore?</div>
	<div id='meow_score_expanded'>
		<div class='meow_score_item'>
			<span class='score_item_text'>🐈 Cats in the city</span>
			<span class='score_item_rating'>{meow_emoji(meow_data['cats-in-city'][0])}</span>
		</div>
		<div class='meow_score_item'>
			<span class='score_item_text'>☀️ Sun-soaked days</span>
			<span class='score_item_rating'>{meow_emoji(meow_data['sunny-days'][0])}</span>
		</div>
		<div class='meow_score_item'>
			<span class='score_item_text'>🚗 Traffic density</span>
			<span class='score_item_rating'>{meow_emoji(meow_data['traffic'][0])}</span>
		</div>
		<div class='meow_score_item'>
			<span class='score_item_text'>🔈 Noisiness</span>
			<span class='score_item_rating'>{meow_emoji(meow_data['noisiness'][0])}</span>
		</div>
		<div class='meow_score_item'>
			<span class='score_item_text'>📸 Views and Sightseeing</span>
			<span class='score_item_rating'>{meow_emoji(meow_data['sightseeing-and-views'][0])}</span>
		</div>
		<div class='meow_score_item'>
			<span class='score_item_text'>🌳 Parks and greenery</span>
			<span class='score_item_rating'>{meow_emoji(meow_data['parks-and-greenery'][0])}</span>
		</div>
		<div class='meow_score_item'>
			<span class='score_item_text'>👮‍♂️ Safety</span>
			<span class='score_item_rating'>{meow_emoji(meow_data['safety'][0])}</span>
		</div>
		<div class='space_s'></div>
	</div>
</div>

<style>

	/*#meow_background {
		width: 100%;
		height: 100%;
		background-color: #ff0;
		z-index: 100;
	}*/

	#meow_score {
		background-color: rgba(255, 255, 255, 0);
		position: absolute;
		top: 0;
		left: 0;
		font-size: 20px;
		font-weight: 400;
		border-radius: 16px;
		width: calc(100% - 40px);
		line-height: 40px;
/*		height: 40px;*/
		padding-top: 52px;
		padding-left: 20px;
		pointer-events: none;
		z-index: 1;
	}

	#meow_what {
		position: absolute;
		top: 12px;
		right: 16px;
		font-size: 16px;
		color: #7B55A2;
		opacity: 0;
	}

	#meow_summary_emoji {
		position: absolute;
		top: 0;
		left: 10px;
		font-size: 28px;
		pointer-events: auto;
	}

	#meow_score_summary {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #fff;
		display: inline-block;
		padding: 0px 12px 0px 42px;
		border-radius: 16px;
		font-size: 24px;
		pointer-events: auto;
/*		transform: translate(8px, 12px);*/
	}

	#meow_score_summary_wrap {
		position: relative;
		top: 0;
		left: 0;

	}

	.meow_score_item {
		width: calc(100% - 16px);
	}

	.score_item_text {
		width: 72%;
		display: inline-block;
	}

	.score_item_rating {
		width: 28%;
		display: inline-block;
		float: right;
		text-align: right;
		font-size: 28px;
	}
	
	#meow_score_expanded {
		opacity: 0;
		transform-origin: top left;
		transform: scale(0.8);
/*		background-color: #fff;*/
	}



	/*#meow_score {
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		font-size: 24px;
		font-weight: 400;
		border-radius: 16px;
		line-height: 40px;
		padding: 0px 12px 0px 10px;
	}

	#meow_summary_emoji {
		margin-right: 4px;
		line-height: 40px;
		font-size: 28px;
	}*/
</style>