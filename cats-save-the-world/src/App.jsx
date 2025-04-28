import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

function App() {
    const [likedCats, setLikedCats] = useState([]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home likedCats={likedCats} setLikedCats={setLikedCats} />
                }
            />
            <Route
                path="/gallery"
                element={
                    <Gallery
                        likedCats={likedCats}
                        setLikedCats={setLikedCats}
                    />
                }
            />
        </Routes>
    );
}

export default App;
