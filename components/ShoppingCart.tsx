import { useRef } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/app/providers/cartContext";
import Link from "next/link";
import CartProductCard from "./cards/cartProduct";

type ShoppingCartProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

export default function ShoppingCart({
  isCartOpen,
  setIsCartOpen,
}: ShoppingCartProps) {
  const { cartCount, cartItems, removeFromCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" data-cart-component="true">
      <button
        name="shopping bag icon"
        title="shopping bag icon"
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="absolute -top-2 -right-2 bg-white text-[#3b2e1e] text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
          {cartCount}
        </span>
      </button>

      {/* Mini Cart Dropdown */}
      {isCartOpen && (
        <div
          ref={cartRef}
          className="absolute right-0 mt-2 w-72 bg-white shadow-lg overflow-hidden z-50"
          data-cart-component="true"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[#3b2e1e] font-medium">
                Your Cart ({cartCount})
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <CartProductCard
                      key={`${item.uid}-${index}`}
                      uid={item.uid}
                      title={item.title}
                      price={item.price}
                      media={item.media}
                      quantity={item.quantity}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/cart">
                    <button className="w-full py-2 bg-[#3b2e1e] text-white text-sm uppercase">
                      View Cart
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
