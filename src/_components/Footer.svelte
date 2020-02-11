<script>
  import { get } from 'svelte/store'
  import { sideNavState } from '../_stores/sideNavState'
  import Logo from './FetchiQLLogo.svelte';
  

  const handleClick = () => {
    if (get(sideNavState).mobileOpen) {
      sideNavState.set({
        desktop: false,
        mobileClosed: true,
        mobileOpen: false,
      })
    }
  }
</script>

<style>
  footer {
    margin: 0;
    padding: 15px;
    background-color: var(--graphql_purple);
    height: 300px;
    width: 100%;
  }
  p {
    color: #fff;
    margin: 0 0 0 25px;
  }
</style>

<footer on:click={handleClick}>
  <Logo />

  <p>FetchiQL</p>
  <p>Copyright ©️ 2020 Jeffery Reynolds</p>
  <p>MIT License</p>
</footer>