import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

const NavBar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        {/* Logo */}
        <img src={appleImg} alt="apple" width={14} height={18} />
        {/* Nav Links */}
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((n) => {
            return (
              <div
                key={n}
                className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
              >
                {n}
              </div>
            );
          })}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          {/* Search Icon */}
          <img src={searchImg} alt="search" width={18} height={18} />
          {/* Bag Icon */}
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
