<script>
  import { sideNavState } from '../_stores/sideNavState'
  const handleClick = () => {
    sideNavState.set({
      desktop: false,
      mobileClosed: false,
      mobileOpen: true,
    })
  }
</script>
<style>
  nav {
    height: 55px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--graphql-purple);
    box-shadow: var(--box-shadow-bottom);
    z-index: 10;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  div {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15px;
    height: 10px;
  }
  .bar {
    height: 1px;
    width: 100%;
    background-color: #fff;
  }
  p {
    color: #fff;
  }
</style>

<nav>
  <div on:click={handleClick}>
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
  </div>
  <p>FetchiQL</p>
</nav>