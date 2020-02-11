<script>
	import Logo from './_components/FetchiQLLogo.svelte'
	import GridArea from './_components/utility/GridArea.svelte'
	import TopNav from './_components/TopNav.svelte'
	import SideNav from './_components/SideNav.svelte'
	import Content from './_components/Content.svelte'
	import Footer from './_components/Footer.svelte'
	import { onMount, onDestroy } from 'svelte'
	import { sideNavState } from './_stores/sideNavState'

	const handleResize = () => {
		if (innerWidth > 600) {
			sideNavState.set({
				desktop: true,
				mobileOpen: false,
				mobileClosed: false,
			})
		} else {
			sideNavState.set({
				desktop: false,
				mobileOpen: false,
				mobileClosed: true,
			})
		}
	}
</script>

<style>
	main {
		padding: 0;
		margin: 0;
		width: 100%;
		min-height: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 225px 1fr 1fr 1fr 1fr;
		grid-template-rows: minmax(1fr, auto) minmax(1fr, auto) minmax(1fr, auto) minmax(1fr, auto) 400px;
		transition: grid-template-columns .3s;
		grid-template-areas:
			'sidebarSpace content content content content'
			'sidebarSpace content content content content'
			'sidebarSpace content content content content'
			'sidebarSpace content content content content'
			'sidebarSpacePurple footer footer footer footer';
	}
	section {
		height: 100%;
		width: 100%;
		background-color: var(--graphql_purple);
	}
</style>

<svelte:window on:resize={handleResize} />
<main
	style={`
		grid-template-columns: ${$sideNavState.desktop ? '225px' : 0} 1fr 1fr 1fr 1fr;
	`}
>
	{#if !$sideNavState.desktop}
	<TopNav />
	{/if}
	<SideNav />
	<GridArea gridArea="sidebarSpace"></GridArea>
	<GridArea gridArea="content"><Content /></GridArea>
	<GridArea gridArea="sidebarSpacePurple"><section /></GridArea>
	<GridArea gridArea="footer"><Footer /></GridArea>
</main>