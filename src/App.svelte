<script>
	export let client;

	window.client  = client;

	import Form from './components/form.svelte'
	import Posts from './components/posts.svelte'

</script>

<main>
	<div class = "logo">
		<img src = "https://foxql.com/media/logo.png">
		<span>Götüm Yemedi</span>
	</div>

	<div class = "container">
		<div class = "side">
			<Form 
				client = {client}
			/>
		</div>
		<div class = "side">
			<Posts 
				client = {client}
			/>
		</div>	
	</div>

	<a href = "https://play.google.com/store/apps/details?id=com.foxql.twa">
		<img src= "./google_play_icon.png" class = "play-store-icon">
	</a>

	<p><a href="https://svelte.dev/tutorial"><b>FoxQL.com'u</b></a> Ziyaret ederek gönüllü topluluğa katılabilirsin.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1rem;
		margin: 0 auto;
		padding-right: 6rem;
		padding-left: 6rem;
	}

	.logo {
		display: flex;
		color: #eee;
		font-size: 3em;
		font-weight: 100;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
		margin-bottom:2rem;
	}

	.container {
		display: flex;
	}

	.container .side {
		width: 50%;
		padding: 1rem;
		box-sizing: border-box;
		background: rgb(0, 0, 0, 0.5);
		margin-right: 0.5rem;
		border-radius: 4px;
		margin-bottom:0.5rem
	}

	@media (max-width: 920px) {
		main {
			max-width: none;
			padding: 0.5rem;
		}

		.container {
			flex-direction: column;
			margin-top:0.5rem;
		}

		.container .side {
			width: 100%;
		}
		.logo {
			font-size:1.2rem;
			margin: 0rem;
		}

		.logo img {
			width: 32px;
		}
	}

	.play-store-icon {
		width: 120px;
		margin-top: 0.5rem;
	}
	
</style>