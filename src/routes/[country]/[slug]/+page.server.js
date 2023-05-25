
import top from '$lib/top.json';
import top2 from '$lib/top2.json';
import top3 from '$lib/top3.json';
import top4 from '$lib/top4.json';
import top5 from '$lib/top5.json';
import cities from '$lib/cunts.json';

let latest_data = [
	{
		name_ascii: 'Tokyo',
		population: 24923000
	},
	{
		name_ascii: 'Toma',
		population: 4923000
	},
	{
		name_ascii: 'London',
		population: 24923000
	}
];

let file_map = {
	p6000000: top,
	p4000000: top2,
	p2000000: top3,
	p1400000: top4,
	p1000000: top5
}


function get_city_content(country_short, slug, f){

	console.log(f)
	let result = file_map[f].filter(function(city){
		let check = (city.name_ascii).toLowerCase();
		let check2 = (city.country).toLowerCase().substring(0,3) + city.country.slice(-1);
		return (check == slug && check2 == country_short);
	});
	return result
}


function which_file(population){

	console.log('population = ' + population)

	if (population > 6000000) return 'p6000000';
	if (population > 4000000) return 'p4000000';
	if (population > 2000000) return 'p2000000';
	if (population > 1400000) return 'p1400000';
	if (population > 1000000) return 'p1000000';

}


function check_population(slug, threshold = 1000000){
	let temp_result = {};
	temp_result = cities.filter(function(city){
		let check = (city.ci).toLowerCase();
		return check == slug;
	});
	console.log('temp');
	console.log(temp_result[0].p)
	return (which_file(temp_result[0].p));
}


export const load = ({ params }) => {
	console.log('ttest');
	// console.log(top);
	// if (cities.c)

	let file_to_search = {};
	file_to_search = check_population(params.slug);
	let retreive = get_city_content(params.country, params.slug, file_to_search);
	console.log(retreive);
    return {
    	coun: params.country,
        slug: params.slug,
        d: retreive[0]
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


