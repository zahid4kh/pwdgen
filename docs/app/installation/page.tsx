"use client"

import Link from "next/link"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

function CodeBlock({ children }: { children: string }) {
  const { toast } = useToast()
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children.trim())
    setIsCopied(true)
    toast({
      title: "Copied!",
      description: "Code snippet copied to clipboard",
      duration: 2000,
    })
    
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }
  

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md overflow-x-auto mb-6 relative group">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-all bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <pre className="overflow-x-auto">
        <code className="text-sm">{children}</code>
      </pre>
    </div>
  )
}

export default function Installation() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Installation Guide</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Basic Installation</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">Follow these steps to install pwdgen:</p>

          <CodeBlock>{`# Clone the repository
git clone https://github.com/zahid4kh/pwdgen.git

# Navigate to the directory
cd pwdgen

# Make the script executable
chmod +x pwdgen

# Optional: Move to a directory in your PATH
sudo cp pwdgen /usr/local/bin/`}</CodeBlock>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Clipboard Functionality</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">
            For clipboard functionality, install one of these utilities:
          </p>

          <CodeBlock>{`# For Linux X11
sudo apt install xclip

# For Linux Wayland
sudo apt install wl-clipboard`}</CodeBlock>

          <p className="text-zinc-700 dark:text-zinc-300">
            On macOS, the <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">pbcopy</code> utility is
            already installed by default.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Verifying Installation</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">
            After installation, verify that pwdgen is working correctly:
          </p>

          <CodeBlock>{`# Run the basic command
pwdgen

# Check the help information
pwdgen --help`}</CodeBlock>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Troubleshooting</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">If you encounter any issues during installation:</p>

          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Ensure you have the necessary permissions to execute the script</li>
            <li>Check that the script is in your PATH if you're trying to run it from any directory</li>
            <li>For clipboard issues, verify that the appropriate clipboard utility is installed</li>
            <li>Check the GitHub repository for any reported issues or updates</li>
          </ul>
        </section>

        <div className="mt-12 flex justify-center space-x-4">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            View Documentation
          </Link>
          <Link
            href="/generator"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 h-10 px-4 py-2"
          >
            Try Generator
          </Link>
        </div>
      </div>
    </div>
  )
}
