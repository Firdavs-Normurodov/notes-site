import React from "react";
import { Link } from "react-scroll"; // react-scroll kutubxonasidan Link komponentini import qilish
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Mobile Menu ikonkalarini import qilish

const navigation = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Blog", href: "blog" },
  { name: "Contact", href: "contact" },
];

function Navbar() {
  // Tokenni localStorage'dan olish
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false); // Mobil menyu uchun state

  return (
    <header className="bg-white shadow-sm fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 font-semibold text-lg">
            NOTES
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href} // react-scroll Link komponenti yordamida to'g'ridan-to'g'ri bo'limga o'tish
              smooth={true} // Silliq skrollashni qo'llash
              duration={500} // Skrollash davomiyligi (ms)
              className="text-sm font-semibold cursor-pointer text-gray-900"
            >
              {item.name}
            </Link>
          ))}

          {/* Agar token mavjud bo'lsa, Dashboard havolasi ko'rinadi */}
          {token ? (
            <a
              href="/dashboard"
              className="text-sm font-semibold underline cursor-pointer text-blue-500"
            >
              Dashboard
            </a>
          ) : (
            // Agar token bo'lmasa, Login va SignUp havolalari ko'rinadi
            <div className="auth flex items-center justify-around">
              <a
                href="/login"
                className="mr-4 text-sm font-semibold cursor-pointer underline text-blue-500"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-sm font-semibold cursor-pointer underline text-blue-500"
              >
                SignUp
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50">
          <div className="fixed inset-0 z-50 w-full sm:max-w-sm bg-white px-6 py-6">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 ml-1 font-semibold text-lg">
                NOTES
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    smooth={true}
                    duration={500}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)} // Menu elementini yopish
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Agar token mavjud bo'lsa, Dashboard ko'rsatiladi */}
                {token ? (
                  <a
                    href="/dashboard"
                    className="block underline rounded-lg px-3 py-2 text-base font-semibold text-blue-500 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="block underline rounded-lg px-3 py-2 text-base font-semibold text-blue-500 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="block underline rounded-lg px-3 py-2 text-base font-semibold text-blue-500 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      SignUp
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
