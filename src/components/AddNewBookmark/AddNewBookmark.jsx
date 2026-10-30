import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

//  // Flag 
// function getFlagEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }


const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  // form => cityName, country
  //  lat and lng => url =>fetch api based on lat and lng => get location data
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState(""); //flag
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmark();



  useEffect(() => {

    // if (!cityName || !country) return;
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);

      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
        throw new Error(
          "this location is not a city! please click somewhere else."
        );
      
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        // setCountryCode(getFlagEmoji(data.countryCode)); //makbook
        setCountryCode(data.countryCode); //Flag of => FR , IR,... //windows

      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);



  // async
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };


  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-white p-6 text-sm font-medium leading-6 text-rose-700 shadow-sm">
        {geoCodingError}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest">Your travel map</span>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Save this place</h1>
      <p className="mt-2 text-sm leading-6 text-stone-500">Add a memorable stop to your personal travel map.</p>
      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-xs font-semibold text-ink" htmlFor="cityName">City</label>
          <input
            className="w-full rounded-2xl border border-stone-200 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-forest focus:ring-2 focus:ring-forest/10"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold text-ink" htmlFor="country">Country</label>
          <input
            className="w-full rounded-2xl border border-stone-200 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-forest focus:ring-2 focus:ring-forest/10"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
            required
          />
          {countryCode && <ReactCountryFlag className="mt-3 text-2xl" svg countryCode={countryCode} />}
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            className="rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-600 transition hover:border-stone-300 hover:bg-sand"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Go back
          </button>
          <button className="rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50" disabled={!cityName || !country}>Save place</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
