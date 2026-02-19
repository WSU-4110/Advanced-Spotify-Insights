"use client";

import ArtistCard from "../components/artistcard";
import { Artist } from "../types/artist";

// placeholder, use lastfm api to get these and find their pictures
const artists: Artist[] = [
    {
        id: "1",
        name: "Johnny Music",
        image: "https://placehold.co/200"
    },
    {
        id: "2",
        name: "Test Artist",
        image: "https://placehold.co/200"
    },
    {
        id: "3",
        name: "Another Test Artist",
        image: "https://placehold.co/200"
    },
    {
        id: "4",
        name: "Cool Music McGee",
        image: "https://placehold.co/200"
    },
    {
        id: "5",
        name: "Holder of Place",
        image: "https://placehold.co/200"
    },
    {
        id: "6",
        name: "Taylor Swift or Something",
        image: "https://placehold.co/200"
    },
    {
        id: "7",
        name: "Placeholder",
        image: "https://placehold.co/200"
    }
];

export default function ArtistsPage() {
    return (
        <div className="grid-container">
            {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    )
}