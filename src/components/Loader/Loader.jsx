import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div className="flex min-h-48 items-center justify-center gap-3 rounded-3xl border border-stone-200 bg-white text-sm font-medium text-forest shadow-sm" role="status">
      <LoaderIcon className="h-5 w-5" />
      <p>Preparing your next stay...</p>
    </div>
  );
}

export default Loader;
