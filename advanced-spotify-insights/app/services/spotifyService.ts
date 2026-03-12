type Observer<T> = (data: T) => void;

class SpotifyService {

    private observers: { [key: string]: Observer<any>[] } = {};

    addObserver<T>(event: string, observer: Observer<T>) {
        if (!this.observers[event]) {
            this.observers[event] = [];
        }
        this.observers[event].push(observer);
    }

    removeObserver<T>(event: string, observer: Observer<T>) {
        if (!this.observers[event]) return;

        this.observers[event] = this.observers[event].filter(o => o !== observer);
    }

    notifyObservers<T>(event: string, data: T) {
        if (!this.observers[event]) return;

        this.observers[event].forEach(observer => observer(data));
    }


    // TODO actually get these from spotify API

    async fetchTopArtists() {
        const artists = [
            { id: "1", name: "Artist A", image: "https://placehold.co/200" },
            { id: "2", name: "Artist B", image: "https://placehold.co/200" }
        ];

        this.notifyObservers("topArtists", artists);
    }

    async fetchRecommendedSongs() {
        const songs = [
            { id: "1", title: "Song One", artist: "Artist A" },
            { id: "2", title: "Song Two", artist: "Artist B" }
        ];

        this.notifyObservers("recommendedSongs", songs);
    }
}

export const spotifyService = new SpotifyService();