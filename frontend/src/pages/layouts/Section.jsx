import React from "react";

function Section({ id }) {
  return (
    <div>
      <div className="relative isolate px-6 pt-2 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        ></div>
        <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-36">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Hello, welcome, make yourself comfortable.
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Our website for notes will help you create your daily, monthly,
              annual plans, everything is easy with us.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signup"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#about"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
