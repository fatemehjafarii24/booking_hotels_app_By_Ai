import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AuthProvider from "./components/context/AuthProvider";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelsProvider>
          <div className="min-h-screen bg-sand text-ink">
            <Toaster />
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/hotels" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route
                path="/bookmark"
                element={
                  <ProtectedRoute>
                    <BookmarkLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Bookmark />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
            </Routes>
          </div>
        </HotelsProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}


export default App;

//   /hotels
//   /index
//   /:id
// 

//  list of bookmarks location + map
//   /bookmark  => list of bookmarks
//   /bookmark/add  => add new location(form)
// ________________________________________________

// authentication => who is he /she ? : information => name, ...
// authorization => what access have to routes or files ()
// role => user, admin, content manager ,..
