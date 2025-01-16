import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAlbums, fetchSingleArtist} from "../Home/homeThunk.ts";
import AlbumCard from "./components/Card/AlbumCard.tsx";
import {useParams} from "react-router-dom";

const Album = () => {
    const dispatch = useAppDispatch();
    const {albums, artist} = useAppSelector((state) => state.home);
    const {id: params} = useParams();

    if (artist) {
        document.title = artist.name
    }

    useEffect(() => {
        if (params) {
            dispatch(fetchAlbums(params));
            dispatch(fetchSingleArtist(params));
        }
    }, [dispatch]);
    return (
        <div>
            {albums.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {albums.length > 0 ? (
                        albums.map((album) => (
                            <AlbumCard albums={album} key={album._id}/>
                        ))
                    ) : null}
                </div>
            ) : <div className="min-h-[90vh] flex items-center justify-center text-7xl text-white font-bold animate-pulse transition-all duration-600">
                The artist doesn't have any albums.
            </div>
            }
        </div>
    );
};

export default Album;