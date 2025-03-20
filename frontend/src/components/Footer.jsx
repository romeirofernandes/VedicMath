import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="py-16 px-6 lg:px-16 bg-[#0a0a10] border-t border-[#2a2a35]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-30">
            <div className="md:col-span-1">
              <div className="font-bricolage font-bold text-2xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent mb-4">
                VedicMath
              </div>
              <div className="mt-6 pt-6 border-t border-[#2a2a35]/50">
                <p className="font-inter text-sm text-[#e0c9b1]/70">
                  Based on concepts from{" "}
                  <span className="font-medium text-[#e0c9b1]">
                    "Vedic Math"
                  </span>{" "}
                  by Himanshu Pancholi
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-bricolage font-semibold text-[#e0c9b1] mb-4">
                About the Book
              </h3>
              <p className="font-inter text-[#e0c9b1]/70">
                "Vedic Math" by Himanshu Pancholi explores ancient mathematical
                techniques from the Vedas. These methods offer faster
                calculations and deeper mathematical insights, providing an
                alternative approach to conventional mathematics.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#2a2a35]/50 flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center">
            <p className="font-inter text-sm text-[#e0c9b1]/60">
              © {new Date().getFullYear()} VedicMath. All rights reserved.
            </p>
            <div className="text-center text-sm">
              <p className="font-inter text-[#e0c9b1]/80">
                Romeiro Fernandes &nbsp; |&nbsp; Russel Paul &nbsp; |&nbsp;
                Mayank Mehta &nbsp; | &nbsp; Reniyas Nadar
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
