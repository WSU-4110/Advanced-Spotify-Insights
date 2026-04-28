import { RecommendationStrategy } from "./RecommendationStrategy";

const mbtiGenreMapping: Record<string, string[]> = {
  INTJ: ["prog rock", "metal", "classical"],
  ENTJ: ["jazz", "edm", "hip hop"],
  INTP: ["jazz", "alt rock", "post rock"],
  ENTP: ["metal", "soul", "synthwave"],
  INFJ: ["ambient", "world music", "classical"],
  ENFJ: ["pop", "rnb", "soul"],
  INFP: ["indie folk", "indie rock", "ambient"],
  ENFP: ["indie folk", "alt rock", "hip hop"],
  ISTJ: ["classical", "metal"],
  ESTJ: ["rock", "classical", "country"],
  ISFJ: ["indie rock", "rnb", "soul"],
  ESFJ: ["pop", "soul", "dance"],
  ISTP: ["synthwave", "lo-fi hip hop", "soul"],
  ESTP: ["edm", "hip hop", "metal"],
  ISFP: ["metal", "classical"],
  ESFP: ["pop", "dance pop", "reggaeton"],
};

const spotifyFetch = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok ? res.json() : null;
}

export class MbtiStrategy implements RecommendationStrategy {
    private mbtiType: string;

    constructor(mbtiType: string) {
        this.mbtiType = mbtiType;
    }

    async getRecommendations(accessToken: string): Promise<any[]> {
        
        const mbtiGenres = mbtiGenreMapping[this.mbtiType] || []; //get genres from type

        const artistsData = await spotifyFetch("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
                                accessToken, ); //assign json of top artists
        
        const userGenres = [ ...new Set(
            (artistsData?.items?.flatMap((a: any) => a.genres ?? []) || []).filter(
                Boolean,
            ),
          ),
        ]; //get top genres for user's current top artists


        const extraGenres = userGenres //mix
            .filter((genre: any) => !mbtiGenres.includes(genre)) // filter genres already in mbti 
            .slice(0, 2);

        const searchList = [...mbtiGenres, ...extraGenres]; // combine new genres

        
        const searchPromises = searchList.map((genre: any) => { //searching all genres
            const offset = Math.floor(Math.random() * 10); // random offset for each query to reduce only chosing popular songs
            const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(genre)}&type=track&limit=10&offset=${offset}`;
    
            return spotifyFetch(url, accessToken);
        });

        const results = await Promise.all(searchPromises);

        // Flatten and Deduplicate
        const allTracks = results.flatMap((r) => r?.tracks?.items || []);
        
        const uniqueTracks = Array.from(
            new Map(allTracks.filter((t) => t?.id).map((t) => [t.id, t])).values(),
        );

        return uniqueTracks;

    }
}