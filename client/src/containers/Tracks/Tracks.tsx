import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {fetchTracks} from "../Home/homeThunk.ts";
import {useParams} from "react-router-dom";
import TrackCard from "./components/TrackCard.tsx";

const Tracks = () => {
    const {tracks} = useAppSelector((state) => state.home);
    const dispatch = useAppDispatch();
    const {id: params} = useParams();


    useEffect(() => {
        if (params) {
            dispatch(fetchTracks(params));
        }
    }, [dispatch]);

    return (
        <div>
            {tracks.length > 0 ? (
                tracks.map(track => (
                        <TrackCard track={track} />
                    ))
            ) : <div className="text-7xl">No tracks</div>}
        </div>
    );
};

export default Tracks;