import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import { useBookmark } from "../context/BookmarkListContext";
import { Link } from "react-router-dom";
import { HiTrash, HiOutlineMap } from "react-icons/hi";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } = useBookmark();

  const handleDelete = async (event, id) => {
    event.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-white px-6 py-12 text-center shadow-sm">
        <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-sage text-forest">
          <HiOutlineMap className="h-8 w-8" />
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-forest">Your travel map</span>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">No saved places yet</h1>
        <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">Choose a spot on the map to save a city for your next adventure.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="px-1 pb-1">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest">Your travel map</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Saved places</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">A little list of places worth coming back to.</p>
      </div>
      <div className="space-y-3">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            className={`flex items-center justify-between gap-4 rounded-3xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-md ${item.id === currentBookmark?.id ? "border-forest/30 bg-sage/70" : "border-stone-200 bg-white"}`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sand">
                <ReactCountryFlag className="text-2xl" svg countryCode={item.countryCode} />
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-sm font-semibold text-ink">{item.cityName}</strong>
                <span className="block truncate text-xs text-stone-500">{item.country}</span>
              </span>
            </div>
            <button
              onClick={(event) => handleDelete(event, item.id)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-stone-400 transition hover:bg-rose-50 hover:text-rose-600"
              aria-label={`Remove ${item.cityName}`}
            >
              <HiTrash className="h-4 w-4" />
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Bookmark;
