import { Outlet } from 'react-router-dom'

import footballImage from './img/football.jpg'

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from 'flowbite-react'

export const Nav = () => {
  return (
    <div>
      <Navbar fluid={true} rounded={true}>
        <NavbarBrand href="https://flowbite-react.com">
          <img
            alt="Football players"
            className="mr-3 h-6 sm:h-9"
            src={footballImage}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            FootballPlayer
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button gradientMonochrome="cyan">Get started</Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink className="text-lg" href="/">
            Home
          </NavbarLink>
          <NavbarLink className="text-lg" href="/newplayer">
            Add a new Player
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <Outlet />
    </div>
  )
}
