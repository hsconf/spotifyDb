import {Track} from "../../../types.ts";
import * as React from "react";

interface Props {
    track: Track;
}

const TrackCard:React.FC<Props> = ({track}) => {
    return (
        <div>
            <div className="flex items-center bg-gradient-to-br from-black via-gray-500 to-yellow-500 border border-blue-500 p-3 rounded-lg mb-2 hover:scale-105 transition-all duration-300">
                <span className="text-white text-2xl font-medium">{track.count}</span>
                <span className="ms-3 text-white text-4xl font-semibold">{track.name}</span>
                <span className="ms-auto text-white text-3xl font-medium">{track.duration}</span>
            </div>
        </div>
    );
};

export default TrackCard;