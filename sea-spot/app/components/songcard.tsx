import { Song } from "../types/song";

type Props = {
  song: Song;
};

export default function SongCard({ song }: Props) {
  return (
    <div className="flex flex-col items-center text-center p-5 bg-white/90 backdrop-blur-sm rounded-[35px] border-4 border-white shadow-xl w-[240px] h-full gap-4">
      <div className="w-40 h-40 rounded-2xl border-4 border-cyan-100 shadow-inner overflow-hidden relative bg-cyan-50 flex-shrink-0 mt-2">
        <img
          src={song.image}
          alt={song.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 w-full px-2 mb-2">
        <p className="text-lg font-extrabold text-cyan-900 leading-tight drop-shadow-sm truncate">
          {song.name}
        </p>
        <p className="text-sm font-bold text-cyan-600 truncate">
          {song.artist}
        </p>
      </div>
    </div>
  );
}
