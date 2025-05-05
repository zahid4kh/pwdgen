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
        <code className="text-sm font-mono">{children}</code>
      </pre>
    </div>
  )
}

export default function Documentation() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Documentation</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Generates secure 22-character passwords (customizable length)</li>
            <li>Includes random uppercase letters, lowercase letters, numbers, and special characters</li>
            <li>Colorful, user-friendly terminal interface</li>
            <li>Comprehensive error handling and input validation</li>
            <li>Logging system that records operations</li>
            <li>Automatic clipboard integration (requires xclip, pbcopy, or wl-copy)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Usage</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">Basic usage:</p>
          <CodeBlock>pwdgen</CodeBlock>

          <p className="mb-4 text-zinc-700 dark:text-zinc-300">With options:</p>
          <CodeBlock>{`# Generate a 16-character password
pwdgen -l 16

# Generate a password without special characters
pwdgen --no-special

# Enable verbose output
pwdgen -v

# Display help information
pwdgen --help`}</CodeBlock>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Options</h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">-l, --length NUM</code> - Set password
              length (default: 22)
            </li>
            <li>
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">-h, --help</code> - Display help
              message
            </li>
            <li>
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">-v, --verbose</code> - Enable verbose
              mode
            </li>
            <li>
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">--no-special</code> - Exclude special
              characters
            </li>
            <li>
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">--no-numbers</code> - Exclude numbers
            </li>
            <li>
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">--no-lowercase</code> - Exclude
              lowercase letters
            </li>
            <li>
              <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">--no-uppercase</code> - Exclude
              uppercase letters
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Example Output</h2>
          <CodeBlock>{`Secure Password Generator v1.0

Generated Password: QWr]oHs/%D;%PO~o2Trb6j
Password copied to clipboard!`}</CodeBlock>
        </section>

        <div className="mt-12 flex justify-center">
          <Link
            href="/installation"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 h-10 px-4 py-2"
          >
            View Installation Guide
          </Link>
        </div>
      </div>
    </div>
  )
}
