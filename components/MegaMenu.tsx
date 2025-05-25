"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown, Search, ShoppingBag, User, Menu, X } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { MegaMenu as MegaMenuProps } from "@/types/types";
import React from "react";
import Title from "./atoms/Title";
import MediaItem from "./atoms/MediaItem";

function FeaturedProductDisplay({
  featuredProduct,
  productLines,
}: {
  featuredProduct: any;
  productLines: any[];
}) {
  const productLineTitle =
    productLines.find((pl) =>
      featuredProduct.product_line?.some((fpl: any) => fpl.uid === pl.uid)
    )?.title || "";

  return (
    <div className="flex space-x-6">
      <div className="aspect-square w-80 h-80 bg-[#3b2e1e]">
        {featuredProduct.media?.[0]?.url && (
          <MediaItem
            src={featuredProduct.media?.[0]?.url}
            alt={featuredProduct.title || ""}
            width={320}
            height={320}
            ratio={1}
            loading="lazy"
            fit={"crop"}
            sizes="100vw,lg:50vw"
            widths={[320, 400, 600]}
          />
        )}
      </div>

      <div>
        <p className="text-white font-light text-xs uppercase mb-1">
          {productLineTitle}
        </p>
        <Title
          text={featuredProduct.title}
          theme={"light"}
          uppercase={true}
          size="lg"
          classes="mb-2 text-2xl"
          as={"h3"}
        />

        <p className="text-white font-light text-sm mb-6">
          {featuredProduct.description || featuredProduct.short_description}
        </p>

        <div>
          <Link href={featuredProduct.url} className="text-[white] uppercase">
            DISCOVER MORE
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MegaMenu({ header, product_lines }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { $, logo, links } = header;
  const megaMenuData = links?.map((link: any) => {
    return {
      label: link.link.label,
      url: link.link.item?.href || link.link.reference[0]?.url || "#",
      show_product_lines: link.link.show_product_lines,
      show_all_products_links: link.link.show_all_products_links,
      featured_product: link.link.featured_product[0],
      product_lines,
    };
  });

  const menuCategories =
    megaMenuData &&
    megaMenuData
      .filter((item) => item.featured_product)
      .map((item) => item.label.toUpperCase());

  const activeMenuObj =
    megaMenuData &&
    megaMenuData.find((item) => item.label.toUpperCase() === activeMenu);

  const featuredProduct = activeMenuObj?.featured_product || null;
  const productLines = activeMenuObj?.product_lines || [];

  const handleDesktopMenuClick = (menuId: string) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
      setIsMenuOpen(false);
    } else {
      setActiveMenu(menuId);
      setIsMenuOpen(true);
    }
  };

  const menuPanelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const menuPanel = menuPanelRef.current;
      const nav = navRef.current;
      if (
        menuPanel &&
        nav &&
        !menuPanel.contains(e.target as Node) &&
        !nav.contains(e.target as Node)
      ) {
        setActiveMenu(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className={`bg-[#3b2e1e] text-white font-light sticky top-0 z-50`}>
      <nav
        className="bg-[#3b2e1e] header border-b border-[#624f38]"
        ref={navRef}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {logo && (
              <Link href="/">
                <Image
                  {...($ && $.logo)}
                  src={logo.url}
                  alt="Veda Logo"
                  width={69}
                  height={26}
                  loading="eager"
                  priority={true}
                />
              </Link>
            )}
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {menuCategories &&
                  menuCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDesktopMenuClick(category);
                      }}
                      className={`px-3 py-2 text-sm tracking-widest transition-colors duration-200 flex items-center space-x-1 no-underline hover:underline ${
                        activeMenu === category
                          ? "text-white"
                          : "text-white hover:underline"
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
                  key={"our-story"}
                  href="/our-story"
                  className="px-3 py-2 text-sm tracking-widest text-white hover:text-gray-300 transition-colors duration-200 no-underline hover:underline"
                >
                  OUR STORY
                </Link>
              </div>
            </div>
            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <Search className="w-5 h-5" />
              </Link>
              <button>
                <User className="w-5 h-5" />
              </button>
              <button className="relative">
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

      {/* Desktop Mega Menu Panel */}
      <div
        ref={menuPanelRef}
        className={`hidden md:block absolute top-full left-0 w-full bg-[#473826] transition-all duration-300 ease-in-out z-50 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        {activeMenuObj && featuredProduct && (
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Collections Sidebar */}
              <div className="lg:col-span-3">
                <Title
                  text="product lines"
                  theme={"light"}
                  uppercase={true}
                  size="lg"
                  classes="mb-4 text-2xl"
                  as={"p"}
                />

                <div className="space-y-4">
                  {productLines.map((line, index) => (
                    <React.Fragment key={`link-${index}`}>
                      {line.url && (
                        <Link
                          href={line.url}
                          className="text-left w-full block no-underline text-white uppercase hover:underline"
                        >
                          {line.title}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {/* Shop All Link */}
                {activeMenuObj.show_all_products_links && (
                  <div className="mt-6 pt-6 border-t border-[#624f38]">
                    <Link
                      href={activeMenuObj.url}
                      className="text-left w-full block no-underline text-white uppercase hover:underline"
                    >
                      {`SHOP ALL ${activeMenuObj.label}`}
                    </Link>
                  </div>
                )}
              </div>
              {/* Editorial Featured Product Display */}
              <div className="lg:col-span-9">
                <FeaturedProductDisplay
                  featuredProduct={featuredProduct}
                  productLines={productLines}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
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
          {/* Mobile Category Navigation */}
          <div className="space-y-6 mb-12">
            {megaMenuData &&
              megaMenuData
                .filter((item) => item.featured_product)
                .map((item, index) => (
                  <React.Fragment key={`link2-${index}`}>
                    {item.url && (
                      <Link
                        href={item.url}
                        className="text-left w-full block no-underline text-white uppercase"
                      >
                        {item.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}

            <Link
              href={"/our-story"}
              className="text-left w-full block no-underline text-white uppercase"
            >
              our story
            </Link>
          </div>
          {/* Mobile Collections Section */}
          <div className="pt-8 border-t border-[#4a3b29]">
            <h3 className="text-lg tracking-widest text-white mb-8">
              COLLECTIONS
            </h3>
            <div className="space-y-6">
              {(
                (megaMenuData &&
                  megaMenuData.find((item) => item.product_lines)
                    ?.product_lines) ||
                []
              ).map((line: any, index: number) => (
                <React.Fragment key={`link3-${index}`}>
                  {line.url && (
                    <Link
                      href={line.url}
                      className="text-left w-full block no-underline text-white uppercase"
                    >
                      {line.title}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Mobile Footer Links */}
          <div className="pt-8 mt-12 border-t border-[#4a3b29]">
            <div className="space-y-4">
              <Link
                href="/customer-service"
                className="block text-white text-sm tracking-wide hover:text-gray-300 transition-colors no-underline hover:underline"
              >
                CUSTOMER SERVICE
              </Link>
              <Link
                href="/size-guide"
                className="block text-white text-sm tracking-wide hover:text-gray-300 transition-colors no-underline hover:underline"
              >
                SIZE GUIDE
              </Link>
              <Link
                href="/care-instructions"
                className="block text-white text-sm tracking-wide hover:text-gray-300 transition-colors no-underline hover:underline"
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
