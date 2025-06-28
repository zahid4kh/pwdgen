"use client";

import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function CodeBlock({ children }: { children: string }) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children.trim());
    setIsCopied(true);
    toast({
      title: "Copied!",
      description: "Code snippet copied to clipboard",
      duration: 2000,
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

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
  );
}

export default function Documentation() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
          Documentation
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              Generate secure passwords with customizable length (7-75
              characters)
            </li>
            <li>
              Toggle character sets: uppercase, lowercase, numbers, and special
              characters
            </li>
            <li>Modern Material 3 interface with dark/light theme support</li>
            <li>Resizable window with adaptive grid layout</li>
            <li>Instant clipboard integration with visual feedback</li>
            <li>Smooth animations and interactive tooltips</li>
            <li>Offline operation - no internet connection required</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Desktop Application Usage
          </h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">
            Launch PwdGen from your applications menu or terminal:
          </p>
          <CodeBlock>pwdgen</CodeBlock>

          <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            Interface Elements
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
            <li>
              <strong>Character Set Toggles:</strong> Enable/disable uppercase,
              lowercase, numbers, and special characters
            </li>
            <li>
              <strong>Password Length Slider:</strong> Adjust from 7 to 75
              characters
            </li>
            <li>
              <strong>Generate Button:</strong> Create a new password based on
              your settings
            </li>
            <li>
              <strong>Copy Button:</strong> Instantly copy the generated
              password to clipboard
            </li>
            <li>
              <strong>Theme Toggle:</strong> Switch between light and dark modes
            </li>
            <li>
              <strong>Window Resize:</strong> Toggle between compact and
              expanded layouts
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Installation Options
          </h2>

          <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            Linux (Recommended)
          </h3>
          <p className="mb-2 text-zinc-700 dark:text-zinc-300">
            Install via APT repository:
          </p>
          <CodeBlock>{`# Add repository
wget -qO- https://zahid4kh.github.io/my-apt-repo/KEY.gpg | sudo gpg --dearmor -o /usr/share/keyrings/zahid-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/zahid-archive-keyring.gpg] https://zahid4kh.github.io/my-apt-repo stable main" | sudo tee /etc/apt/sources.list.d/zahid-apps.list

# Install
sudo apt update && sudo apt install pwdgen`}</CodeBlock>

          <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            Windows
          </h3>
          <p className="mb-2 text-zinc-700 dark:text-zinc-300">
            Windows installers (.msi and .exe) are coming soon!
          </p>

          <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            Build from Source
          </h3>
          <CodeBlock>{`git clone https://github.com/zahid4kh/pwdgen.git
cd pwdgen
chmod +x gradlew
./gradlew run`}</CodeBlock>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Security Best Practices
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              Use passwords with at least 12 characters for better security
            </li>
            <li>Include a mix of all character types when possible</li>
            <li>Generate unique passwords for each account</li>
            <li>
              Consider using a password manager to store generated passwords
            </li>
            <li>Regularly update passwords for critical accounts</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Technical Details
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Platform:</strong> Kotlin with Compose Desktop
            </li>
            <li>
              <strong>UI Framework:</strong> Material 3 design system
            </li>
            <li>
              <strong>Requirements:</strong> JRE 17+ (automatically installed
              with package)
            </li>
            <li>
              <strong>Package Size:</strong> ~110MB installed (includes JRE)
            </li>
            <li>
              <strong>Data Storage:</strong> All generation happens in memory -
              no data persistence
            </li>
          </ul>
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
  );
}
