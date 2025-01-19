import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {getTrackHistory} from "../Auth/userThunk.ts";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const {tracksHistory, user} = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
    }

    useEffect(() => {
        dispatch(getTrackHistory());
    }, [dispatch])

    return (
        <div>
            <div>
                {tracksHistory.length > 0 ? (
                    tracksHistory.map((track) => (
                        <div key={track._id} className="flex items-center justify-between border border-b-red-500 rounded-lg mb-3 px-5 py-2 text-white text-lg  hover:border-t-yellow-500 transition-all duration-300">
                            <span>{track.artist}</span>
                            <span>{track.name}</span>
                            <span>{dayjs(track.datetime).format('YYYY.MM.DD:HH:mm')}</span>
                        </div>
                    ))
                ) : <div className="min-h-[90vh] flex items-center justify-center text-5xl text-white font-bold animate-pulse transition-all duration-600">
                    You haven't listened to any tracks yet.
                </div>}
            </div>
        </div>
    );
};

export default TrackHistory;