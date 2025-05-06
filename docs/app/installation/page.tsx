"use client"

import Link from "next/link"
import { Copy, Check, Terminal, Package } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from "next-themes"

function CodeBlock({ children, language = "bash" }: { children: string; language?: string }) {
  const { toast } = useToast()
  const [isCopied, setIsCopied] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

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
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          borderRadius: '0.375rem',
          margin: 0,
          fontSize: '0.875rem',
          background: 'transparent'
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default function Installation() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">Installation Guide</h1>
        
        <Tabs defaultValue="apt">
          <TabsList className="mb-6">
            <TabsTrigger value="apt" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              APT Installation
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Manual Installation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="apt" className="space-y-8">
            <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
              <AlertTitle className="text-green-800 dark:text-green-300">Recommended Method</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                This is the easiest way to install the GUI version of pwdgen on Debian-based Linux systems.
              </AlertDescription>
            </Alert>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">APT Repository Installation</h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                The desktop app can be installed directly using APT. Follow these steps:
              </p>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">1. Add the repository GPG key</h3>
              <CodeBlock language="bash">{`wget -qO- https://zahid4kh.github.io/pwdgen/KEY.gpg | sudo gpg --dearmor -o /usr/share/keyrings/pwdgen-archive-keyring.gpg`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">2. Add the repository to your sources list</h3>
              <CodeBlock language="bash">{`echo "deb [arch=amd64 signed-by=/usr/share/keyrings/pwdgen-archive-keyring.gpg] https://zahid4kh.github.io/pwdgen stable main" | sudo tee /etc/apt/sources.list.d/pwdgen.list`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">3. Update the package list and install PwdGen</h3>
              <CodeBlock language="bash">{`sudo apt update
sudo apt install pwdgen`}</CodeBlock>

              <p className="mt-6 text-zinc-700 dark:text-zinc-300">
                After installation, you can launch the app from your applications menu or by running <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">pwdgen</code> in your terminal.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Uninstalling</h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                To uninstall the PwdGen application:
              </p>
              
              <CodeBlock>{`# Remove the package
sudo apt remove pwdgen

# Optionally, remove the repository and key
sudo rm /etc/apt/sources.list.d/pwdgen.list
sudo rm /usr/share/keyrings/pwdgen-archive-keyring.gpg
sudo apt update`}</CodeBlock>
            </section>
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Manual Script Installation</h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                If you prefer to use the CLI version directly, follow these steps:
              </p>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">1. Clone the repository</h3>
              <CodeBlock>{`git clone https://github.com/zahid4kh/pwdgen.git
cd pwdgen`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">2. Make the script executable</h3>
              <CodeBlock>{`chmod +x pwdgen`}</CodeBlock>

              <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-200">3. Install to your local bin directory</h3>
              <p className="mb-2 text-zinc-700 dark:text-zinc-300">
                To run the script from anywhere in your terminal:
              </p>
              <CodeBlock>{`# Create the local bin directory if it doesn't exist
mkdir -p ~/.local/bin

# Copy the script to your local bin directory
cp pwdgen ~/.local/bin/

# Make sure ~/.local/bin is in your PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc`}</CodeBlock>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md p-4 mt-4">
                <p className="text-blue-700 dark:text-blue-400">
                  <strong>Note:</strong> Using <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">~/.local/bin</code> is the recommended way to install user-specific scripts without requiring root privileges.
                </p>
              </div>
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
                On macOS, the <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">pbcopy</code> utility is already installed by default.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Uninstalling</h2>
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                To uninstall the script:
              </p>
              
              <CodeBlock>{`# Remove the script from your local bin directory
rm ~/.local/bin/pwdgen`}</CodeBlock>
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
  )
}