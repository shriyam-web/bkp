import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Flag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-blue-600">
                <Flag className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white block">
                  Bahujan Kranti Party
                </span>
                <span className="text-xs text-gray-400">
                  (Marxwaad-Ambedkarwaad)
                </span>
              </div>
            </div>
            <p className="text-sm">
              Official website dedicated to social equality, workers' rights, and inclusive development. Building a stronger, progressive India for every citizen.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Official Website: <a href="https://bharatparty.in" className="text-red-500 hover:text-red-400">bharatparty.in</a>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-red-600 transition-colors">About Us</Link></li>
              <li><Link href="/leadership" className="hover:text-red-600 transition-colors">Leadership</Link></li>
              <li><Link href="/manifesto" className="hover:text-red-600 transition-colors">Manifesto</Link></li>
              <li><Link href="/join" className="hover:text-red-600 transition-colors">Join Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="hover:text-red-600 transition-colors">News</Link></li>
              <li><Link href="/events" className="hover:text-red-600 transition-colors">Events</Link></li>
              <li><Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>141, Dhansua PO Central Jail Fatehgarh Farrukhabad, 209602, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span>+91 7376264269</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-red-600" />
                <span>bahujankrantipartyma@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; 2025 Bahujan Kranti Party (Marxwaad-Ambedkarwaad). All rights reserved. | Official Website: bharatparty.in
          </p>
          <div className="flex space-x-6 text-sm mt-4 sm:mt-0">
            <Link href="#" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-red-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
