
import top from '$lib/top.json';
import top2 from '$lib/top2.json';
import top3 from '$lib/top3.json';
import top4 from '$lib/top4.json';
import top5 from '$lib/top5.json';
import top6 from '$lib/top6.json';
import top7 from '$lib/top7.json';
import top8 from '$lib/top8.json';
import top9 from '$lib/top9.json';
import top10 from '$lib/top10.json';
import top11 from '$lib/top11.json';
import top12 from '$lib/top12.json';
import top13 from '$lib/top13.json';
import top14 from '$lib/top14.json';
import top15 from '$lib/top15.json';
import top16 from '$lib/top16.json';
import top17 from '$lib/top17.json';
import top18 from '$lib/top18.json';
import top19 from '$lib/top19.json';
import top20 from '$lib/top20.json';
import top21 from '$lib/top21.json';
import top22 from '$lib/top22.json';
import top23 from '$lib/top23.json';
import top24 from '$lib/top24.json';
import top25 from '$lib/top25.json';
import bot1 from '$lib/bot1.json';
import cities from '$lib/cunts.json';
import countries from '$lib/countries.json';
import ll from '$lib/latlng.json';

let file_map = {
	p6000000: top,
	p4000000: top2,
	p2000000: top3,
	p1400000: top4,
	p1000000: top5,
	p800000: top6,
	p600000: top7,
	p500000: top8,
	p450000: top9,
	p400000: top10,
	p350000: top11,
	p300000: top12,
	p250000: top13,
	p220000: top14,
	p200000: top15,
	p180000: top16,
	p160000: top17,
	p150000: top18,
	p140000: top19,
	p130000: top20,
	p120000: top21,
	p115000: top22,
	p110000: top23,
	p105000: top24,
	p100000: top25,
	p20000: bot1,

}

function random_int(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function get_city_content(country_short, slug, f){

	// console.log(f)
	let result = file_map[f].filter(function(city){
		let check = (city.name_ascii).toLowerCase();
		let check2 = (city.country).toLowerCase().substring(0,3) + city.country.slice(-1);
		return (check == slug && check2 == country_short);
	});
	return result
}

function get_latlng(country_short, slug){
	let result2 = ll.filter(function(city){
		let check = (city.ci).toLowerCase();
		let check2 = (city.co).toLowerCase().substring(0,3) + city.co.slice(-1);
		return (check == slug && check2 == country_short);
	});
	// console.log('latlng result = ');
	// console.log(result2);
	return result2;
}

function get_country_content(country_name){
	let result = countries.filter(function(country){
		let check = (country.name).toLowerCase();
		return (check == country_name.toLowerCase());
	});
	// console.log(country_name);
	// console.log(result);
	return result
}


function which_file(population){

	console.log('population = ' + population)

	if (population >= 6000000) return 'p6000000';
	if (population >= 4000000) return 'p4000000';
	if (population >= 2000000) return 'p2000000';
	if (population >= 1400000) return 'p1400000';
	if (population >= 1000000) return 'p1000000';
	if (population >= 800000) return 'p800000';
	if (population >= 600000) return 'p600000';
	if (population >= 500000) return 'p500000';
	if (population >= 450000) return 'p450000';
	if (population >= 400000) return 'p400000';
	if (population >= 350000) return 'p350000';
	if (population >= 300000) return 'p300000';
	if (population >= 250000) return 'p250000';
	if (population >= 220000) return 'p220000';
	if (population >= 200000) return 'p200000';
	if (population >= 180000) return 'p180000';
	if (population >= 160000) return 'p160000';
	if (population >= 150000) return 'p150000';
	if (population >= 140000) return 'p140000';
	if (population >= 130000) return 'p130000';
	if (population >= 120000) return 'p120000';
	if (population >= 115000) return 'p115000';
	if (population >= 110000) return 'p110000';
	if (population >= 105000) return 'p105000';
	if (population >= 100000) return 'p100000';
	if (population >= 20000) return 'p20000';

}

function see_next(country_short, slug){
	let next_items = [];


	let temp_results = cities.filter(function(city){
		let check = (city.co).toLowerCase().substring(0,3) + city.co.slice(-1);
		return (check == country_short && city.p >= 110000 && city.ci.toLowerCase() != slug);
	});

	let random = cities.filter(function(city){
		return (city.p >= 160000);
	});

	if (temp_results.length > 1){
		next_items.push(temp_results[Math.floor(Math.random()*temp_results.length)]);
		next_items.push(temp_results[Math.floor(Math.random()*temp_results.length)]);
	}

	let ranlen = random.length;
	let random_indexes = [
		random_int(0, ranlen), 
		random_int(0, ranlen),
		random_int(0, ranlen),
		random_int(0, ranlen),
		random_int(0, ranlen),
		random_int(0, ranlen),
		random_int(0, ranlen),
		random_int(0, ranlen),
	];

	for (let i of random_indexes) {
		next_items.push(random[i])
	}

	return next_items;
}


function check_population(slug, threshold = 1000000){
	let temp_result = {};
	temp_result = cities.filter(function(city){
		let check = (city.ci).toLowerCase();
		return check == slug;
	});
	// console.log('temp');
	// console.log(temp_result[0].p)
	return (which_file(temp_result[0].p));
}


export const load = ({ params }) => {
	// console.log('ttest');
	// console.log(top);
	// if (cities.c)

	let file_to_search = {};
	file_to_search = check_population(params.slug);
	let retreive = get_city_content(params.country, params.slug, file_to_search);

	if(retreive.length === 0)
		return {};

	let retreive2 = get_country_content(retreive[0].country);
	// console.log('huhuh');
	let coor = get_latlng(params.country, params.slug);
	let more_meowsome = see_next(params.country, params.slug);
	// console.log('coor = ' + coor[0].lat);
	// console.log(retreive);
    return {
    	coun: params.country,
        slug: params.slug,
        d: retreive[0],
        c: retreive2[0],
        coor: [coor[0].lat, coor[0].lng],
        more: more_meowsome
    }

	// if (check_population(params.slug)){
	// 	console.log('ask db !!!!!')
	// } else {
	// 	let retreive = get_city_content(params.country, params.slug);
	// 	console.log(retreive);
	//     return {
	//     	coun: params.country,
	//         slug: params.slug,
	//         d: retreive[0]
	//     }
	// }
	
}


