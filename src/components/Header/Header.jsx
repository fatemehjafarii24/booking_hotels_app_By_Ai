import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiOutlineHome,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const datePickerRef = useRef(null);
  useOutsideClick(datePickerRef, "dateDropDown", () => setOpenDate(false));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  const handleOptions = (name, operation) => {
    setOptions((previous) => ({
      ...previous,
      [name]: operation === "inc" ? previous[name] + 1 : previous[name] - 1,
    }));
  };

  const handleSearch = () => {
    const search = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({ pathname: "/hotels", search: search.toString() });
  };

  return (
    <header className="relative z-[1100] border-b border-stone-200/80 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:flex-nowrap lg:px-8">
        <NavLink to="/hotels" className="flex shrink-0 items-center gap-2.5 text-xl font-bold tracking-tight text-ink" aria-label="Staywise home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-700 text-white shadow-sm">
            <HiOutlineHome className="h-5 w-5" />
          </span>
          staywise<span className="text-violet-700">.</span>
        </NavLink>

        {!isLoginPage && <div className="order-3 grid w-full grid-cols-2 gap-2 rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_8px_24px_rgba(23,45,41,0.06)] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_52px] lg:order-2 lg:mx-8 lg:max-w-3xl">
          <label className="flex min-w-0 items-center gap-2 rounded-xl px-2 py-1.5 sm:px-3">
            <MdLocationOn className="h-5 w-5 shrink-0 text-violet-700" />
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">Destination</span>
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                type="text"
                placeholder="Where to?"
                className="w-full border-0 bg-transparent p-0 text-sm font-medium text-ink placeholder:text-stone-400 focus:outline-none focus:ring-0"
                name="destination"
                id="destination"
              />
            </span>
          </label>

          <div className="relative flex min-w-0 items-center border-l border-stone-200 px-2 sm:px-3">
            <HiCalendar className="mr-2 h-4 w-4 shrink-0 text-violet-700" />
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">Dates</span>
              <button
                id="dateDropDown"
                onClick={() => setOpenDate(!openDate)}
                className="block w-full truncate text-left text-xs font-medium text-ink"
                aria-label="Choose travel dates"
              >
                {format(date[0].startDate, "MMM d")} – {format(date[0].endDate, "MMM d")}
              </button>
            </div>
            {openDate && (
              <div ref={datePickerRef} className="absolute left-0 top-full z-[1200] mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  ranges={date}
                  minDate={new Date()}
                  moveRangeOnFirstSelection
                />
              </div>
            )}
          </div>

          <div className="relative flex min-w-0 items-center border-l border-stone-200 px-2 sm:px-3">
            <HiOutlineHome className="mr-2 h-4 w-4 shrink-0 text-violet-700" />
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">Guests</span>
              <button
                id="optionDropDown"
                onClick={() => setOpenOptions(!openOptions)}
                className="block w-full truncate text-left text-xs font-medium text-ink"
                aria-label="Choose guests and rooms"
              >
                {options.adult + options.children} guests · {options.room} room
              </button>
            </div>
            {openOptions && (
              <GuestOptionList
                setOpenOptions={setOpenOptions}
                handleOptions={handleOptions}
                options={options}
              />
            )}
          </div>

          <button
            className="grid h-11 w-full place-items-center rounded-xl bg-violet-700 text-white transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2"
            onClick={handleSearch}
            aria-label="Search stays"
          >
            <HiSearch className="h-5 w-5" />
          </button>
        </div>}

        {!isLoginPage && (
          <nav className="order-2 flex shrink-0 items-center gap-4 text-sm font-semibold text-ink sm:gap-5 lg:order-3" aria-label="Account">
            <NavLink to="/bookmark" className={({ isActive }) => `transition hover:text-violet-700 ${isActive ? "text-violet-700" : ""}`}>
              Saved places
            </NavLink>
            <User />
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef(null);
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  return (
    <div ref={optionsRef} className="absolute right-0 top-full z-[1200] mt-3 w-64 rounded-2xl border border-stone-200 bg-white p-4 shadow-2xl">
      <OptionItem handleOptions={handleOptions} type="adult" options={options} minLimit={1} />
      <OptionItem handleOptions={handleOptions} type="children" options={options} minLimit={0} />
      <OptionItem handleOptions={handleOptions} type="room" options={options} minLimit={1} />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="flex-1 text-sm font-medium capitalize text-ink">{type}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="grid h-8 w-8 place-items-center rounded-full border border-stone-200 text-ink hover:border-violet-700 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={options[type] <= minLimit}
          aria-label={`Remove one ${type}`}
        >
          <HiMinus className="h-4 w-4" />
        </button>
        <span className="w-4 text-center text-sm font-semibold text-ink">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="grid h-8 w-8 place-items-center rounded-full border border-stone-200 text-ink hover:border-violet-700 hover:text-violet-700"
          aria-label={`Add one ${type}`}
        >
          <HiPlus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return isAuthenticated ? (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-24 truncate sm:inline">{user.name}</span>
      <button onClick={handleLogout} aria-label="Log out" className="grid h-9 w-9 place-items-center rounded-full bg-violet-100 text-violet-700 transition hover:bg-violet-200">
        <HiLogout className="h-4 w-4" />
      </button>
    </div>
  ) : (
    <NavLink to="/login" className="rounded-full bg-violet-700 px-4 py-2.5 text-white transition hover:bg-violet-800">
      Sign in
    </NavLink>
  );
}
