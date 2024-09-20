import React from "react";
import aboutImage from "../assets/images/aboutImage2.png";
import AboutUsCard from "../components/Cards/AboutUsCards";
import AboutImageTree from "../assets/images/AboutImageTree2.png";
import AboutImageTree2 from "../assets/images/AboutImageTree3.png";

function AboutUs() {
  return (
    <>
      <div className="mx-auto px-4 py-8">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-xl font-bold uppercase text-black mb-8">
          About Us
        </h2>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row mb-8">
          {/* Text Content */}
          <div className="lg:w-3/5 pr-4 mb-4 lg:mb-0">
            <p className="text-sm mb-4">
              At E-ANCESTRY, we are passionate about helping you uncover and
              celebrate your family’s history. Our mission is to provide you
              with the tools, resources, and expertise needed to explore your
              ancestry, understand your heritage, and preserve your family’s
              legacy. Your family’s history is full of untold stories and hidden
              connections. We help you to uncover new details, and deepen your
              understanding of your heritage. Sign up today and take the next
              step in uncovering the rich tapestry of your family’s past.
            </p>
            <p className="text-sm">
              onvallis. Sed ut vulputate nisi. Integer in felis sed leo ibulum
              venenatis. Curabitur tempor quis eros tempus lacinia. Nam
              bionvallis. Sed ut vulputate nisi. Integer in felis sed leo
              vestibulum venenatis. Curabitur tempor quis eros tempus lacinia.
              Nam bionvallis. Sed ut vulputate nisi. Integer in felis sed leo
              vestibulum venenatis. Curabitur tempor quis eros tempus bi nisi.
              Integer in felis sed leo vestibulum venenatis. Curabitur tempor
              quis eros tempus lacinia. Nam bionvallis. Sed ut vulputate nisi.
              Integer in felis sed leo vestibulum venenatis.
            </p>
          </div>

          {/* Image */}
          <div className="lg:w-2/5 flex justify-center items-center bg-transparent shadow-none">
            <img
              src={aboutImage}
              alt="About Us"
              className="w-full max-w-sm object-cover"
            />
          </div>
        </div>

        {/* Split Screen Content */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 pr-4">
            {/* Who We Are */}
            <div className="mb-8">
              <h2 className="text-start text-base underline font-bold uppercase text-black mb-3">
                Who We Are
              </h2>
              <div>
                <h3>Dedicated Genealogy Experts:</h3>
                <p className="text-sm">
                  Our team consists of skilled genealogists, historians, and
                  researchers with extensive experience in family history
                  research. We are committed to guiding you through the
                  complexities of tracing your roots and uncovering the stories
                  of your ancestors.
                </p>
                <h3>Innovative Technology:</h3>
                <p className="text-sm">
                  We leverage cutting-edge technology to offer powerful search
                  tools, comprehensive databases, and user-friendly interfaces.
                  Our goal is to make your genealogy research as efficient and
                  enjoyable as possible.
                </p>
                <h3>Community and Support:</h3>
                <p className="text-sm">
                  We believe in the power of community and collaboration. Our
                  platform connects you with other family researchers, provides
                  personalized support, and offers educational resources to
                  enhance your research journey.
                </p>
              </div>
            </div>

            {/* Our Services */}
            <div className="mb-8">
              <h2 className="text-start text-base underline font-bold uppercase text-black mb-3">
                Our Services
              </h2>
              <h3>Genealogy Research Tools:</h3>
              <p className="text-sm">
                Access a wide range of resources, including historical records,
                databases, and search features, to help you trace your family
                tree and discover your heritage.
              </p>
              <h3>Personalized Assistance:</h3>
              <p className="text-sm">
                Receive expert guidance and support from our team of
                genealogists. Whether you need help with specific research
                challenges or general advice, we are here to assist you.
              </p>
              <h3>Educational Resources:</h3>
              <p className="text-sm">
                Explore our collection of articles, webinars, and guides to
                learn more about genealogy research techniques, historical
                contexts, and best practices.
              </p>
              <h3>Family History Preservation:</h3>
              <p className="text-sm">
                Utilize our tools to document, organize, and preserve your
                family’s history. Create and maintain a detailed family tree,
                save important records, and share your discoveries with loved
                ones.
              </p>
            </div>

            {/* Our Commitment */}
            <div className="mb-8">
              <h2 className="text-start text-base underline font-bold uppercase text-black mb-3">
                Our Commitment
              </h2>
              <h3>Accuracy and Integrity:</h3>
              <p className="text-sm">
                We are dedicated to providing accurate and reliable information.
                Our team meticulously verifies sources and cross-references data
                to ensure the integrity of your family history research.
              </p>
              <h3>User-Centric Approach:</h3>
              <p className="text-sm">
                Your satisfaction is our priority. We strive to offer a
                user-friendly experience and responsive support to meet your
                individual needs and preferences.
              </p>
              <h3>Celebrating Heritage:</h3>
              <p className="text-sm">
                We believe in the importance of understanding and celebrating
                your heritage. Our services are designed to help you connect
                with your past, appreciate your cultural roots, and pass down
                your family’s legacy.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 pl-4">
            {/* How We Help You Understand */}
            <div className="mb-8">
              <h2 className="text-start text-base underline font-bold uppercase text-black mb-3">
                How We Help You Understand
              </h2>
              <h3>Historical Research:</h3>
              <p className="text-sm">
                Our team of experts conducts in-depth research into the
                historical context surrounding your ancestors’ lives. We provide
                you with detailed reports that explain the broader forces at
                play during their time.
              </p>
              <h3>Family Narratives:</h3>
              <p className="text-sm">
                We piece together the stories passed down through generations,
                combining them with historical data to create a comprehensive
                narrative that explains why your ancestors made certain
                decisions.
              </p>
              <h3>Interactive Timelines:</h3>
              <p className="text-sm">
                with our interactive timelines. See how their choices aligned
                with historical events, cultural shifts, and personal
                milestones.
              </p>
            </div>

            {/* Short Captions */}
            <div className="mb-8">
              <h2 className="text-start text-base underline font-bold uppercase text-black mb-3">
                Short Captions
              </h2>
              <ul className="list-disc list-inside text-sm">
                <li>
                  We don’t just present you with facts; we craft compelling
                  narratives that bring your ancestors’ experiences to life.
                </li>
                <li>
                  Whether you’re curious about your cultural roots or seeking to
                  connect with distant relatives, our advanced tools and
                  resources will guide you on an enlightening journey through
                  your ancestry.
                </li>
                <li>
                  Learn about the various ethnic groups that contribute to your
                  genetic makeup.
                </li>
                <li>
                  Our interactive maps and historical data provide a fascinating
                  glimpse into the journey your forebears took to bring you
                  where you are today.
                </li>
                <li>
                  Connect with the cultures, traditions, and histories that are
                  part of your heritage.
                </li>
                <li>
                  Our report also includes historical context to help you
                  understand how your ethnic origins have evolved over time.
                </li>
                <li>
                  Find out where your ancestors lived and how they migrated over
                  time.
                </li>
                <li>
                  Understanding the “why” behind your ancestors' actions allows
                  you to connect with them on a deeper level.
                </li>
                <li>
                  Your ancestor’s experiences might offer lessons or parallels
                  that resonate with your life today.
                </li>
                <li>
                  Your family’s history is a treasure that deserves to be
                  preserved. Share discoveries, reminisce over old photos, and
                  celebrate your shared heritage.
                </li>
                <li>
                  Share discoveries, reminisce over old photos, and celebrate
                  your shared heritage. Safeguard your family’s history with our
                  secure digital storage.
                </li>
                <li>
                  Use our platform to organize family reunions and events.
                </li>
                <li>
                  A well-told family story is a gift to future generations.
                </li>
                <li>
                  Preserve the knowledge of your family’s history so it can be
                  passed down to future generations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Cards and Images */}
      <AboutUsCard />

      {/* Image1 */}
      <div className="hidden md:block mt-12">
        <img src={AboutImageTree} alt="Family Tree" className="w-full h-auto" />
      </div>

      {/* Image2 */}
      <div className="flex justify-center items-center mt-12 md:hidden">
        <img src={AboutImageTree2} alt="Family Tree" className="w-1/2 h-auto" />
      </div>

      <div className="bg-green-500 w-full h-3 my-12"></div>

      {/* Call to Action */}
      <div className="text-center my-12">
        <h3 className="text-xl font-medium mb-2">
          Join Us in Discovering Your Family’s History at E- ANCESTRY,
        </h3>
        <p className="text-xs">
          we are excited to be part of your journey to uncover your family’s
          past. Sign up today and start exploring the rich tapestry of your
          ancestry. Together, let’s preserve and celebrate
        </p>
      </div>
    </>
  );
}

export default AboutUs;
