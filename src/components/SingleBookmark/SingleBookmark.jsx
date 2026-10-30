import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmark,isLoading, currentBookmark } =
    useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id, getBookmark]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-forest">
        <span aria-hidden="true">&larr;</span> Back to saved places
      </button>
      <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-forest">Saved destination</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">{currentBookmark.cityName}</h1>
      <div
        className="mt-6 flex items-center gap-4 rounded-3xl bg-sand p-5"
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm">
          <ReactCountryFlag className="text-2xl" svg countryCode={currentBookmark.countryCode} />
        </span>
        <span>
          <strong className="block text-sm font-semibold text-ink">{currentBookmark.cityName}</strong>
          <span className="text-sm text-stone-500">{currentBookmark.country}</span>
        </span>
      </div>
    </div>
  );
}

export default SingleBookmark;
