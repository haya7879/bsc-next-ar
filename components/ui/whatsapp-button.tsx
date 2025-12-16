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
        alt="whats-img"
        width={110}
        height={110}
        className='w-[110px] h-auto'
      />
    </a>
  );
}

