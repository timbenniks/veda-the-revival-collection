import { X } from "lucide-react";
import MediaItem from "../atoms/MediaItem";
import { renderCurrency } from "@/lib/helpers";

interface CartProductProps {
  uid: string;
  title: string;
  price?: number | null;
  media?: { url: string }[];
  quantity: number;
  onRemove: (uid: string) => void;
}

export default function CartProductCard({
  uid,
  title,
  price,
  media,
  quantity,
  onRemove,
}: CartProductProps) {
  return (
    <div
      className="flex items-center py-2 border-b border-gray-100"
      data-cart-component="true"
    >
      {media && media[0] && (
        <div className="w-12 h-12 flex-shrink-0 mr-4 bg-gray-100">
          <MediaItem
            src={media[0].url as string}
            alt={`Product image for ${title}`}
            width={50}
            height={50}
            ratio={1}
            sizes="5vw"
            widths={[50, 100]}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-grow">
        <div className="flex justify-between">
          <p className="text-sm text-[#3b2e1e] font-light uppercase">
            {title} ({quantity})
          </p>
        </div>
        {price && (
          <p className="text-xs text-gray-600">
            {renderCurrency(price * quantity)}
          </p>
        )}
      </div>
      <button
        onClick={() => onRemove(uid)}
        className="text-gray-600 ml-2"
        data-cart-component="true"
      >
        <X className="w-4 h-4 cursor-pointer" />
      </button>
    </div>
  );
}
