import React from "react";
import { Link } from "react-router-dom";
import FamilyImage from "../assets/images/familytree.png";

export default function FamilyTree() {
  return (
    <>
      <section className="mt-12 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mx-4">
        <div className="h-full flex items-center justify-center lg:order-2">
          <img src={FamilyImage} alt="Family Tree" className="w-[99%] " />
        </div>
        <div className="lg:flex lg:justify-center">
          <div className="sm:max-w-[70%] lg:text-left">
            <p className="text-3xl font-semibold mb-4 mod:text-lg">
              It is way easier to keep and to search for family records, and
              more, by just creating a tree
            </p>
            <div className="flex justify-start">
              <Link
                to="/Get-started"
                className="bg-green text-white font-bold  py-2 px-3 rounded-2xl transition ease-in-out duration-200 transform hover:scale-105"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
