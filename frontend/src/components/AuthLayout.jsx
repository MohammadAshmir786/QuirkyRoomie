import { Link } from "react-router-dom";
import logoMark from "../assets/quirkyroomie-mark.svg";

const AuthLayout = ({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}) => {
  return (
    <div className="h-screen overflow-hidden flex justify-between bg-linear-to-r from-indigo-800 via-indigo-900 to-slate-950">
      <div className="relative bg-white flex items-center w-1/3">
        <div className="bg-white rounded-3xl py-8 px-12 shadow-lg-custom border border-gray-200 animate-slideUp w-full m-12">
          <div className="text-center mb-8">
            <img
              src={logoMark}
              alt="QuirkyRoomie logo"
              className="h-12 w-12 mx-auto mb-3"
            />
            <h2 className="text-center font-bold text-3xl text-gray-900">
              {title}
            </h2>
            <p className="text-gray-600 text-sm mt-2 font-semibold">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-semibold">
                or
              </span>
            </div>
          </div>

          <p className="text-center text-sm mt-6 text-gray-700">
            {footerText}{" "}
            <Link
              to={footerLinkHref}
              className="text-indigo-700 font-bold hover:text-indigo-800 transition"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>

      <div className="banner relative w-2/3 flex flex-col justify-center items-center gap-8 p-12 overflow-hidden">
        <div className="relative z-10 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-100">
          <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
          Live flatmate stats
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 group">
            <img
              src={logoMark}
              alt="QuirkyRoomie logo"
              className="h-20 w-20 transform group-hover:scale-110 transition duration-300"
            />
            <span className="text-6xl font-black bg-linear-to-r from-amber-200 via-orange-200 to-rose-200 bg-clip-text text-transparent">
              QuirkyRoomie
            </span>
          </div>
          <p className="mt-4 max-w-xl text-xl font-semibold text-slate-100">
            Turn everyday chores, quirks, and debates into a shared scoreboard.
          </p>
        </div>

        <div className="relative z-10 grid max-w-xl grid-cols-2 gap-4 text-sm text-slate-200">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-base font-bold text-white">Track the drama</p>
            <p className="mt-1 text-slate-200/90">
              Log complaints, assign points, stay fair.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-base font-bold text-white">Celebrate wins</p>
            <p className="mt-1 text-slate-200/90">
              Leaderboards keep everyone accountable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
