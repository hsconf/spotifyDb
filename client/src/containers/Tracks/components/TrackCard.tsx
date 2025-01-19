import {Track} from "../../../types.ts";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {addSondToHistory} from "../../Auth/userThunk.ts";

interface Props {
    track: Track;
}

const TrackCard:React.FC<Props> = ({track}) => {
    const {user} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(addSondToHistory(track._id))
        if (track.youtube) {
            window.open(track.youtube, '_blank');
        }
    }

    return (
        <div>
            <div className="flex items-center bg-gradient-to-br from-black via-gray-500 to-yellow-500 border border-blue-500 p-3 rounded-lg mb-2 hover:scale-105 transition-all duration-300">
                <span className="text-white text-2xl font-medium">{track.count}</span>
                <span className="ms-3 text-white text-4xl font-semibold">{track.name}</span>
                <span className="ms-auto text-white text-3xl font-medium">{track.duration}</span>
                {user && (
                    <button onClick={onClick} className="cursor-pointer ms-3 bg-transparent">
                        <svg className="w-[38px] h-[38px] text-gray-800 dark:text-white border border-transparent hover:border-sky-500" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                  d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default TrackCard;