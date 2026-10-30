import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";
import { FiArrowLeft, FiMapPin, FiStar, FiUsers, FiHome, FiDroplet, FiWifi } from "react-icons/fi";


function SingleHotel() {
  // dynamic route. => params
  const { id } = useParams();
  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();


  useEffect(() => {
    getHotel(id);
  }, [id, getHotel]);


  if (isLoadingCurrentHotel) return <Loader />;

  if (!currentHotel) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-white p-8 text-center text-stone-500 shadow-sm">
        <p>We couldn&apos;t load this stay.</p>
        <Link className="mt-4 font-semibold text-forest hover:text-ink" to="/hotels">Back to stays</Link>
      </div>
    );
  }

  const image =
    currentHotel.xl_picture_url ||
    currentHotel.medium_url ||
    currentHotel.thumbnail_url ||
    (currentHotel.picture_url?.filename
      ? `https://a0.muscache.com/im/pictures/${currentHotel.picture_url.filename}?aki_policy=x_large`
      : null) ||
    currentHotel.picture_url?.url;
  const description = currentHotel.summary || currentHotel.description;
  const amenities = (currentHotel.amenities || []).slice(0, 8);

  return (
    <article className="mx-auto max-w-3xl space-y-5 pb-8">
      <Link className="inline-flex items-center gap-2 px-1 text-sm font-semibold text-stone-500 transition hover:text-forest" to="/hotels">
        <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
        <span>All stays</span>
      </Link>

      <div className="relative h-64 overflow-hidden rounded-[2rem] bg-sage shadow-md sm:h-80">
        {image ? (
          <img className="h-full w-full object-cover" src={image} alt={currentHotel.name} />
        ) : (
          <div className="grid h-full w-full place-items-center text-forest"><FiHome aria-hidden="true" className="h-12 w-12" /></div>
        )}
        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2.5 text-xs font-semibold text-ink shadow-sm">A place to feel at home</span>
      </div>

      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-forest">{currentHotel.room_type || currentHotel.property_type || "Stay"}</span>
          {currentHotel.review_scores_rating ? (
            <span className="flex items-center gap-1 text-sm font-bold text-ink"><FiStar aria-hidden="true" className="h-4 w-4 fill-amber-400 text-amber-500" /> {Number(currentHotel.review_scores_rating / 20).toFixed(1)}</span>
          ) : null}
        </div>

        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">{currentHotel.name}</h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-stone-500"><FiMapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-forest" /> {currentHotel.smart_location || currentHotel.city || "Explore this destination"}</p>

        <div className="mt-5 flex items-center justify-between gap-3 border-y border-stone-100 py-4 text-xs text-stone-500">
          <p className="text-ink"><strong className="text-lg">€{currentHotel.price}</strong> <span>/ night</span></p>
          <span>{currentHotel.number_of_reviews || 0} guest reviews</span>
        </div>

        <div className="grid grid-cols-3 gap-3 py-5 text-xs text-stone-600">
          <div className="flex items-center gap-2"><FiUsers aria-hidden="true" className="h-4 w-4 text-forest" /><span><strong className="text-ink">{currentHotel.accommodates || 1}</strong> guests</span></div>
          <div className="flex items-center gap-2"><FiHome aria-hidden="true" className="h-4 w-4 text-forest" /><span><strong className="text-ink">{currentHotel.bedrooms ?? 0}</strong> bedrooms</span></div>
          <div className="flex items-center gap-2"><FiDroplet aria-hidden="true" className="h-4 w-4 text-forest" /><span><strong className="text-ink">{currentHotel.bathrooms ?? 0}</strong> bathrooms</span></div>
        </div>

        {description ? (
          <section className="border-t border-stone-100 py-5">
            <h2 className="mb-2 text-base font-semibold text-ink">About this stay</h2>
            <p className="text-sm leading-7 text-stone-600">{description}</p>
          </section>
        ) : null}

        {amenities.length > 0 ? (
          <section className="border-t border-stone-100 py-5">
            <h2 className="mb-3 text-base font-semibold text-ink">What this place offers</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {amenities.map((amenity) => (
                <span className="flex items-center gap-2 text-sm text-stone-600" key={amenity}>{amenity.toLowerCase().includes("wifi") || amenity.toLowerCase().includes("internet") ? <FiWifi aria-hidden="true" className="h-4 w-4 text-forest" /> : <FiHome aria-hidden="true" className="h-4 w-4 text-forest" />}{amenity}</span>
              ))}
            </div>
          </section>
        ) : null}

        <div className="sticky bottom-2 mt-3 flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-lg backdrop-blur">
          <p className="text-ink"><strong className="text-lg">€{currentHotel.price}</strong> <span className="text-xs text-stone-500">/ night</span></p>
          {currentHotel.listing_url ? (
            <a className="rounded-xl bg-forest px-4 py-3 text-xs font-bold text-white transition hover:bg-ink" href={currentHotel.listing_url} target="_blank" rel="noreferrer">View availability</a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default SingleHotel;
