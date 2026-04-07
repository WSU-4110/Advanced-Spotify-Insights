// app/recommendedsongs/recommend.js

const mbtiGenreMapping = {
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

// Helper to keep fetch
const spotifyFetch = async (url, token) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok ? res.json() : null;
};

export async function getMbtiRecommendations(mbtiType, accessToken) {
  const mbtiGenres = mbtiGenreMapping[mbtiType] || [];

  // Get Top User Genres
  const artistsData = await spotifyFetch(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
    accessToken,
  );
  const userGenres = [
    ...new Set(artistsData?.items?.flatMap((a) => a.genres) || []),
  ];

  // Mix user genres with MBTI
  const extraGenres = userGenres
    .filter((g) => !mbtiGenres.includes(g))
    .slice(0, 2);
  const searchList = [...mbtiGenres, ...extraGenres];

  // Search all genres
  const searchPromises = searchList.map((genre) => {
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
