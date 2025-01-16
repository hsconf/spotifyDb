import {Album} from "../../../../types.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    albums: Album;
}

const AlbumCard: React.FC<Props> = ({albums}) => {
    const navigate = useNavigate();

    return (
        <>
            <div onClick={() => navigate('/album/' + albums._id)} className="flex flex-col items-center border border-gray-400 rounded-lg w-full p-3 pb-1 bg-gradient-to-br from-blue-900 via-indigo-800 to-pink-500 shadow-lg hover:scale-105 transition-all duration-300}">
                <img
                    src="https://i.scdn.co/image/ab67616d00001e028d89f78609a9a8faf0c2f51e"
                    alt="album"
                    className="hover:scale-105 transition-all duration-300"
                />
                <div className="my-2 flex flex-col items-center">
                    <span className="text-3xl text-white font-medium ">{albums.name}</span>
                    {albums.releaseDate && <span className="text-2xl text-white">release: {albums.releaseDate}</span>}

                </div>
            </div>
        </>
    );
};

export default AlbumCard;