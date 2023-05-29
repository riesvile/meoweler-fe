
<script>
  import MeowScore from '$lib/MeowScore.svelte'
  import Footer from '$lib/Footer.svelte'
  import anime from "animejs";
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import { scales } from '$lib/helpers.js';
  import sockets from '$lib/sockets.json';
  import bmi from '$lib/bmi.json';

  $: new_object = {
  	'time': '',
  	'sunrise': '',
  	'sunset': '',
  	'day_length': ''
  }

  // let main_object = {
  // 	name: '',
  // 	name_ascii: '',
  // 	net_speed: [0, ''],
  // 	net_availability: [0, ''],
  // 	net_coverage: [0, ''],
  // 	bike_rating: [0, ''],
  // 	walk_rating: [0, ''],
  // 	lgbtq_rating: [0, ''],
  // 	ttd_names: 
  // }

  let months_object = {
  	'january': [],
  	'february': [],

  }

  let overlay_protection = '';
  let disabledScroll = false;
  let internetRating = 0;
  let internetString = '';
  let bikeRating = 0;
  let bikeString = ''
  let walkRating = 0;
  let walkString = ''
  let lgbtqRating = 0;
  let lgbtqString = '';
  let current_city = '';
  let bm_index = 0;
  let currency_converter_link = "";
  // console.log(scales);
  let main_image = "";

  function time_diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
       hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
	}

  async function get_time() {
	  let response = await fetch("http://api.geonames.org/timezoneJSON?lat=" + data.coor[0] + "&lng=" + data.coor[1] + "&username=levmiseri");
	  let jsonData = await response.json();
	  console.log(jsonData);
	  try {
	  	new_object['time'] = jsonData.time.split(" ")[1];
	  	new_object['sunrise'] = jsonData.sunrise.split(" ")[1];
	  	new_object['sunset'] = jsonData.sunset.split(" ")[1];
	  	let day_length = time_diff(new_object['sunrise'], new_object['sunset']);
	  	new_object['day_length'] = day_length.split(":")[0] + 'h ' + day_length.split(":")[1] + 'm';
	  	new_object['timezone_id'] = jsonData.timezoneId;
	  } catch(e) {
	  	console.log(e)
	  }
	  console.log(JSON.stringify(new_object));
	}


  onMount(() => {
  	console.log('moiduhsfd');
  	overlay_protection = document.getElementById('overlay');
  	overlay_protection.addEventListener('click', () => {
			is_expanded = !is_expanded;
			toggle_card(expanded_id);
			// meow_data = data.d.meowscore_object;
			// meowscore = data.d.meowscore;
			// console.log('meowscore = ' + meowscore);
		}, false)
		get_time()
		currency_converter_link = "https://www.google.com/finance/quote/" + data.c.currency_code + "-USD"
		//let temp_internet_rating = data.d.net_speed[0] + data.d.net_availability[0]*2 + data.d.net_coverage[0];
		//console.log('here');
		//console.log('net = ' + (temp_internet_rating / 4));
		//internetRating = temp_internet_rating / 4;
		//console.log(internetRating)
  });

  afterUpdate(() => {
		let temp_internet_rating = data.d.net_speed[0] + data.d.net_availability[0]*2 + data.d.net_coverage[0];
		console.log('here');
		console.log('net = ' + (temp_internet_rating / 4));
		internetRating = temp_internet_rating / 4;
		if (internetRating >= 8){ internetString = scales.internet[0] }
		else if (internetRating >= 7){ internetString = scales.internet[1] }
		else if (internetRating >= 6){ internetString = scales.internet[2] }
		else if (internetRating >= 5){ internetString = scales.internet[3] }
		else { internetString = scales.internet[4] }
		console.log(internetRating)
		console.log(internetString)
		if (current_city != data.d.name_ascii){
			current_city = data.d.name_ascii;
			get_time();
		}
		currency_converter_link = "https://www.google.com/finance/quote/" + data.c.currency_code + "-USD";
		main_image = "background-image: url(https://meowspace.sfo3.cdn.digitaloceanspaces.com/cities/" + data.slug.replace(/\s+/g, '') + "-" + data.coun + ".png), url(/assets/mini/" + data.slug.replace(/\s+/g, '') + "-" + data.coun + "-t.png)";
		try {
			bm_index = Math.round(bmi[data.d.country]['dollar'] * 10) / 10;
		} catch(e) {
			console.log(e)
		}

		// get_time()
  });

  beforeUpdate(() => {
  })

  let expanded_id = '';
  let is_expanded = 0;
  let meow_expanded = 0;
  let offsets = [];
  let card_style_reset = {
  	position: 'absolute',
  	top: 0,
  	left: 0,
  	width: '100%',
  	height: '100%',
  	zIndex: 0
  }
  let card_ids = [
  	'month_visit',
  	'economy',
  	'duration',
  	'tipping',
  	'internet',
  	'socket',
  	'currency',
  	'time',
  	'bike',
  	'walk',
  	'lgbtq',
  	'ttds',
  	'gems'
  ]

  $: screenWidth = 0;
  $: screenHeight = 0;

  $: expanded = expanded_id;

  export let data;

  function expand_card(el){

  }

  function internet_scale(num){
  	if (num >= 9) return 'excellent';
  	if (num >= 7) return 'great';
  	if (num >= 6) return 'good';
  	if (num >= 4) return 'meh';
  	if (num < 4) return 'bad';
  }

  function others_scale(num){
  	// returns index of array value in helpers.js file
  	if (num >= 8) return 0;
  	if (num >= 5) return 1;
  	if (num < 5) return 2;
  }

  function others_card_string(num){
  	if (num >= 8) return 'great';
  	if (num >= 5) return 'meh';
  	if (num < 5) return 'bad';
  }

  function overlay(state){
  	console.log(state);
  	
  	if (state) {
  		overlay_protection.style.pointerEvents = 'auto';
  	} else {
  		overlay_protection.style.pointerEvents = 'none';
  	}

  	anime({
  		targets: overlay_protection,
  		opacity: +state,
  		backdropFilter: 'blur(4px)',
  		'-webkit-backdrop-filter': 'blur(4px)',
  		duration: 200,
  		easing: 'easeOutQuad'
  	})
  }

  function animate_card_content(keep, getout, getin, state2){
  	let state_val = +state2;
  	console.log('state = ' + state_val)
  	

	  	anime({
	  		targets: getout,
	  		opacity: +!state_val,
	  		delay: (+!state_val * 100),
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})

	  	console.log('newopacity = ' + !state_val)

	  	anime({
	  		targets: getin,
	  		opacity: state_val,
	  		delay: (state_val * 100),
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})
  }

  function offset_edges(bottom_edge, right_edge){ 
  	let bottom_offset = bottom_edge - screenHeight;
  	let right_offset = right_edge - screenWidth;
  	let offsets = [bottom_offset > 0 ? bottom_offset : 0, right_offset > 0 ? right_offset : 0]
  	// console.log('bo = ' + bottom_offset);
  	return offsets;
  }

  function toggle_card(element_id){
  	if (element_id == 'meow'){
  		console.log('meoww');
  		meow_expanded = !meow_expanded;
  		overlay(is_expanded);
  		return;
  	}

  	let el = document.getElementById(element_id);
  	let wrap_el = el.querySelector('.card_wrapper')
  	let expanded_el = el.querySelector('.card_content_expanded')
  	let bcr_main = el.getBoundingClientRect();
  	let bcr_expanded = expanded_el.getBoundingClientRect();
  	let anim_keep = wrap_el.getElementsByClassName('keep');
  	let anim_getout = wrap_el.getElementsByClassName('getout');
  	let anim_getin = wrap_el.getElementsByClassName('getin');
  	console.log('offsets:');
  	console.log(offsets);
  	console.log(bcr_expanded)
  	// console.log(bcr_main);


  	let expand_values = {
  		paddingBottom: 0,
  		width: Math.round(bcr_expanded.width) + 'px',
  		height: Math.round(bcr_expanded.height) + 'px',
  		zIndex: 8
  	}

  	Object.assign(expanded_el.style, expand_values)

  	if (is_expanded){
  		overlay(is_expanded);
  		wrap_el.style.position = 'fixed';
	  	wrap_el.style.zIndex = 8;
	  	offsets = offset_edges(bcr_expanded.top + bcr_expanded.height, bcr_expanded.left + bcr_expanded.width);

	  	if (element_id == 'ttds' || element_id == 'gems' || element_id == 'month_visit'){
	  		// wrap_el.classList.toggle('list_expanded');
	  		expanded_el.style.pointerEvents = 'auto';
	  	}

	  	anime({
	  		targets: wrap_el,
	  		left: [Math.round(bcr_main.left) + 'px', Math.round(bcr_main.left - 8 - offsets[1]) + 'px'],
	  		top: [Math.round(bcr_main.top) + 'px', Math.round(bcr_main.top - 12 - offsets[0]) + 'px'],
	  		width: [Math.round(bcr_main.width) + 'px', Math.round(bcr_expanded.width) + 'px'],
	  		height: [Math.round(bcr_main.height) + 'px', Math.round(bcr_expanded.height) + 'px'],
	  		duration: 150,
	  		easing: 'easeOutQuad'
	  	})

	  	// anime({
	  	// 	targets: '.list_row',
	  	// 	height: '82px',
	  	// 	duration: 150,
	  	// 	easing: 'easeInOutQuad'
	  	// })

	  	animate_card_content(anim_keep, anim_getout, anim_getin, is_expanded);

	  	// console.log(expanded_id);
	} else {
		overlay(is_expanded);

		if (element_id == 'ttds' || element_id == 'gems' || element_id == 'month_visit'){
	  		// wrap_el.classList.toggle('list_expanded');
	  		expanded_el.style.pointerEvents = 'none';
	  	}

	  	anime({
	  		targets: wrap_el,
	  		left: [Math.round(bcr_main.left - 8 - offsets[1]) + 'px', Math.round(bcr_main.left) + 'px'],
	  		top: [Math.round(bcr_main.top - 12 - offsets[0]) + 'px', Math.round(bcr_main.top) + 'px'],
	  		width: [Math.round(bcr_expanded.width) + 'px', Math.round(bcr_main.width) + 'px'],
	  		height: [Math.round(bcr_expanded.height) + 'px', Math.round(bcr_main.height) + 'px'],
	  		duration: 150,
	  		easing: 'easeOutQuad',
	  		complete: function(anim) {
			  Object.assign(wrap_el.style, card_style_reset);
			  expanded_el.style.height = 'auto';
			  expanded_el.style.paddingBottom = '16px';
			  if (element_id == 'bike' || element_id == 'walk' || element_id == 'lgbtq') expanded_el.style.height = '80px';
			}
	  	})

	  	// anime({
	  	// 	targets: '.list_row',
	  	// 	height: '32px',
	  	// 	duration: 150,
	  	// 	easing: 'easeInOutQuad'
	  	// })

	  	animate_card_content(anim_keep, anim_getout, anim_getin, is_expanded);

	}
  }

  function click_t(e){
  	console.log('triggered');
  	console.log(e.target.id)
  	let el_id = e.target.id;
  	if (card_ids.includes(el_id)){
  		console.log('293409238759082374029837429347092847290384');
  		expanded_id = el_id;
  		is_expanded = !is_expanded;
  		toggle_card(el_id);
  	} else {
  		console.log('nopenopenopenope');
  		if (el_id == 'close_ttds' || el_id == 'close_gems'){
  			is_expanded = !is_expanded;
  			toggle_card(expanded_id);
  		}

  	}
  }

  function handleMeow(event){
  	if (event.detail.text == 'overlay'){
  		console.log('happened');
  		is_expanded = !is_expanded;
  		expanded_id = 'meow';
  		overlay(is_expanded);
  	} else if (event.detail.text == 'reset'){
  		meow_expanded = 0;
  		// get_time();
  	}
  }



