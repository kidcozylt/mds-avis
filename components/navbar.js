'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  AcademicCapIcon,
  Bars3Icon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon, PencilSquareIcon, StarIcon } from '@heroicons/react/20/solid'

const categories = [
  {
    name: 'Écoles de commerce',
    description: 'HEC, ESSEC, EM Lyon, écoles postbac...',
    href: '#',
    icon: BriefcaseIcon,
  },
  {
    name: "Écoles d'ingénieurs",
    description: 'Polytechnique, Centrale, INSA...',
    href: '#',
    icon: ComputerDesktopIcon,
  },
  {
    name: 'Universités',
    description: 'Licences, masters, doctorats',
    href: '#',
    icon: BuildingLibraryIcon,
  },
  {
    name: 'Écoles internationales',
    description: 'Études à l’étranger, double diplôme',
    href: '#',
    icon: GlobeAltIcon,
  },
  {
    name: 'Formations professionnelles',
    description: 'BTS, BUT, alternance',
    href: '#',
    icon: AcademicCapIcon,
  },
]

const quickActions = [
  { name: 'Rechercher une école', href: '#', icon: MagnifyingGlassIcon },
  { name: 'Déposer un avis', href: '#/avis/nouveau', icon: PencilSquareIcon },
]

function getCookie(name) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(Boolean(getCookie('token')))
  }, [])

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    setIsLoggedIn(false)
    document.location.href = '/'
  }

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 border-b border-slate-100"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <span className="sr-only">MDSAvis</span>
            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700">
              <StarIcon aria-hidden="true" className="size-5 text-amber-400" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              MDS<span className="text-teal-700">Avis</span>
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-500"
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-slate-700 hover:text-slate-900">
              Trouver une école
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-slate-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-lg outline-1 -outline-offset-1 outline-slate-200 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {categories.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-slate-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-teal-50 group-hover:bg-teal-100">
                      <item.icon aria-hidden="true" className="size-6 text-teal-700" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-slate-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-slate-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-100 bg-slate-50">
                {quickActions.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <item.icon aria-hidden="true" className="size-5 flex-none text-teal-700" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <a href="/avis" className="text-sm/6 font-semibold text-slate-700 hover:text-slate-900">
            Derniers avis
          </a>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
          {isLoggedIn ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-x-2 text-sm/6 font-semibold text-slate-700 hover:text-slate-900">
                <UserCircleIcon aria-hidden="true" className="size-6 text-slate-500" />
                Mon compte
                <ChevronDownIcon aria-hidden="true" className="size-4 text-slate-400" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-xl bg-white py-2 shadow-lg outline-1 -outline-offset-1 outline-slate-200 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="/avis/mes-avis"
                    className="flex items-center gap-x-2 px-4 py-2 text-sm text-slate-700 data-focus:bg-slate-50"
                  >
                    <PencilSquareIcon aria-hidden="true" className="size-4 text-slate-500" />
                    Mes avis
                  </a>
                </MenuItem>
                <MenuItem>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 data-focus:bg-red-50"
                  >
                    Déconnexion
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <>
              <a href="/login" className="text-sm/6 font-semibold text-slate-700 hover:text-slate-900">
                Connexion
              </a>
              <a
                href="/avis/nouveau"
                className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
              >
                Déposer un avis
              </a>
            </>
          )}
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-slate-200">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
              <span className="sr-only">MDSAvis</span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700">
                <StarIcon aria-hidden="true" className="size-5 text-amber-400" />
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                MDS<span className="text-teal-700">Avis</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-slate-500"
            >
              <span className="sr-only">Fermer le menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-100">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-slate-900 hover:bg-slate-50">
                    Trouver une école
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...categories, ...quickActions].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="/classements"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Classements
                </a>
                <a
                  href="/avis"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Derniers avis
                </a>
                <a
                  href="/blog"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Guide d'orientation
                </a>
              </div>
              <div className="space-y-2 py-6">
                {isLoggedIn ? (
                  <>
                    <a
                      href="/profil"
                      className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      <UserCircleIcon aria-hidden="true" className="size-5 text-slate-500" />
                      Mon profil
                    </a>
                    <a
                      href="/avis/mes-avis"
                      className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2.5 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      <PencilSquareIcon aria-hidden="true" className="size-5 text-slate-500" />
                      Mes avis
                    </a>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-left text-base/7 font-semibold text-red-600 hover:bg-red-50"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Connexion
                    </a>
                    <a
                      href="/avis/nouveau"
                      className="-mx-3 block rounded-lg bg-teal-700 px-3 py-2.5 text-center text-base/7 font-semibold text-white hover:bg-teal-800"
                    >
                      Déposer un avis
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}