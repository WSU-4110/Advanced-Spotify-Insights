import { Artist } from "../types/artist";

type Props = {
    artist: Artist;
};

export default function ArtistCard({artist} : Props) {
  return (
    <div className="artist-card">
      <img src={artist.image} alt={artist.name} />
      <p>{artist.name}</p>
    </div>
  );
}