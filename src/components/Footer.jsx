import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-coco-yellow to-coco-orange py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Navigation Links */}
          <div>
            <h3
              className="text-lg font-semibold text-gray-800 mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-800 hover:text-white transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-gray-800 hover:text-white transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-800 hover:text-white transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-800 hover:text-white transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-lg font-semibold text-gray-800 mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Contact Us
            </h3>
            <p
              className="text-gray-800"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Coco's Treats<br />
              10 Meadow Row,<br />
              Buckinghams,<br />
              MK18 1PU<br />
              Email: info@cocobubbletea.com<br />
              Phone: +44 123 456 7890
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3
              className="text-lg font-semibold text-gray-800 mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" className="text-gray-800 hover:text-white transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-800 hover:text-white transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-800 hover:text-white transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-800">
          <p style={{ fontFamily: 'Poppins, sans-serif' }}>
            &copy; {new Date().getFullYear()} Coco's Bubble Tea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;