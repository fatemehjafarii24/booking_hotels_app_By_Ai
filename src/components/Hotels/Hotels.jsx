import { Link, useSearchParams } from "react-router-dom";
import { HiOutlineStar, HiOutlineHome } from "react-icons/hi";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";

function getHotelImage(hotel) {
  return (
    hotel.xl_picture_url ||
    hotel.medium_url ||
    hotel.thumbnail_url ||
    (hotel.picture_url?.filename
      ? `https://a0.muscache.com/im/pictures/${hotel.picture_url.filename}?aki_policy=x_large`
      : null) ||
    hotel.picture_url?.url
  );
}

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  const [searchParams] = useSearchParams();
  const hotelList = hotels || [];
  const destination = searchParams.get("destination");

  if (isLoading) return <Loader />;
  if (!hotelList.length) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-white px-6 py-12 text-center shadow-sm">
        <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-sage text-forest">
          <HiOutlineHome className="h-8 w-8" />
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-forest">Your next getaway</span>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">No stays found just yet</h1>
        <p className="mt-2 max-w-sm text-sm leading-6 text-stone-500">Try another destination or adjust your search to discover a place that feels like yours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4 px-1 pb-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-forest">Your next getaway</span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {destination ? `Stays in ${destination}` : "Find your next stay"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-500">Thoughtful places for a more memorable trip.</p>
        </div>
        <span className="shrink-0 rounded-full border border-forest/10 bg-white px-3.5 py-2 text-xs font-semibold text-forest shadow-sm">
          {hotelList.length} {hotelList.length === 1 ? "stay" : "stays"}
        </span>
      </div>

      <div className="space-y-3">
        {hotelList.map((item) => {
          const image = getHotelImage(item);
          const isCurrentHotel = item.id === currentHotel?.id;

          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              className={`group flex gap-3 rounded-3xl border p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-md sm:gap-4 sm:p-4 ${isCurrentHotel ? "border-forest/30 bg-sage/70" : "border-stone-200 bg-white"}`}
            >
              {image ? (
                <img
                  className="h-28 w-28 shrink-0 rounded-2xl bg-stone-100 object-cover sm:h-32 sm:w-36"
                  src={image}
                  alt={item.name}
                  loading="lazy"
                />
              ) : (
                <div className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl bg-sage text-forest sm:h-32 sm:w-36">
                  <HiOutlineHome className="h-8 w-8" />
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold text-stone-500">{item.smart_location || "A lovely destination"}</p>
                    {item.review_scores_rating && (
                      <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-ink">
                        <HiOutlineStar className="h-4 w-4 text-amber-500" />
                        {Number(item.review_scores_rating / 20).toFixed(1)}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-ink transition group-hover:text-forest sm:text-base">{item.name}</h2>
                  <p className="mt-1 text-xs text-stone-500">{item.room_type || item.property_type || "A comfortable stay"}</p>
                </div>
                <p className="mt-2 text-sm font-bold text-ink">
                  €{item.price} <span className="font-normal text-stone-500">/ night</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
