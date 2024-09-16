"use client"
import { motion } from "framer-motion";
import LogoImage from "../../../public/readspace.jpg";
import MissionImage from "../../../public/mission.jpg";
import Image from "next/image.js";
import Link from "next/link.js";
import { FaBook, FaGlobe, FaTruck, FaAward } from "react-icons/fa";

const bulletPoints = [
  { icon: FaBook, text: "Curate a diverse collection of quality literature" },
  { icon: FaGlobe, text: "Make books accessible to readers worldwide" },
  { icon: FaTruck, text: "Provide fast and reliable delivery" },
  { icon: FaAward, text: "Offer competitive prices" },
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutUs() {
  return (
    <div
      data-theme="cupcake"
      className="min-h-screen bg-gradient-to-b from-background to-muted text-primary-content"
    >
      {/* Hero Section */}
      <motion.section
        className="relative h-[50vh] flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src={LogoImage}
          width={0}
          height={0}
          className="absolute inset-0 object-cover blur-sm w-full h-full"
        />
        <div className="relative z-20 text-center text-white">
          <motion.h1 className="text-5xl font-bold mb-4 text-gray-400">
            ReadSpace
          </motion.h1>
          <motion.p className="text-xl">
            Your Gateway to Literary Adventures
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.div
        className="container mx-auto px-4 py-12 space-y-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.section
          className="grid md:grid-cols-2 gap-8 items-center"
          variants={fadeInUp}
        >
          <div>
            <motion.h2 className="text-3xl font-semibold mb-4">
              Our Mission
            </motion.h2>
            <motion.p className="text-muted-foreground mb-4">
              At ReadSpace, we believe that books have the power to transform
              lives and enrich experiences. We're passionate about connecting
              readers with their next favorite book. Our mission is to create an
              online platform where book lovers can discover, explore, and dive
              into new worlds through the joy of reading.
            </motion.p>
            <ul className="space-y-2">
              {bulletPoints.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2"
                  variants={fadeInUp}
                >
                  <item.icon className="w-5 h-5 text-orange-500" />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div variants={fadeInUp}>
            <Image
              src={MissionImage}
              width={0}
              height={0}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section className="text-center" variants={fadeInUp}>
          <h2 className="text-3xl font-semibold mb-6">Join Our Community</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become a part of the Read Space community and embark on countless
            literary journeys. Sign up now to receive updates, exclusive offers,
            and join our book-loving community.
          </p>
          <Link href="/register">
            <motion.button
              type="button"
              className="btn btn-accent bg-orange-400 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign up Now
            </motion.button>
          </Link>
        </motion.section>
      </motion.div>
    </div>
  );
}
