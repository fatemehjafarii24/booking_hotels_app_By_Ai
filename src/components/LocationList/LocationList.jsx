import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { HiOutlineHome } from "react-icons/hi";
import { API_BASE_URL } from "../../utils/api";

function LocationList() {
  const { data, isLoading } = useFetch(`${API_BASE_URL}/hotels`, "");

  if (isLoading) return <p className="py-8 text-sm text-stone-500">Loading nearby stays...</p>;
  if (!data.length) return <p className="py-8 text-sm text-stone-500">There are no nearby locations available.</p>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest">Keep exploring</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Nearby stays</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => {
          const image = item.xl_picture_url || item.medium_url || item.picture_url?.url;
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {image ? (
                <img className="h-52 w-full object-cover" src={image} alt={item.name} loading="lazy" />
              ) : (
                <div className="grid h-52 place-items-center bg-sage text-forest"><HiOutlineHome className="h-10 w-10" /></div>
              )}
              <div className="p-4">
                <p className="text-xs font-semibold text-stone-500">{item.smart_location}</p>
                <p className="mt-1 line-clamp-2 font-semibold leading-5 text-ink group-hover:text-forest">{item.name}</p>
                <p className="mt-3 text-sm font-bold text-ink">€{item.price} <span className="font-normal text-stone-500">/ night</span></p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LocationList;
