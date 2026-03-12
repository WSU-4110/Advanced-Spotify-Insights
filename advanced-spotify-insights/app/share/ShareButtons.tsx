"use client";

type Props = {
  url: string;
  title: string;
  text: string;
};

export default function ShareButtons({ url, title, text }: Props) {
  async function handleNativeShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${text} ${url}`
  )}`;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleNativeShare}
        className="rounded-full bg-cyan-500 px-5 py-3 font-bold text-white transition-all hover:bg-cyan-400"
      >
        Share
      </button>

      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-black px-5 py-3 font-bold text-white"
      >
        Share on X
      </a>

      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-blue-600 px-5 py-3 font-bold text-white"
      >
        Share on Facebook
      </a>

      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-green-600 px-5 py-3 font-bold text-white"
      >
        Share on WhatsApp
      </a>
    </div>
  );
}