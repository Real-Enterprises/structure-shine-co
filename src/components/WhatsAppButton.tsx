// TODO: Replace 923001234567 with real WhatsApp Business number
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923001234567?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20construction%20project"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>

      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />

      {/* Button */}
      <div className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200">
        <MessageCircle className="text-white w-7 h-7" />
      </div>
    </a>
  );
}
