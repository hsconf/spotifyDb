import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {fetchArtists} from "./homeThunk.ts";
import Card from "../../components/Card/Card.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const {artists} = useAppSelector((state) => state.home);

    useEffect(() => {
    dispatch(fetchArtists());
    }, [dispatch]);

    console.log(artists);

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {artists.length > 0 ? (
                    artists.map((artist) => (
                        <Card key={artist._id} artist={artist}></Card>
                    ))
                ) : null}
            </div>
        </div>
    );
};

export default Home;