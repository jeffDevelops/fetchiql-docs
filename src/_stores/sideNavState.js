import { writable } from 'svelte/store'

const determineInitialState = () => window.innerWidth > 600 ? {
  desktop: true,
  mobileOpen: false,
  mobileClosed: false,
} : {
  desktop: false,
  mobileOpen: false,
  mobileClosed: true,
}

const initialState = determineInitialState()

export const sideNavState = writable(initialState)
