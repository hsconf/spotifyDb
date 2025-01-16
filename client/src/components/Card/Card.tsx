import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Artist} from "../../types.ts";

interface Props {
    artist: Artist;
}

const Card: React.FC<Props> = ({artist}) => {
    const navigate = useNavigate();

    return (
            <div
                onClick={() => navigate('/artist/' + artist._id)}
                className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-6 w-full hover:shadow-xl hover:bg-gray-600 transition-colors duration-500">
                <img
                    className="w-full rounded-md shadow-md hover:scale-105 transition-transform duration-300"
                    src="https://i.pinimg.com/736x/69/e6/5c/69e65cbbe331a0855aef66f383578485.jpg"
                    alt="Lalo"
                />
                <p className="mt-4 text-3xl font-semibold text-gray-100">{artist.name}</p>
            </div>
    );
};

export default Card;