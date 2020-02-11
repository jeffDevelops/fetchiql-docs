<script>
  import Logo from './FetchiQLLogo.svelte'
  import { sideNavState } from '../_stores/sideNavState'
</script>

<style>
  aside {
    position: fixed;
    top: 0;
    transition: left .3s;
    width: 225px;
    height: 100vh;
    padding: 15px;
    transform: translateX(-5px);
    box-shadow: var(--box-shadow-right);
    background-color: #fff;
    z-index: 11;
  }
  a {
    padding: 7px 15px 7px 50px;
    display: block;
    color: var(--graphql_purple);
    cursor: pointer;
    line-height: 1em;
  }
</style>

<aside style="left: {$sideNavState.desktop || $sideNavState.mobileOpen ? '0' : '-225px'};">
  <Logo />
  <a href="#the_problem">The problem</a>
  <a href="#how_it_works">How it works</a>
  <a href="#getting_started">Getting started</a>
  <a href="#setup">Setup</a>
  <a href="#make_a_one-off_request">Make a one-off request</a>
  <a href="#make_lots_of_requests_with_one_config">Make lots of requests with one config</a>
  <a href="#aborting_requests">Aborting requests</a>
  <a href="#api_reference">API Reference</a>
</aside>