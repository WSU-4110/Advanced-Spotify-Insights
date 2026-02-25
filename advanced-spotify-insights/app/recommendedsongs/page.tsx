"use client";

import SongCard from "../components/songcard";
import Navbar from "../components/navbar";
import { Song } from "../types/song";

// FIXME placeholder, use lastfm api to get these and find their pictures
const songs: Song[] = [
    {
        id: "1",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "2",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "3",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "4",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "5",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "6",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "7",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "8",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "9",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "10",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "11",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "12",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
    {
        id: "13",
        name: "Placeholder Song",
        artist: "John Doe",
        album: "Album",
        image: "https://placehold.co/200"
    },
];

export default function SongsPage() {
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