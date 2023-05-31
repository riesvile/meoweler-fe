
<script>
  
  import { scales } from '$lib/helpers.js';
  import Footer from '$lib/Footer.svelte'

  $: screenWidth = 0;
  $: screenHeight = 0;


</script>


<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight}/>

<main>

	<!-- <h1>{JSON.stringify(data.coun)}</h1> -->

<div>

	<div class='meowilu'></div>

	<h2>MeowScore</h2>

	<p>Imagine a kitty strolling through the city, whiskers twitching in the breeze. The MeowScore reflects whether this city would make her purr in contentment or hiss in displeasure. From unseen elements like weather and safety to more tangible factors that contribute to a city's overall charm, our MeowScore investigates those features most likely to tickle a feline's fancy</p>

	<h3>MeowScore leaderboard</h3>

	{#each scales.leaderboard as city, i}
	<a href='/{city.country.toLowerCase().substring(0,3) + city.country.slice(-1)}/{city.name.toLowerCase()}' class='rank_row'>
		<span class='row_left'><span class='emoji'>🙀</span>{city.name} <span class='country'>· {city.country}</span></span>
		<span class='row_right'>{city.score}<span class='lowlight'>/100</span></span>
	</a>
	{/each}

	<div class='space_xl'></div>

	<div class="space_m"></div>

	<Footer/>

</div>


</main>


<style>

	main {
		background-color: #fff;
	}

	.country {
		color: rgba(0, 0, 0, 0.46);
	}

	.emoji {
		display: inline-block;
		margin-right: 8px;
		font-size: 28px;
		line-height: 40px;
		position: absolute;
		top: -4px;
		left: 0;
	}

	.row_left {
		float: left;
		line-height: 32px;
		margin-left: 40px;
		width: calc(100% - 122px);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #000;
	}

	.row_right {
		float: right;
		line-height: 32px;
		color: #000;
	}

	.rank_row {
		width: calc(100% - 32px);
		height: 40px;
		margin-top: 10px;
		margin-left: 16px;
		clear: both;
		font-size: 20px;
		line-height: 40px;
		position: relative;
		display: block;
	}

	.meowilu {
		width: calc(100% - 32px);
		height: 180px;
		background: url(/assets/meowscore.png);
		background-size: cover;
		margin-left: 16px;
		margin-top: 44px;
		border-radius: 16px;
	}

	h3 {
		font-size: 12px;
		font-weight: 400;
		color: #000;
		margin-left: 16px;
		margin-top: 40px;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	h2 {
		font-size: 36px;
		font-weight: 300;
		line-height: 40px;
		color: #000;
		margin-left: 16px;
		margin-top: 32px;
	}

	p {
		font-size: 20px;
		font-weight: 400;
		line-height: 28px;
		color: #000;
		width: calc(100% - 36px);
		margin-left: 16px;
		margin-top: 22px;
	}

	@media (min-width: 800px) {
		

		.rank_row, .meowilu, h2, p, h3 {
			width: 600px;
			margin-left: 5%;
		}

		.meowilu {
			height: 300px;
		}

		main {
			background-color: #f5f5f5;
		}


	}












</style>














