# Sea Spot

A playful Spotify data visualizer that acts as a psychological mirror built from your listening habits. Built with Next.js, Tailwind CSS, and the Spotify API.

## Features

- **Spotify Authentication** - Sign in with your Spotify account via OAuth (powered by [Better Auth](https://www.better-auth.com/))
- **Spotify Integration** - Make API calls using the Spotify API to access display and modify user data 
- **Personality Quiz** - Take an MBTI-style personality quiz to learn what your music taste says about you
- **Recommendations** - Based on your personality, reccomends songs and artist that fit you.

## Tech Stack

| Layer | Technology |
| ---------- | --------------------------- |
| Framework | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | Better Auth + Spotify OAuth |
| Runtime | React |
| Package Manager | pnpm |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- A [Spotify Developer](https://developer.spotify.com/dashboard) application with a Client ID and Client Secret.

### Note 
Spotify's API restricts all access to the API to Spotify Premium users and projects to 5 users each.

### Environment Variables

Create a `.env.local` file in the project root:

```env
# spotify keys
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
# Better Auth 
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://127.0.0.1:3000 ## MUST BE SET TO THE BASE URL OF YOUR DEVELOPEMENT SERVER
```

### Installation

```bash
pnpm install
```

### Development
Spotify restricts all apps from using localhost for developement, so we must force Nextjs to use a static IP. 

Add this line to your package.json file

```bash
"dev": "next dev -H 127.0.0.1", ## package.json file under scripts
```

or start the dev sever at a specified IP.

```bash
pnpm dev -H 127.0.0.1 ## Base Url of your dev server can be anything
```

Open [http://127.0.0.1:3000/](http://127.0.0.1:3000/) in your browser.


## Project Structure

```
app/
├── page.tsx                  # Landing page
├── login/                    # Spotify sign-in page
├── topartists/               # Top artists gallery
├── recommendedsongs/         # Song recommendations
├── quiz/                     # MBTI-style personality quiz (state machine pattern)
├── share/                    # Social sharing page
├── feedback/                 # User feedback form
├── components/               # Shared UI components (Navbar, ArtistCard, SongCard)
├── lib/                      # Auth configuration (Better Auth + Spotify provider)
├── api/
│   ├── auth/[...all]/        # Better Auth catch-all route handler
│   ├── auth/token/           # Session token endpoint
│   └── spotify/              # Spotify API proxy routes
└── types/                    # TypeScript type definitions (Artist, Song)
```

