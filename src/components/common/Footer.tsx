import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t shadow-md mt-8">
      <div className="container mx-auto px-4 py-8 md:px-8 flex flex-col items-center">
        <img src="./logo.png" alt="Butterfly Library Logo" className="h-12 mb-4" />
        <p className="text-center text-gray-600 text-sm font-light tracking-wide mb-4">
          © {currentYear} Butterfly Library Management System. All Rights Reserved.
        </p>
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
            <FaTwitter size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
            <FaFacebook size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}