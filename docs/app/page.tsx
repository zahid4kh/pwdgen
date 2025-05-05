import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem-3.5rem)]">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
              Secure Password Generator
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-zinc-700 dark:text-zinc-300">
              Generate robust, random passwords with customizable options to enhance your online security
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <Link href="/generator">Try Generator</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/installation">Installation Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-zinc-900 dark:text-zinc-100">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Secure by Default"
              description="Generates 22-character passwords with a mix of uppercase, lowercase, numbers, and special characters"
            />
            <FeatureCard
              title="Customizable"
              description="Adjust password length and character sets to meet specific requirements"
            />
            <FeatureCard
              title="User-Friendly"
              description="Simple interface with colorful terminal output and comprehensive error handling"
            />
            <FeatureCard title="Cross-Platform" description="Works on Linux, macOS, and other Unix-like systems" />
            <FeatureCard
              title="Clipboard Integration"
              description="Automatically copies generated passwords to your clipboard"
            />
            <FeatureCard
              title="Open Source"
              description="Free to use, modify, and distribute under open source license"
            />
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-zinc-100 dark:bg-zinc-900 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Ready to enhance your security?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-zinc-700 dark:text-zinc-300">
            Start generating secure passwords today with pwdgen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Link href="/generator">Try Generator</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">Read Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="text-zinc-700 dark:text-zinc-300">{description}</p>
    </div>
  )
}
