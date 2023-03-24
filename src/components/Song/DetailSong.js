import { useSongContext } from 'contexts/SongContext';
import './keyf.css';
import Playing from './Playing';
export default function DetailSong() {
	const { song } = useSongContext();

	return (
		<div className="row-span-3 p-3 overflow-hidden">
			<div className="flex h-[255px]">
				<div className="w-[20%] relative">
					<img
						className="w-[250px] h-[250px] rounded-full absolute inset-0 keyf "
						src={song.links.images[0].url}
						alt="avatar"
					/>
					<div className="absolute w-[250px] h-[250px] inset-0 flex justify-center items-center">
						<div className="h-14 w-14 rounded-full bg-slate-700"></div>
					</div>
				</div>

				<div className="w-[80%] relative">
					<div className="w-[100%] absolute bottom-0">
						<Playing />
					</div>
				</div>

				{/* <div className="flex justify-evenly items-center mt-10">
					<img className="w-[70px] rounded-full" src={song.links.images[1].url} alt="avatar" />
					<span className="text-xl text-white">{song.author}</span>
				</div> */}
			</div>
		</div>
	);
}
