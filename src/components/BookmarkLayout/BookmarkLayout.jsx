import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../context/BookmarkListContext";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:h-[calc(100dvh-88px)] lg:grid-cols-[minmax(380px,0.82fr)_minmax(0,1.18fr)] lg:gap-8 lg:px-8 lg:py-8">
      <section className="min-h-[45vh] overflow-y-auto lg:min-h-0 lg:pr-2">
        <Outlet />
      </section>
      <Map markerLocations={bookmarks} />
    </main>
  );
}

export default BookmarkLayout;

// start => bookmarkList => global
