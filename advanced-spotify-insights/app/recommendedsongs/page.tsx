"use client";

import SongCard from "../components/songcard";
import Navbar from "../components/navbar";
import { Song } from "../types/song";
import { useEffect, useState } from "react";
import { spotifyService } from "../spotifyService";



export default function SongsPage() {
    const [songs, setSongs] = useState<Song[]>([]);

        useEffect(() => {
            const updateSongs = (data: Song[]) => {
                setSongs(data)
            };
            spotifyService.addObserver("recommendedSongs", updateSongs)
            spotifyService.fetchRecommendedSongs();

            return () => {
                spotifyService.removeObserver("recommendedSongs", updateSongs)
            };
        }, []);

    return (
        <div className="recommendedsongs-page">
            <Navbar/>
            <h1 className="text-2xl font-bold">
                    Your Recommended Songs
                </h1>
            <div className="grid-container">
                {songs.map((song) => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    )
}