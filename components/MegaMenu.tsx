"use client";

import { useState } from "react";

import {
  ChevronDown,
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

const productData = {
  brand: {
    name: "Veda: The Revival Collection",
    description:
      "An upscale unisex jewelry line featuring four distinct sets inspired by early 2000s pop culture.",
  },
  productLines: [
    {
      name: "Digital Dawn",
      description:
        "Inspired by the tech optimism and futuristic style of Y2K. This set captures the sleek, digital vibe of the new millennium's dawn.",
    },
    {
      name: "Charmed Revival",
      description:
        "Inspired by the playful pop nostalgia of the early 2000s. This set celebrates the era's iconic youthful trends.",
    },
    {
      name: "Urban Armor",
      description:
        "Inspired by the bling era streetwear and hip-hop glamour of the 2000s. This set translates bold, flashy jewelry into a sleeker form.",
    },
    {
      name: "Elegant Rebellion",
      description:
        "Inspired by the edgy punk rock and emo subcultures of the 2000s. This set infuses rebellion into luxury.",
    },
  ],
};

const featuredProducts = {
  EARRINGS: {
    name: "Pixel Stud Earrings",
    collection: "Digital Dawn",
    price_cents: 299900,
    editorialDescription:
      "Where technology meets timeless elegance. These minimalist square studs capture the essence of Y2K's digital optimism, each tiny princess-cut diamond framed in gold like a pixel of light on a midnight screen. A subtle nod to the era that promised us the future.",
    story:
      "Inspired by the first moments of the new millennium, when screens glowed with possibility and every pixel held promise.",
    materials: "Sterling silver, 18k gold bezel, princess-cut diamonds",
    image: "/placeholder.svg?height=800&width=800",
  },
  NECKLACES: {
    name: "Power Pendant Necklace",
    collection: "Digital Dawn",
    price_cents: 299900,
    editorialDescription:
      "The universal symbol of awakening, reimagined for the modern era. This polished silver pendant carries the iconic power symbol—a circle broken by a vertical line—suspended from delicate white gold. A diamond marks the moment of illumination, like the standby light that signals readiness.",
    story:
      "Born from the dawn of the digital age, when a simple symbol could represent infinite potential and the power to begin anew.",
    materials:
      "Sterling silver pendant, white gold chain, brilliant-cut diamond",
    image: "/placeholder.svg?height=800&width=800",
  },
  BRACELETS: {
    name: "Fusion Cuff Bracelet",
    collection: "Digital Dawn",
    price_cents: 299900,
    editorialDescription:
      "Two worlds converge in perfect harmony. Half mirror-polished silver, half warm yellow gold, meeting at a single diamond that bridges the divide. This open cuff embodies the millennium's promise—the seamless fusion of analog warmth and digital precision.",
    story:
      "At the turn of the century, boundaries blurred and possibilities expanded. This cuff captures that moment of transformation.",
    materials: "Sterling silver, 18k yellow gold, bezel-set diamond",
    image: "/placeholder.svg?height=800&width=800",
  },
  RINGS: {
    name: "Binary Band",
    collection: "Digital Dawn",
    price_cents: 299900,
    editorialDescription:
      "Code becomes poetry in this sleek wide band. Sterling silver forms the foundation while dual gold lines trace the surface like binary code made tangible. A single diamond, placed with intentional asymmetry, represents the '1' in an endless stream of possibility.",
    story:
      "In the language of machines, every story begins with ones and zeros. This ring translates that digital poetry into wearable art.",
    materials: "Sterling silver band, 18k gold inlay, brilliant-cut diamond",
    image: "/placeholder.svg?height=800&width=800",
  },
};

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDesktopMenuClick = (menuId: string) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
      setIsMenuOpen(false);
    } else {
      setActiveMenu(menuId);
      setIsMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setIsMenuOpen(false);
  };

  const formatPrice = (priceCents: number) => {
    return `$${(priceCents / 100).toLocaleString()}`;
  };

  const menuCategories = ["EARRINGS", "NECKLACES", "BRACELETS", "RINGS"];
  const featuredProduct = activeMenu
    ? featuredProducts[activeMenu as keyof typeof featuredProducts]
    : null;

  return (
    <div
      className={`relative bg-[#3b2e1e] text-white font-light`}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Navigation */}
      <nav className="bg-[#3b2e1e]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-normal tracking-wider text-white">
                VEDA
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {menuCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${category.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDesktopMenuClick(category);
                    }}
                    className={`px-3 py-2 text-sm tracking-widest transition-colors duration-200 flex items-center space-x-1 no-underline ${
                      activeMenu === category
                        ? "text-white"
                        : "text-white hover:text-gray-300"
                    }`}
                  >
                    <span>{category}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeMenu === category ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                ))}
                <Link
                  href="/our-story"
                  className="px-3 py-2 text-sm tracking-widest text-white hover:text-gray-300 transition-colors duration-200 no-underline"
                >
                  OUR STORY
                </Link>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:bg-[#4a3b29]">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-white hover:bg-[#4a3b29]">
                <User className="w-5 h-5" />
              </button>
              <button className="text-white hover:bg-[#4a3b29] relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-white text-[#3b2e1e] text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  0
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Menu Panel with Editorial Featured Product */}
      <div
        className={`hidden md:block absolute top-full left-0 w-full bg-[#3b2e1e] transition-all duration-300 ease-in-out z-50 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        {activeMenu && featuredProduct && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Collections Sidebar */}
              <div className="lg:col-span-3">
                <h3 className="text-lg tracking-widest text-white mb-8">
                  COLLECTIONS
                </h3>
                <div className="space-y-6">
                  {productData.productLines.map((line, index) => (
                    <Link
                      key={index}
                      href={`/collections/${line.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="group cursor-pointer text-left w-full block no-underline"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-white tracking-wider group-hover:text-gray-300 transition-colors">
                          {line.name.toUpperCase()}
                        </h4>
                        <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Shop All Link */}
                <div className="mt-12 pt-8 border-t border-[#4a3b29]">
                  <Link
                    href={`/categories/${activeMenu?.toLowerCase()}`}
                    className="group cursor-pointer text-left w-full block no-underline"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white tracking-wider group-hover:text-gray-300 transition-colors">
                        SHOP ALL {activeMenu}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Editorial Featured Product Display */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Featured Product Image */}
                  <div className="relative">
                    <div className="aspect-square bg-[#2a2117] overflow-hidden relative">
                      {/* <Image
                        src={featuredProduct.image || "/placeholder.svg"}
                        alt={featuredProduct.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      /> */}
                    </div>
                  </div>

                  {/* Editorial Content */}
                  <div className="flex flex-col justify-center space-y-8">
                    {/* Product Header */}
                    <div>
                      <p className="text-white text-sm tracking-widest uppercase mb-2 opacity-70">
                        {featuredProduct.collection}
                      </p>
                      <h2 className="text-2xl tracking-wide text-white mb-4">
                        {featuredProduct.name}
                      </h2>
                      <p className="text-white text-xl">
                        {formatPrice(featuredProduct.price_cents)}
                      </p>
                    </div>

                    {/* Editorial Description */}
                    <div className="space-y-6">
                      <p className="text-white leading-relaxed text-lg line-clamp-3">
                        {featuredProduct.editorialDescription}
                      </p>
                    </div>

                    {/* Materials */}
                    <div>
                      <p className="text-white text-sm tracking-wide uppercase mb-2 opacity-70">
                        Materials
                      </p>
                      <p className="text-white text-sm leading-relaxed">
                        {featuredProduct.materials}
                      </p>
                    </div>

                    {/* Call to Action */}
                    <div className="space-y-4">
                      <Link
                        href={`/products/${featuredProduct.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="cursor-pointer text-[white] hover:text-[#3b2e1e] hover:bg-gray-200 block px-2 py-1 border-b border-white no-underline uppercase"
                      >
                        DISCOVER MORE
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu - Direct Navigation Only */}
      <div
        className={`md:hidden fixed inset-0 bg-[#3b2e1e] z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-2xl font-normal tracking-wider text-white">
              VEDA
            </h1>
            <button
              className="text-white hover:bg-[#4a3b29]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Category Navigation - Direct Links */}
          <div className="space-y-6 mb-12">
            {menuCategories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="group w-full text-left block no-underline"
              >
                <div className="flex items-center justify-between py-3">
                  <span className="text-xl tracking-widest text-white group-hover:text-gray-300 transition-colors">
                    {category}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}

            {/* Our Story Link */}
            <Link
              href="/our-story"
              className="group w-full text-left block no-underline"
            >
              <div className="flex items-center justify-between py-3">
                <span className="text-xl tracking-widest text-white group-hover:text-gray-300 transition-colors">
                  OUR STORY
                </span>
                <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </div>

          {/* Mobile Collections Section */}
          <div className="pt-8 border-t border-[#4a3b29]">
            <h3 className="text-lg tracking-widest text-white mb-8">
              COLLECTIONS
            </h3>
            <div className="space-y-6">
              {productData.productLines.map((line, index) => (
                <Link
                  key={index}
                  href={`/collections/${line.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="group w-full text-left block no-underline"
                >
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-white tracking-wider group-hover:text-gray-300 transition-colors mb-1">
                        {line.name.toUpperCase()}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {line.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Footer Links */}
          <div className="pt-8 mt-12 border-t border-[#4a3b29]">
            <div className="space-y-4">
              <Link
                href="/customer-service"
                className="block text-white text-sm tracking-wide hover:text-gray-300 transition-colors no-underline"
              >
                CUSTOMER SERVICE
              </Link>
              <Link
                href="/size-guide"
                className="block text-white text-sm tracking-wide hover:text-gray-300 transition-colors no-underline"
              >
                SIZE GUIDE
              </Link>
              <Link
                href="/care-instructions"
                className="block text-white text-sm tracking-wide hover:text-gray-300 transition-colors no-underline"
              >
                CARE INSTRUCTIONS
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
