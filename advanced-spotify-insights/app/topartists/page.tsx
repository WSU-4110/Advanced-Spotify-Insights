"use client";

import ArtistCard from "../components/artistcard";
import Navbar from "../components/navbar";
import { Artist } from "../types/artist";
import { useEffect, useState } from "react";
import { spotifyService } from "../spotifyService";


export default function ArtistsPage() {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        const updateArtists = (data: Artist[]) => {
            setArtists(data)
        };
        spotifyService.addObserver("topArtists", updateArtists)
        spotifyService.fetchTopArtists();

        return () => {
            spotifyService.removeObserver("topArtists", updateArtists)
        };
    }, []);

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