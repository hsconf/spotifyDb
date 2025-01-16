import Home from "./containers/Home/Home.tsx";
import {Link, Route, Routes} from "react-router-dom";
import Album from "./containers/Album/Album.tsx";
import Tracks from "./containers/Tracks/Tracks.tsx";

const App = () => {

    document.body.className = 'bg-blue-950'

    return (
        <>
            <header className="container mx-auto p-4 mb-5">
                <nav className="flex items-center justify-between">
                    <Link to="/"
                          className="text-3xl font-extrabold text-white hover:text-green-300 transition duration-300">
                        Spotify
                    </Link>
                </nav>
            </header>

            <main className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/artist/:id" element={<Album/>}/>
                    <Route path="/album/:id" element={<Tracks/>}/>
                </Routes>
            </main>
        </>
    );
};

export default App;
