
<script>
  import '../app.css'
  import '../assets.css'
  import Search from '$lib/Search.svelte'
</script>


<a href='/'><h1 id='logo'>Meoweler</h1></a>
<Search/>

<nav>
	
</nav>

<slot />


<style>

	a {
		text-decoration: none;
		color: #000;
	}

	#logo {
		margin-top: 30px;
		margin-left: 16px;
		font-family: Satoshi;
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 1px;
		text-transform: uppercase;
/*		position: absolute;*/
	}

	@media (min-width: 800px) {
		#logo {
/*			color: #f00;*/
			margin-left: 5%;
		}


	}

	@media (min-width: 1520px) {
		#logo {
			margin-left: 10%;
		}
	}

</style>