
<script>

	export let more_meowsome;

</script>

<div id='meowsome_destinations'>
	<h4 class='tiny_headline'>Other meowsome destinations</h4>

	<div id='results'>

		<div class='part1'>
		{#each more_meowsome as { ci, co, p }, i}
		{#if i < 5}
			<a href='/{co.toLowerCase().substring(0,3) + co.slice(-1)}/{ci.toLowerCase()}' class='search_result'>
				<div class='result_img test_img' style="background-image: url('/assets/mini/{ci.replace(/\s+/g, '').replace('\'','').toLowerCase() + '-' + co.toLowerCase().substring(0,3) + co.slice(-1) + '-t'}.png'), url(/assets/mini/random-t.png);"></div>
				<p class='result_text'><span class='cityname'>{ci}</span> · <span class='countryname'>{co}</span></p>
			</a>
		{/if}
		{/each}
		</div>

		<div class='part2'>
		{#each more_meowsome as { ci, co, p }, i}
		{#if i >= 5}
			<a href='/{co.toLowerCase().substring(0,3) + co.slice(-1)}/{ci.toLowerCase()}' class='search_result'>
				<div class='result_img test_img' style="background-image: url('/assets/mini/{ci.replace(/\s+/g, '').replace('\'','').toLowerCase() + '-' + co.toLowerCase().substring(0,3) + co.slice(-1) + '-t'}.png'), url(/assets/mini/random-t.png);"></div>
				<p class='result_text'><span class='cityname'>{ci}</span> · <span class='countryname'>{co}</span></p>
			</a>
		{/if}
		{/each}
		</div>

	</div>

</div>



<style>

	.part2 {
		display: none;
	}

	h4.tiny_headline {
		font-size: 13px;
		font-weight: 500;
		color: rgba(0,0,0,1);
		margin-left: 16px;
		margin-top: 14px;
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
		transition: 0.2s all;
	}

	.search_result:hover .cityname {
		color: #7B55A2;
		transition: 0.2s all;
	}

	.search_result:hover .result_img {
/*		transform: scale(1.05);*/
		transition: 0.2s all;
	}

	#results {
		margin-top: 20px;
		margin-left: 16px;
		margin-bottom: 20px;
		/*position: fixed;
		top: 80px;
		left: 16px;
		width: calc(100% - 32px)*/
	}


	@media (min-width: 1020px) {
		.search_result {
/*			width: 40%;*/
		}

		.part1, .part2 {
			width: 40%;
			float: left;
			margin-right: 16px;
			display: block;
		}

		h4.tiny_headline {
			margin-left: 0;
		}

		#results {
			margin-left: 0;
		}

	}

	@media (min-width: 1220px) {
		.search_result {
/*			width: 40%;*/
		}

		.part1, .part2 {
			width: 400px;
			float: left;
			margin-right: 16px;
			display: block;
		}

		h4.tiny_headline {
			margin-left: 0;
		}

		#results {
			margin-left: 0;
		}

	}


</style>


