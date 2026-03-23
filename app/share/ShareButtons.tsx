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
    `${text} ${url}`,
  )}`;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleNativeShare}
        className="rounded-full bg-cyan-500 px-5 py-3 font-bold text-white transition-all hover:bg-cyan-400 shadow-[0_6px_0_rgb(8,145,178)] hover:shadow-[0_2px_0_rgb(8,145,178)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
      >
        Share
      </button>

      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-black px-5 py-3 font-bold text-white transition-all hover:brightness-125 shadow-[0_6px_0_rgba(0,0,0,0.4)] hover:shadow-[0_2px_0_rgba(0,0,0,0.4)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
      >
        Share on X
      </a>

      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-blue-600 px-5 py-3 font-bold text-white transition-all hover:bg-blue-500 shadow-[0_6px_0_rgb(29,78,216)] hover:shadow-[0_2px_0_rgb(29,78,216)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
      >
        Share on Facebook
      </a>

      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-green-600 px-5 py-3 font-bold text-white transition-all hover:bg-green-500 shadow-[0_6px_0_rgb(22,101,52)] hover:shadow-[0_2px_0_rgb(22,101,52)] hover:translate-y-[4px] active:shadow-none active:translate-y-[6px]"
      >
        Share on WhatsApp
      </a>
    </div>
  );
}
