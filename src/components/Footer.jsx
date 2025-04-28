import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-gray-400">© 2025 Coco Bubble Tea. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;