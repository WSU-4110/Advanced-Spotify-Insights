"use client";

import ArtistCard from "../components/artistcard";
import Navbar from "../components/navbar";
import { Artist } from "../types/artist";

// FIXME placeholder, use lastfm api to get these and find their pictures
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
    },
    {
        id: "8",
        name: "Placeholder",
        image: "https://placehold.co/200"
    },
    {
        id: "9",
        name: "Placeholder",
        image: "https://placehold.co/200"
    },
    {
        id: "10",
        name: "Placeholder",
        image: "https://placehold.co/200"
    },
    {
        id: "11",
        name: "Placeholder",
        image: "https://placehold.co/200"
    }
];

export default function ArtistsPage() {
    return (
        <div className="topartists-page">
            <Navbar/>
            <h1 className="text-2xl font-bold">
                    Your Top Artists
                </h1>
            <div className="grid-container">
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        </div>
    )
}