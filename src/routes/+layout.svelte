
<script>
  import '../app.css'
  import '../assets.css'
  import Search from '$lib/Search.svelte'
</script>


<h1 id='logo'>Meoweler</h1>
<Search/>

<nav>
	
</nav>

<slot />


<style>

	#logo {
		margin-top: 30px;
		margin-left: 16px;
		font-family: Satoshi;
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

</style>