</script>


<svelte:window bind:innerWidth={screenWidth} bind:innerHeight={screenHeight}/>

<main class:scroll-lock={disabledScroll}>

	<!-- <h1>{JSON.stringify(data.coun)}</h1> -->

<div id='overlay'></div>

<div class='text_intro'>
	<a href='#' class='country'>{data.d.country}</a> 
	<h2 id='tagline'><span id='city_in_tagline'>{data.d.name}</span> / {data.d.tagline}</h2>
</div>

<div id='ilu_and_meow'>
	<div id='city_ilu_blown' style={main_image}></div>
	<div id='city_ilu' style={main_image}></div>
	<MeowScore on:message={handleMeow} meow_expanded={meow_expanded} meow_data={data.d.meowscore_object} meowscore={data.d.meowscore}/>
</div>

<div id='snippet_cards'>
	<div id='month_visit' class='card c_1' on:click={(event) => click_t(event)}>
		<div class="card_wrapper">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='card_headline getout'>Best month</h4>
				<p class='card_big_text getout' style='color: #228b22;'>{(data.d.months['recommended-month'] === undefined) ? '' : data.d.months['recommended-month'][0]}</p>
				<p class='card_small_text bottom_aligned getout' style='font-size:16px'>{(data.d.months['recommended-month'] === undefined) ? '' : data.d.months['recommended-month'][1]}</p>
			</div>
			<div class='card_content_expanded'>
				<div id='close_ttds' class='close_card getin'><span class='ico_close'></span></div>
				<!-- <h4 class='card_headline dup'>When to visit</h4> -->
				{#each Object.entries(data.d.months) as [month, value], index}
				{#if !month.toLowerCase().startsWith('r')}

				<div class='list_row row_month getin'>
					{#if value[2] === undefined}
						<span class='list_emoji_big'>M</span>
					{:else}
						<span class='list_emoji_big'>{value[2]}</span>
					{/if}
					<div class='month_wrap'>
						<h5 class="list_head_exp">{month}</h5>
						<p id='ttd1' class='list_para getin'>{value[0]}</p>
					</div>
				</div>

				{/if}
				{/each}

				<div class="space_xl"></div>
				<div class="space_xl"></div>
			</div>
		</div>
	</div>

	<div id='economy' class='card c_13 align_l' on:click={(event) => click_t(event)}>
		<div class="card_wrapper bg_great">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<span class='ico_emoji card_icon keep'>{scales.economy[data.d.economy.economy - 1][0]}</span>
				<p class='card_summary_text midish_aligned getout'>{scales.economy[data.d.economy.economy - 1][1]}</p>
				<p class='card_small_text text_great bottom_aligned getout'>Bigmac <span class=bigmac_price>${bm_index == 0 ? '?' : bm_index}</span></p>
			</div>
			<div class='card_content_expanded'>
				<span class='ico_emoji card_icon dup'>🤑</span>
				<p class='card_medium_text text_great getin'>{data.d.economy.reason}</p>
				<p class='card_medium_text text_great getin'>{data.d.economy.tips}</p>
				<div class='space_xs'></div>
			</div>
		</div>
	</div>
	<div id='duration' class='card c_23 align_r' on:click={(event) => click_t(event)}>
		<div class="card_wrapper">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='card_headline keep'>Usual visit duration</h4>
				<p class='card_big_text keep'>{data.d.visit_duration}</p>
				<p class='card_small_text bottom_aligned getout'>{data.d.duration_reason_short}</p>
			</div>
			<div class='card_content_expanded'>
				<h4 class='card_headline dup'>Usual visit duration</h4>
				<p class='card_big_text dup'>{data.d.visit_duration}</p>
				<p class='card_small_text getin'>{data.d.duration_reason_short}</p>
				<p class='card_small_text getin'>{data.d.duration_reason_long}</p>
			</div>
		</div>
	</div>

	<div id='tipping' class='card c_23 align_l' on:click={(event) => click_t(event)}>
		<div class="card_wrapper">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='card_headline keep'>Tipping</h4>
				<p class='card_big_text keep'>{data.d.tipping_range}</p>
				<p class='card_small_text bottom_aligned getout'>{data.d.tipping_comment}</p>
			</div>
			<div class='card_content_expanded'>
				<h4 class='card_headline dup'>Tipping</h4>
				<p class='card_big_text dup'>{data.d.tipping_range}</p>
				<p class='card_small_text getin'>{data.d.tipping_comment}</p>
				<p class='card_small_text getin'>{data.d.tipping_payculture}</p>
			</div>
		</div>
	</div>
	<div id='internet' class='card c_13 align_r' on:click={(event) => click_t(event)}>
		<div class="card_wrapper bg_{internetString}">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<span class='ico_wifi card_icon keep'></span>
				<p class='card_summary_text bottom_aligned getout'>{internetString} internet situation</p>
			</div>
			<div class='card_content_expanded'>
				<span class='ico_wifi card_icon dup'></span>
				<div class='space_s'></div>
				<p id='speed_head' class='inner_head text_{internet_scale(data.d.net_speed[0])} getin'>{internet_scale(data.d.net_speed[0])} Speed</p>
				<p id='speed_desc' class='text_desc getin'>{data.d.net_speed[1]}</p>
				<div class='space_s'></div>
				<p id='avail_head' class='inner_head text_{internet_scale(data.d.net_availability[0])} getin'>{internet_scale(data.d.net_availability[0])} Availability</p>
				<p id='avail_desc' class='text_desc getin'>{data.d.net_availability[1]}</p>
				<div class='space_s'></div>
				<p id='cell_head' class='inner_head text_{internet_scale(data.d.net_coverage[0])} getin'>{internet_scale(data.d.net_coverage[0])} Cellular</p>
				<p id='cell_desc' class='text_desc getin'>{data.d.net_coverage[1]}</p>
				<div class='space_xs'></div>
			</div>
		</div>
	</div>

	<div id='socket' class='card c_square' on:click={(event) => click_t(event)}>
		<div class="card_wrapper">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<span id='socket_type' class='socket_{data.c.socket_type.toLowerCase()} card_icon_socket keep'></span>
			</div>
			<div class='card_content_expanded'>
				<span id='socket_type' class='socket_{data.c.socket_type.toLowerCase()} card_icon_socket dup'></span>
				<div class='space_s'></div>
				<p id='socket_head' class='inner_head_small getin'>Electric socket type {data.c.socket_type}</p>
				<p id='socket_desc' class='text_desc getin'>{sockets["type-" + data.c.socket_type]}</p>
				<div class='space_xs'></div>
			</div>
		</div>
	</div>
	<div id='currency' class='card c_square' on:click={(event) => click_t(event)}>
		<div class="card_wrapper">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<span id='socket_type' class='ico_socket_j card_icon keep'></span>
				<span id='currency_code' class='getout'>{data.c.currency_code}</span>
			</div>
			<div class='card_content_expanded'>
				<p class='currency_conversion card_in getin'><span id='currency_base'>1 {data.c.currency_code}</span> = <br><span id='currency_target'>? USD</span></p>
				<div class='space_s'></div>
				<a href={currency_converter_link} id='currency_conversion_link' target="_blank" class='external_link card_in getin'>Currency converter</a>
				<div class='space_xs'></div>
			</div>
		</div>
	</div>
	<div id='time' class='card c_2square_rest' on:click={(event) => click_t(event)}>
		<div class="card_wrapper">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='card_headline keep'>{new_object['timezone_id']}</h4>
				<p id='current_time' class='card_big_text keep'>{new_object['time']}</p>
			</div>
			<div class='card_content_expanded'>
				<h4 class='card_headline dup'>{new_object['timezone_id']}</h4>
				<p id='current_time' class='card_big_text dup'>{new_object['time']}</p>
				<div class='space_xs'></div>
				<p class='card_small_col midlight card_in getin'>Sunrise<br>Sunset<br>Day length</p>
				<p class='card_small_col getin'>{new_object['sunrise']}<br>{new_object['sunset']}<br>{new_object['day_length']}</p>
			</div>
		</div>
	</div>

	<div id='bike' class='card c_triplet' on:click={(event) => click_t(event)}>
		<div class="card_wrapper bg_{others_card_string(data.d.bike_rating[0])}">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='inner_head text_centered text_{others_card_string(data.d.bike_rating[0])} getout'>{scales.biking[others_scale(data.d.bike_rating[0])]}</h4>
			</div>
			<div class='card_content_expanded'>
				<p class='card_large_text text_centered text_{others_card_string(data.d.bike_rating[0])} getin'>{data.d.bike_rating[1]}</p>
			</div>
		</div>
	</div>

	<div id='walk' class='card c_triplet' on:click={(event) => click_t(event)}>
		<div class="card_wrapper bg_{others_card_string(data.d.walk_rating[0])}">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='inner_head text_centered text_{others_card_string(data.d.walk_rating[0])} getout'>{scales.walking[others_scale(data.d.walk_rating[0])]}</h4>
			</div>
			<div class='card_content_expanded'>
				<p class='card_large_text text_centered text_{others_card_string(data.d.walk_rating[0])} getin'>{data.d.walk_rating[1]}</p>
			</div>
		</div>
	</div>

	<div id='lgbtq' class='card c_triplet c_last' on:click={(event) => click_t(event)}>
		<div class="card_wrapper bg_{others_card_string(data.d.lgbtq_rating[0])}">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='inner_head text_centered text_{others_card_string(data.d.lgbtq_rating[0])} getout'>{scales.lgbtq[others_scale(data.d.lgbtq_rating[0])]}</h4>
			</div>
			<div class='card_content_expanded'>
				<p class='card_large_text text_centered text_{others_card_string(data.d.lgbtq_rating[0])} getin'>{data.d.lgbtq_rating[1]}</p>
			</div>
		</div>
	</div>

</div>

<div class='space_l'></div>

<div id='rest_content'>
	<div id="rest_content_bg_top"></div>
	<div id="rest_content_bg_bottom"></div>
	<p class='about_text'>{data.d.summary_p1}</p>
	<p class="about_text">{data.d.summary_p2}</p>

	<h3 class='content_headline'>Things to do</h3>

	<div id='ttds' class='card c_1_list' on:click={(event) => click_t(event)}>
		<div class="card_wrapper card_border bg_carded">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='card_headline keep'>The mainstream</h4>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.ttd_emojis[0]}</span><h5 class='list_head'>{data.d.ttd_names[0]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.ttd_emojis[1]}</span><h5 class='list_head'>{data.d.ttd_names[1]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.ttd_emojis[2]}</span><h5 class='list_head'>{data.d.ttd_names[2]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.ttd_emojis[3]}</span><h5 class='list_head'>{data.d.ttd_names[3]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.ttd_emojis[4]}</span><h5 class='list_head'>{data.d.ttd_names[4]}</h5>
				</div>
			</div>
			<div class='card_content_expanded'>
				<div id='close_ttds' class='close_card getin'><span class='ico_close'></span></div>
				<h4 class='card_headline dup'>The mainstream</h4>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.ttd_emojis[0]}</span><h5 class='list_head_exp'>{data.d.ttd_names[0]}</h5>
					<p id='ttd1' class='list_para getin'>{data.d.ttd_descriptions[0]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.ttd_names[0] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.ttd_emojis[1]}</span><h5 class='list_head_exp'>{data.d.ttd_names[1]}</h5>
					<p id='ttd2' class='list_para getin'>{data.d.ttd_descriptions[1]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.ttd_names[1] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.ttd_emojis[2]}</span><h5 class='list_head_exp'>{data.d.ttd_names[2]}</h5>
					<p id='ttd3' class='list_para getin'>{data.d.ttd_descriptions[2]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.ttd_names[2] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.ttd_emojis[3]}</span><h5 class='list_head_exp'>{data.d.ttd_names[3]}</h5>
					<p id='ttd4' class='list_para getin'>{data.d.ttd_descriptions[3]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.ttd_names[3] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.ttd_emojis[4]}</span><h5 class='list_head_exp'>{data.d.ttd_names[4]}</h5>
					<p id='ttd5' class='list_para getin'>{data.d.ttd_descriptions[4]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.ttd_names[4] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class="space_xl"></div>
				<div class="space_l"></div>
			</div>
		</div>
	</div>

	<div id='gems' class='card c_1_list' on:click={(event) => click_t(event)}>
		<div class="card_wrapper card_border bg_carded">
			<div class='card_background'></div>
			<div class='card_content_collapsed'>
				<h4 class='card_headline keep'>Off the beaten path</h4>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.gems_emojis[0]}</span><h5 class='list_head'>{data.d.gems_names[0]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.gems_emojis[1]}</span><h5 class='list_head'>{data.d.gems_names[1]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.gems_emojis[2]}</span><h5 class='list_head'>{data.d.gems_names[2]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.gems_emojis[3]}</span><h5 class='list_head'>{data.d.gems_names[3]}</h5>
				</div>
				<div class='list_row getout'>
					<span class='list_emoji'>{data.d.gems_emojis[4]}</span><h5 class='list_head'>{data.d.gems_names[4]}</h5>
				</div>
			</div>
			<div class='card_content_expanded'>
				<div id='close_gems' class='close_card getin'><span class='ico_close'></span></div>
				<h4 class='card_headline dup'>Off the beaten path</h4>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.gems_emojis[0]}</span><h5 class='list_head_exp'>{data.d.gems_names[0]}</h5>
					<p id='ttd1' class='list_para getin'>{data.d.gems_descriptions[0]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.gems_names[0] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.gems_emojis[1]}</span><h5 class='list_head_exp'>{data.d.gems_names[1]}</h5>
					<p id='ttd2' class='list_para getin'>{data.d.gems_descriptions[1]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.gems_names[1] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.gems_emojis[2]}</span><h5 class='list_head_exp'>{data.d.gems_names[2]}</h5>
					<p id='ttd3' class='list_para getin'>{data.d.gems_descriptions[2]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.gems_names[2] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.gems_emojis[3]}</span><h5 class='list_head_exp'>{data.d.gems_names[3]}</h5>
					<p id='ttd4' class='list_para getin'>{data.d.gems_descriptions[3]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.gems_names[3] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class='list_row getin'>
					<span class='list_emoji'>{data.d.gems_emojis[4]}</span><h5 class='list_head_exp'>{data.d.gems_names[4]}</h5>
					<p id='ttd5' class='list_para getin'>{data.d.gems_descriptions[4	]}</p>
					<a href='https://www.google.com/maps/search/?api=1&query={data.d.gems_names[4] + ' ' + data.d.name_ascii}' class='gmaps_link' target="_blank"><span class="link_icon ico_gmaps_36"></span>Google Maps</a>
				</div>
				<div class="space_xl"></div>
				<div class="space_l"></div>
			</div>
		</div>
	</div>

	<h3 class='content_headline'>Mindful meowler tips</h3>

</div>

<div id='restrest'>

<div id='mindful_master_wrap'>
	<div id='mindful_meowler_wrap'>
		{#if data.d.mindful_meoweler !== undefined}
		{#each Object.entries(data.d.mindful_meoweler) as [tipnum, tip], index}
		{#if (Object.entries(data.d.mindful_meoweler).length == (index + 1))}
		<div class='meow_tip tip_last'>
			<div class='meow_tip_img'></div>
			<h4 class='meow_tip_head'>{tip[0]}</h4>
			<p class='meow_desc'>{tip[1]}</p>
		</div>
		{:else}
		<div class='meow_tip'>
			<div class='meow_tip_img'></div>
			<h4 class='meow_tip_head'>{tip[0]}</h4>
			<p class='meow_desc'>{tip[1]}</p>
		</div>
		{/if}
		{/each}
		{/if}
	</div>
</div>

<div class="space_xl"></div>
<div class="space_m"></div>

<Footer/>

</div>

</main>


<style>

	.bigmac_price {
		float: right;
	}

	#socket_desc {
		padding-right: 8px;
	}

	#mindful_master_wrap {
		/*white-space: nowrap;
		overflow: scroll;
		display: flex;
		width: 800%;
		height: 100px;
		background-color: #828;*/

		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-flow: column nowrap;
		height: 100%;

	}

	#mindful_meowler_wrap {
		display: flex;
		overflow: auto;
		flex: none;
		scroll-snap-type: x mandatory;
		width: 100%;
		flex-flow: row nowrap;
	}

	#mindful_meowler_wrap::-webkit-scrollbar {
	    display: none;
	}

	.meow_tip {
		width: 77%;
/*		height: 100px;*/
		scroll-snap-align: start;
		flex: none;
		padding-left: 16px;
	}

	.tip_last {
		padding-right: 16px;
	}

	.meow_tip_img {
		width: 100%;
		height: 200px;
		background-color: #038;
		border-radius: 24px 24px 12px 12px;
	}

	h4.meow_tip_head {
		font-size: 20px;
		font-weight: 400;
		line-height: 24px;
		margin-top: 16px;
	}

	p.meow_desc {
		font-size: 16px;
		font-weight: 400;
		line-height: 22px;
		color: rgba(0, 0, 0, 0.72);
		width: 94%;
		margin-top: 8px;
	}

	#restrest {
		background-color: #fff;
	}

	.close_card {
		width: 56px;
		height: 56px;
		position: fixed;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #fff;
		box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.24);
		border-radius: 56px;
		z-index: 10;
	}

	.close_card span {
		width: 48px;
		height: 48px;
		display: block;
		position: absolute;
		top: 4px;
		left: 4px;
		pointer-events: none;
	}

	.gmaps_link {
		font-size: 14px;
		font-weight: 400;
		line-height: 36px;
		display: inline-block;
		text-decoration: none;
		color: rgba(0, 0, 0, 0.6);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 36px;
		padding: 0 12px 0 35px;
		position: relative;
/*		pointer-events: auto;*/
		margin: 12px 0 12px 16px;
	}

	.link_icon {
		display: block;
		width: 36px;
		height: 36px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.row_month {
		padding-top: 20px;
	}

	.list_para {
		font-size: 14px;
		line-height: 20px;
		margin-left: 16px;
		margin-top: 10px;
		color: rgba(0, 0, 0, 0.6);
		clear: both;
	}

	.month_wrap {
		float: left;
		width: calc(100% - 60px - 16px);
		margin-left: 16px;
		margin-top: -8px;
		margin-bottom: 28px;
	}

	.month_wrap .list_para {
		margin-left: 0;
		margin-top: 0px;
		font-size: 14px;
	}

	.month_wrap h5.list_head_exp {
		font-size: 16px;
	}

	.month_wrap h5.list_head_exp::first-letter {
		text-transform: uppercase;
	}

	.list_emoji_big {
		font-size: 32px;
		margin-left: 20px;
		width: 32px;
		height: 32px;
		float: left;
	}

	.list_emoji {
		font-size: 24px;
		margin-left: 16px;
		margin-right: 12px;
		float: left;
/*		width: 30px;*/
    overflow: hidden;
    white-space: nowrap;
		line-height: 32px;
	}

	h5.list_head {
		font-size: 24px;
		font-weight: 400;
		line-height: 32px;
		color: rgba(0, 0, 0, 0.96);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	h5.list_head_exp {
		font-size: 20px;
		font-weight: 400;
		line-height: 32px;
		color: rgba(0, 0, 0, 0.96);
		width: calc(100% - 60px);
		float: left;
		margin-bottom: 8px;
	}

	.list_row {
		width: 100%;
		height: 32px;
		margin-top: 16px;
/*		white-space: nowrap;*/
/*		transition: all 0.2s;*/
	}

	#ttds .list_row, #gems .list_row, #month_visit .list_row {
		width: calc(100% - 16px);
		height: auto;
		margin-top: 16px;
/*		transition: all 0.2s;*/
	}

	h3.content_headline {
		font-size: 32px;
		font-weight: 400;
		color: #000;
		margin-bottom: 20px;
		margin-left: 4px;
		margin-top: 40px;
	}

	#rest_content {
		width: calc(100% - 32px);
		padding: 0 16px 16px 16px;
/*		background: red;*/
		position: relative;
/*		z-index: -1;*/
		overflow: hidden;
	}

	#rest_content_bg_top {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 200px;
		z-index: -1;
		background: rgb(255,255,255);
		background: linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
	}

	#rest_content_bg_bottom {
		position: absolute;
		top: 200px;
		left: 0;
		width: 100%;
		height: 1400px;
		background: rgb(255,255,255);
		z-index: -1;
	}

	.about_text {
		font-size: 20px;
		line-height: 28px;
		margin-left: 4px;
		margin-bottom: 20px;
	}

	.card_wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
		border-radius: 20px;
	}

	.card_border {
		border: 1px solid rgba(0,0,0,0.16);
	}

	#snippet_cards {
		margin-top: 36px;
		margin-left: 16px;
		width: calc(100% - 32px);
	}

	.col {
		float: left;
	}

	.card_content_collapsed {
		position: relative;
	}

	.card_icon {
		display: block;
		width: 40px;
		height: 40px;
		margin-top: 16px;
		margin-left: 16px;
		font-size: 28px;
	}

	.card_icon_socket {
		display: block;
		width: 56px;
		height: 56px;
		margin-top: 12px;
		margin-left: 12px;
	}

	.inner_head {
		font-size: 20px;
		margin-left: 18px;
		margin-bottom: 2px;
	}

	.inner_head::first-letter {
		text-transform: uppercase;
	}

	.inner_head_small {
		font-size: 16px;
		font-weight: 500;
		margin-left: 18px;
		margin-bottom: 4px;
	}

	.text_centered {
		margin-left: 0;
		text-align: center;
		font-weight: 400;
		line-height: 24px;
		/*height: 80px;
		display: table-cell;
		vertical-align: middle;*/
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% - 16px);
	}

	.text_desc {
		font-size: 15px;
		margin-left: 18px;
		color: rgba(0, 0, 0, 0.6);
	}

	h4.card_headline {
		font-size: 12px;
		font-weight: 500;
		color: rgba(0,0,0,0.8);
		margin-left: 16px;
		margin-top: 14px;
	}

	.card_big_text {
		font-size: 32px;
		margin-left: 16px;
	}

	.card_big_text::first-letter {
		text-transform: uppercase;
	}

	.card_small_text, .card_medium_text {
		font-size: 14px;
		line-height: 18px;
		margin-left: 16px;
		margin-top: 8px;
		width: calc(100% - 32px);
		color: rgba(0,0,0,0.6);
	}

	.card_medium_text {
		font-size: 16px;
		line-height: 23px;
	}

	.card_large_text {
		font-size: 18px;
		line-height: 23px;
	}

	.card_small_col {
		font-size: 14px;
		line-height: 22px;
		width: auto;
		float: left;
		margin-right: 12px;
	}

	.card_summary_text {
		font-size: 16px;
		line-height: 19px;
		margin-left: 16px;
		padding-right: 10px;
	}

	.card_summary_text::first-letter {
		text-transform: uppercase;
	}

	.bottom_aligned {
		position: absolute;
		bottom: 16px;
	}

	.midish_aligned {
		position: absolute;
		bottom: 44px;
	}

	.card_background {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.card_content_collapsed, .card_content_expanded {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}


	.c_1 .card_content_expanded {
		width: calc(100% + 16px);
		height: auto;
		max-height: 90vh;
/*		padding-bottom: 16px;*/
		overflow: scroll;
		overscroll-behavior: contain;
		/*left: auto;
		right: 0;*/
/*		background-color: rgba(255, 255, 255, 0.99);*/
		z-index: 8;
	}

	.c_1_list .card_content_expanded {
		width: calc(100% + 16px);
		height: auto;
		max-height: 90vh;
/*		padding-bottom: 16px;*/
		overflow: scroll;
		overscroll-behavior: contain;
		/*left: auto;
		right: 0;*/
/*		background-color: rgba(255, 255, 255, 0.99);*/
		z-index: 8;
	}

	.c_23 .card_content_expanded {
		width: 120%;
		height: auto;
		padding-bottom: 16px;
/*		background-color: rgba(20, 250, 50, 0.3);*/
		z-index: 8;
/*		margin-top: 2px;*/
	}

	.c_13 .card_content_expanded {
		width: 250%;
		max-width: 280px;
		height: auto;
		padding-bottom: 16px;
		/*left: auto;
		right: 0;*/
/*		background-color: rgba(255, 255, 255, 0.99);*/
		z-index: 8;
	}

	.c_square .card_content_expanded {
		width: 250%;
		max-width: 200px;
		height: auto;
		padding-bottom: 16px;
		z-index: 8;
	}

	.c_2square_rest .card_content_expanded {
		width: 120%;
		max-width: 200px;
		height: auto;
		padding-bottom: 16px;
		z-index: 8;
	}

	.c_triplet .card_content_expanded {
		width: 160%;
		height: 80px;
		padding-bottom: 16px;
		z-index: 8;
	}


	.card {
/*		background-color: #fff;*/
		border-radius: 20px;
		margin-bottom: 16px;
		position: relative;
	}

	.card_in {
		margin-left: 18px;
	}
	
	.c_1 {
		width: 100%;
		height: 148px;
	}

	.c_1_list {
		width: 100%;
		height: 300px;
	}

	.c_23 {
		width: 64%;
		height: 148px;
	}

	.c_13 {
		height: 148px;
		width: calc(100% - 64% - 16px);
	}

	.align_l {
		float: left;
	}

	.align_r {
		float: right;
	}

	.c_square {
		width: 80px;
		height: 80px;
		float: left;
		margin-right: 16px;
	}

	.c_2square_rest {
		height: 80px;
		width: calc(100% - 160px - 32px);
		float: left;
	}

	.c_triplet {
		height: 80px;
		width: calc(33.3% - 11px);
		float: left;
		margin-right: 16px;
	}

	.c_last {
		margin-right: 0px;
	}

	#currency_code {
		font-size: 24px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	#currency_conversion_link {
		pointer-events: auto;
	}

	.currency_conversion {
		font-size: 24px;
		line-height: 30px;
		margin-top: 18px;
	}

	#current_time {
		margin-top: -2px;
	}

	.dup {
		opacity: 0;
	}

	.getin {
		opacity: 0;
	}

	#overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 5;
		opacity: 0;
		pointer-events: none;
	}

	.text_intro {
		margin-top: 36px;
		margin-left: 16px;
		width: calc(100% - 32px);
	}

	#tagline {
		font-size: 36px;
		font-weight: 300;
		line-height: 40px;
		color: hsla(357, 70%, 30%, 0.62);
	}

	#city_in_tagline {
		color: #000;
	}

	.country {
		font-size: 16px;
		font-weight: 400;
		text-decoration: none;
		color: #000;
		margin-bottom: 8px;
		display: inline-block;
	}

	#ilu_and_meow {
		width: calc(100% - 16px);
		height: 260px;
		margin-top: 32px;
		margin-left: 16px;
		position: relative;
/*		overflow: hidden;*/
	}

	#city_ilu {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 20px;
		background-size: cover;
		border-radius: 20px 0 0 20px;
	}

	#city_ilu_blown {
		position: fixed;
		top: 60px;
		left: -100px;
		width: 200vw;
		height: 60vh;
		background-size: cover;
		filter: blur(80px);
		opacity: 0.16;
		pointer-events: none;
		z-index: -1;
	}


</style>