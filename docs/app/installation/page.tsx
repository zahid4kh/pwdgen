"use client";

import Link from "next/link";
import { Copy, Check, Terminal, Package, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";

function CodeBlock({
  children,
  language = "bash",
}: {
  children: string;
  language?: string;
}) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          borderRadius: "0.375rem",
          margin: 0,
          fontSize: "0.875rem",
          background: "transparent",
          padding: 0,
        }}
        codeTagProps={{
          style: {
            background: "transparent",
          },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default function Installation() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
          Installation Guide
        </h1>

        <Tabs defaultValue="linux">
          <TabsList className="mb-6">
            <TabsTrigger value="linux" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Linux (APT)
            </TabsTrigger>
            <TabsTrigger value="windows" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Windows
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Manual Build
            </TabsTrigger>
          </TabsList>

          <TabsContent value="linux" className="space-y-8">
            <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
              <Package className="h-4 w-4" />
              <AlertTitle className="text-green-800 dark:text-green-300">
                Recommended Method
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                Easy installation on Ubuntu/Debian-based systems using our APT
                repository.
              </AlertDescription>
            </Alert>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                APT Repository Installation
              </h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                Install PwdGen directly using APT package manager:
              </p>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                1. Add the repository GPG key
              </h3>
              <CodeBlock language="bash">{`wget -qO- https://zahid4kh.github.io/my-apt-repo/KEY.gpg | sudo gpg --dearmor -o /usr/share/keyrings/zahid-archive-keyring.gpg`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                2. Add the repository to your sources list
              </h3>
              <CodeBlock language="bash">{`echo "deb [arch=amd64 signed-by=/usr/share/keyrings/zahid-archive-keyring.gpg] https://zahid4kh.github.io/my-apt-repo stable main" | sudo tee /etc/apt/sources.list.d/zahid-apps.list`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                3. Update package list and install PwdGen
              </h3>
              <CodeBlock language="bash">{`sudo apt update
sudo apt install pwdgen`}</CodeBlock>

              <p className="mt-6 text-zinc-700 dark:text-zinc-300">
                After installation, launch PwdGen from your applications menu or
                run{" "}
                <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
                  pwdgen
                </code>{" "}
                in your terminal.
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md p-4 mt-6">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Additional Applications Available
                </h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  The repository also includes other applications:{" "}
                  <code>kached</code> (code snippet manager),
                  <code>markdownify</code> (markdown editor), and{" "}
                  <code>sumpdf</code> (PDF tools).
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                Uninstalling
              </h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                To uninstall PwdGen:
              </p>

              <CodeBlock>{`# Remove the application
sudo apt remove pwdgen

# Optionally, remove the entire repository
sudo rm /etc/apt/sources.list.d/zahid-apps.list
sudo rm /usr/share/keyrings/zahid-archive-keyring.gpg
sudo apt update`}</CodeBlock>
            </section>
          </TabsContent>

          <TabsContent value="windows" className="space-y-8">
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
              <Download className="h-4 w-4" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">
                Windows Support
              </AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                Native Windows installers are currently in development.
              </AlertDescription>
            </Alert>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                Windows Installation
              </h2>

              <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  🚧 Coming Soon
                </h3>
                <p className="text-yellow-700 dark:text-yellow-400 mb-4">
                  Windows installers (.msi and .exe) are currently being
                  prepared and will be available soon.
                </p>
                <ul className="text-yellow-700 dark:text-yellow-400 space-y-2">
                  <li>
                    <strong>MSI Installer:</strong> Traditional Windows
                    installer package
                  </li>
                  <li>
                    <strong>EXE Installer:</strong> Portable executable
                    installer
                  </li>
                  <li>
                    <strong>Expected Release:</strong> Within the next few weeks
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                Current Options
              </h3>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                While we prepare the Windows installers, you can:
              </p>

              <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-6">
                <li>
                  Build from source using the manual build instructions below
                </li>
                <li>
                  Use WSL (Windows Subsystem for Linux) with the Linux
                  installation method
                </li>
                <li>Wait for the official Windows installers (recommended)</li>
              </ol>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md p-4">
                <p className="text-blue-700 dark:text-blue-400">
                  <strong>Stay Updated:</strong> Watch the{" "}
                  <a
                    href="https://github.com/zahid4kh/pwdgen"
                    className="underline"
                  >
                    GitHub repository
                  </a>
                  for Windows installer release announcements.
                </p>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="manual" className="space-y-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                Manual Build from Source
              </h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                Build PwdGen from source code for development or if you prefer
                manual installation.
              </p>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                Prerequisites
              </h3>
              <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300 mb-4">
                <li>JDK 17 or later</li>
                <li>Git</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                1. Clone the repository
              </h3>
              <CodeBlock>{`git clone https://github.com/zahid4kh/pwdgen.git
cd pwdgen`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                2. Make Gradle wrapper executable (Linux/macOS)
              </h3>
              <CodeBlock>{`chmod +x gradlew`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                3. Run the application
              </h3>
              <CodeBlock>{`# Standard run
./gradlew run

# With hot reload for development
./gradlew :runHot --mainClass PwdGen --auto`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">
                4. Build native distribution (optional)
              </h3>
              <CodeBlock>{`# Build for current OS
./gradlew packageDistributionForCurrentOS

# Platform-specific builds
./gradlew packageDmg    # macOS
./gradlew packageMsi    # Windows  
./gradlew packageDeb    # Linux
./gradlew packageExe    # Windows`}</CodeBlock>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md p-4 mt-4">
                <p className="text-blue-700 dark:text-blue-400">
                  <strong>Note:</strong> Built distributions will be available
                  in <code>build/compose/binaries/</code>
                </p>
              </div>
            </section>
          </TabsContent>
        </Tabs>

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
  );
}
