import Link from "next/link";
import ArcadiaLogo from "./assets/ArcadiaLogo";
import AnimatedTagline from "./components/AnimatedTagline";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold mb-4 flex items-center gap-3">
        <ArcadiaLogo className="h-15 w-15" />
        Arcadia
      </h1>
      <p className="text-xl mb-8 flex justify-center">
        <AnimatedTagline />
      </p>
      <Link
        href="/draw"
        className="bg-primary text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-[#2a7aef]/90 transition duration-200"
      >
        Get Started
      </Link>
    </main>
  );
}

// Arcadia thus serves as a unique, professional, and deeply meaningful name for your multi-year contribution graph project — combining historical richness, natural beauty, and time visualization in one elegant word.
