export async function GET() {
  try {
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Error fetching IP data:", error)
    return Response.json({ error: "Failed to fetch IP data" }, { status: 500 })
  }
}
