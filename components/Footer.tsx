import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#3b2e1e] border-t border-[#624f38]">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/images/veda_light.svg"
                alt="VEDA"
                width={69}
                height={26}
                className="mb-4"
              />
              <p className="text-white font-light mt-3 text-sm leading-relaxed">
                An upscale unisex jewelry line featuring four distinct sets
                inspired by early 2000s pop culture, each reinterpreted with
                modern, understated luxury.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1 font-light">
            <p className="text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-white text-sm">
                  Our Product lines
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="text-white text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white text-sm">
                  Jewelry Care
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white text-sm">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-1 font-light">
            <p className="text-white text-sm uppercase tracking-wider mb-4">
              Customer Service
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-white text-sm">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <p className="text-white font-light text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white" />
                <a href="mailto:hello@vedg.com" className="text-white text-sm">
                  hello@veda.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white" />
                <a href="tel:+1234567890" className="text-white text-sm">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-white mt-0.5" />
                <span className="text-white text-sm leading-relaxed">
                  123 Jewelry District
                  <br />
                  New York, NY 10013
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-12 pt-8 border-t border-[#624f38]">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Stay Connected
            </h4>
            <p className="text-white text-sm mb-4">
              Subscribe to receive updates on new collections and exclusive
              offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-[#624f38] rounded-md text-sm bg-white text-white "
              />
              <button className="px-6 py-2 bg-white text-[#3b2e1e] text-sm font-medium rounded-md hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#2d1f11] border-t border-[#624f38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white text-sm">
              © {new Date().getFullYear()} VEDA. All rights reserved.
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm  font-light">
              <Link href="/privacy" className="text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
