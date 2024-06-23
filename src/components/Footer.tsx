import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        {/* Shop Text */}
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="text-blue cursor-pointer hover:text-white">
              Find an Apple Store{" "}
            </span>
            or{" "}
            <span className="text-blue cursor-pointer hover:text-white">
              other retailer
            </span>{" "}
            near you.
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call 000000-000-0000
          </p>
        </div>

        {/* Line */}
        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        {/* Footer */}
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          {/* Copyright */}
          <p className="font-semibold text-gray text-xs">
            Copyright @ {new Date().getFullYear()} Apple Inc. All rights
            reserved.
          </p>
          {/* Footer Links */}
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p
                key={link}
                className="font-semibold text-gray text-xs hover:text-white cursor-pointer transition-all"
              >
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
