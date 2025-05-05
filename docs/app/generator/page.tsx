"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Copy, Check } from "lucide-react"

export default function Generator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(22)
  const [useSpecial, setUseSpecial] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    if (!useSpecial && !useNumbers && !useLowercase && !useUppercase) {
      toast({
        title: "Error",
        description: "At least one character set must be enabled",
        variant: "destructive",
      })
      return
    }

    const specialChars = "!@#$%^&*()-_=+[]{}\\;:,.<>?/~"
    const numberChars = "0123456789"
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let chars = ""
    if (useSpecial) chars += specialChars
    if (useNumbers) chars += numberChars
    if (useLowercase) chars += lowercaseChars
    if (useUppercase) chars += uppercaseChars

    const passwordChars = []

    // Ensure at least one character from each enabled set
    if (useSpecial) {
      passwordChars.push(specialChars.charAt(Math.floor(Math.random() * specialChars.length)))
    }
    if (useNumbers) {
      passwordChars.push(numberChars.charAt(Math.floor(Math.random() * numberChars.length)))
    }
    if (useLowercase) {
      passwordChars.push(lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length)))
    }
    if (useUppercase) {
      passwordChars.push(uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length)))
    }

    // Fill the rest of the password
    while (passwordChars.length < length) {
      passwordChars.push(chars.charAt(Math.floor(Math.random() * chars.length)))
    }

    // Shuffle the password characters
    for (let i = passwordChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]]
    }

    setPassword(passwordChars.join("").substring(0, length))
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">Password Generator</h1>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Label htmlFor="password" className="text-sm font-medium mr-2">
                Generated Password
              </Label>
              <Button variant="ghost" size="sm" onClick={copyToClipboard} disabled={!password} className="h-8 px-2">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex">
              <Input
                id="password"
                value={password}
                readOnly
                className="font-mono text-lg"
                placeholder="Click generate to create password"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="length" className="text-sm font-medium">
                Password Length: {length}
              </Label>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs">8</span>
                <Slider
                  id="length"
                  min={8}
                  max={128}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                  className="flex-1"
                />
                <span className="text-xs">128</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useUppercase"
                  checked={useUppercase}
                  onCheckedChange={(checked) => setUseUppercase(checked as boolean)}
                />
                <Label htmlFor="useUppercase" className="text-sm font-medium">
                  Include Uppercase
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useLowercase"
                  checked={useLowercase}
                  onCheckedChange={(checked) => setUseLowercase(checked as boolean)}
                />
                <Label htmlFor="useLowercase" className="text-sm font-medium">
                  Include Lowercase
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useNumbers"
                  checked={useNumbers}
                  onCheckedChange={(checked) => setUseNumbers(checked as boolean)}
                />
                <Label htmlFor="useNumbers" className="text-sm font-medium">
                  Include Numbers
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useSpecial"
                  checked={useSpecial}
                  onCheckedChange={(checked) => setUseSpecial(checked as boolean)}
                />
                <Label htmlFor="useSpecial" className="text-sm font-medium">
                  Include Special Characters
                </Label>
              </div>
            </div>

            <Button
              onClick={generatePassword}
              className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Generate Password
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Password Strength Tips</h2>
          <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Use a minimum of 12 characters for better security</li>
            <li>Include a mix of uppercase, lowercase, numbers, and special characters</li>
            <li>Avoid using personal information or common words</li>
            <li>Use different passwords for different accounts</li>
            <li>Consider using a password manager to store your passwords securely</li>
          </ul>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
