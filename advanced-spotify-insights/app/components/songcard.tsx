import { Song } from "../types/song";

type Props = {
    song: Song;
};

export default function SongCard({song} : Props) {
  return (
    <div className="song-card">
      <img src={song.image} alt={song.name} />
      <p>{song.name}</p>
      <br/>
      <p>{song.artist}</p>
    </div>
  );
}