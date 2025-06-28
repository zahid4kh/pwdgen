import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem-3.5rem)]">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
              PwdGen - Secure Password Generator
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-zinc-700 dark:text-zinc-300">
              A modern desktop application for generating robust, customizable
              passwords with an intuitive Material 3 interface
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <Link href="/generator">Try Web Generator</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/installation">Download Desktop App</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900 dark:text-zinc-100">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Modern Material 3 UI"
              description="Beautiful dark/light themes with smooth animations, tooltips, and responsive design"
            />
            <FeatureCard
              title="Highly Customizable"
              description="Adjust password length (7-75 chars), character sets, and advanced policies to meet any requirement"
            />
            <FeatureCard
              title="Instant Clipboard Copy"
              description="Generated passwords are instantly copied to clipboard with visual feedback"
            />
            <FeatureCard
              title="Adaptive Interface"
              description="Resizable window with grid layout that adapts to your workflow preferences"
            />
            <FeatureCard
              title="Cross-Platform Ready"
              description="Available for Linux (APT), with Windows installers coming soon"
            />
            <FeatureCard
              title="Privacy Focused"
              description="All generation happens locally - no data sent to servers, completely offline"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-100 dark:bg-zinc-900 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
            Ready to enhance your security?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-zinc-700 dark:text-zinc-300">
            Get started with PwdGen today - available as a desktop application
            or try the web version
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Link href="/installation">Install Desktop App</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">Read Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="text-zinc-700 dark:text-zinc-300">{description}</p>
    </div>
  );
}
