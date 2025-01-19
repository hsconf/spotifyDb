import Home from "./containers/Home/Home.tsx";
import {Link, Route, Routes} from "react-router-dom";
import Album from "./containers/Album/Album.tsx";
import Tracks from "./containers/Tracks/Tracks.tsx";
import Signup from "./containers/Auth/Signup/Signup.tsx";
import Login from "./containers/Auth/Login/Login.tsx";
import {useAppSelector} from "../app/hooks.ts";
import TrackHistory from "./containers/TrackHistory/TrackHistory.tsx";

const App = () => {
    document.body.className = 'bg-blue-950'
    const {user} = useAppSelector((state) => state.user);

    return (
        <>
            <header className="container mx-auto p-4 mb-5">
                <nav className="flex items-center justify-between">
                    <Link to="/"
                          className="text-3xl font-extrabold text-white hover:text-green-300 transition duration-300">
                        Spotify
                    </Link>
                    <ul className="flex items-center justify-between gap-3 text-lg text-white">
                        {
                            user ? (
                                <>
                                    <li className="hover:text-emerald-500 font-medium"><Link to="track-history">Track history</Link></li>
                                    <li className="hover:text-red-500 font-medium"><Link to="trackhistory">Logout</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/signup">Signup</Link></li>
                                    <li className="py-2 px-5 bg-white text-black rounded-full"><Link to="/login">Log in</Link></li>
                                </>
                            )
                        }


                    </ul>
                </nav>
            </header>

            <main className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/artist/:id" element={<Album/>}/>
                    <Route path="/album/:id" element={<Tracks/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="track-history" element={<TrackHistory />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
