import { Artist } from "../types/artist";

type Props = {
    artist: Artist;
};

export default function ArtistCard({artist} : Props) {
  return (
    <div className="flex flex-col items-center text-center gap-4 p-5 bg-white/90 backdrop-blur-sm rounded-[35px] border-4 border-white shadow-xl w-[240px] h-full">
      <div className="w-40 h-40 rounded-full border-4 border-cyan-100 shadow-inner overflow-hidden relative bg-cyan-50 flex-shrink-0 mt-2">
        <img 
          src={artist.image} 
          alt={artist.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-xl font-extrabold text-cyan-900 leading-tight drop-shadow-sm px-2 mb-2">
        {artist.name}
      </p>
    </div>
    
  );
}