"use client";

import Header from "../pages/layouts/Header";
import Section from "./layouts/Section";
import About from "./layouts/About";
import Blog from "./layouts/Blog";
import Contact from "./layouts/Contact";
export default function Example() {
  return (
    <div className="bg-white">
      <Header />
      <div id="home">
        <Section />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
