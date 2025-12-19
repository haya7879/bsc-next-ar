import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=971506252099"
      target="_blank"
      rel="noopener noreferrer"
      className="whats-app"
    >
      <Image
        src="https://bscenter.org/assets/imgs/whats.webp"
        alt="Chat with us on WhatsApp"
        width={110}
        height={55}
        quality={75}
        sizes="110px"
        className="w-[110px] h-auto"
      />
    </a>
  );
}
