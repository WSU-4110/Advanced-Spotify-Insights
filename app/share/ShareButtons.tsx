"use client";

type ShareButtonsProps = {
  url: string;
  title: string;
  text: string;
  onDownload?: () => void;
  imageUrl?: string;
};

export default function ShareButtons({url, title, text, onDownload, imageUrl,
}: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);
  const combinedText = encodeURIComponent(`${text} ${url}`);
  
  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleInstagramShare = () => {
    if (onDownload) {
      onDownload();
    }

    alert(
      "Image downloaded! Open Instagram and post to Instagram Story to share your result! ",
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {onDownload && (
        <button
          onClick={onDownload}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-cyan-500 px-6 text-cyan-700 text-base font-bold whitespace-nowrap transition-all hover:bg-cyan-100 hover:border-cyan-600 hover:text-cyan-900 hover:scale-105 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Download Image
        </button>
      )}

      {typeof navigator !== "undefined" && navigator.share && (
        <button
          onClick={handleNativeShare}
          className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-500 px-6 text-base font-bold text-white whitespace-nowrap transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
        >
          Quick Share
        </button>
      )}

      <a
        href={`https://twitter.com/intent/tweet?text=${combinedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-base font-bold text-white whitespace-nowrap transition-all hover:opacity-90"
      >
        Share on X
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-base font-bold text-white whitespace-nowrap transition-all hover:opacity-90"
      >
        Share on Facebook
      </a>

      <a
        href={`https://wa.me/?text=${combinedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center rounded-full bg-green-600 px-6 text-base font-bold text-white whitespace-nowrap transition-all hover:opacity-90"
      >
        Share on WhatsApp
      </a>
      <button
        onClick={handleInstagramShare}
        className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-6 text-base font-bold text-white whitespace-nowrap transition-all hover:opacity-90"
      >
        Share on Instagram
      </button>
    </div>
  );
}