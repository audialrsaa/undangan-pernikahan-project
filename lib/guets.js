const API_URL = process.env.NEXT_PUBLIC_GUEST_API_URL;

export async function getGuests() {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data tamu");
  }

  return response.json();
}