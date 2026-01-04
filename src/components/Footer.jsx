import React from "react";
import logo from '../assets/logo.png'
import { Link } from "react-router";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    
  return (
    <footer className="footer sm:footer-horizontal max-w-7xl mx-auto px-20  p-10 grid grid-cols-1 lg:grid-cols-5 gap-10  text-white ">
      <aside className="col-span-2">
        <Link to="/"><img className="h-20 rounded-full" src={logo} alt="local food networking web logo" /></Link>
        <p className="font-semibold ">
          Local Food Networking connects food lovers with authentic local flavors. Discover community-driven reviews, share your experiences, and explore the best dishes from nearby kitchens. Eat local, connect local.
        </p>
      </aside>
      <nav className="g">
        <h6 className="footer-title">Quick Links</h6>
        <Link to="/" className="link link-hover font-semibold ">Home</Link>
        <Link to="/all-reviews" className="link link-hover font-semibold ">All reviews</Link>
        <Link to="/my-favorite" className="link link-hover font-semibold ">My favorites</Link>
        <Link to="/my-reviews" className="link link-hover font-semibold ">My reviews</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Contact Us</h6>
        <a className="link link-hover flex items-center gap-3 font-medium"><FaFacebookF />Facebook</a>
        <a className="link link-hover flex items-center gap-3 font-medium"><MdEmail />abcd@gmail.com</a>
        <a className="link link-hover flex items-center gap-3 font-medium"><FaXTwitter />Twitter</a>
        
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>

      </nav>
    </footer>
  );
};

export default Footer;
