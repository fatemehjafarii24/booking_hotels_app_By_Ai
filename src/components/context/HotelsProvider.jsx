/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils/api";

const HotelContext = createContext();
const BASE_URL = `${API_BASE_URL}/hotels`;

function HotelsProvider({ children }) {
  // current hotel
  const [currentHotel, setCurrentHotel] = useState(null);
  // loading
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);


  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room; //data of room

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  const getHotel = useCallback(async (id) => {
    setCurrentHotel(null);
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  }, []);

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        currentHotel,
        getHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}{" "}
    </HotelContext.Provider>
  );
}
export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
