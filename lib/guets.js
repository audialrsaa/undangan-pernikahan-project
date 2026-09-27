const API_URL = process.env.NEXT_PUBLIC_GUEST_API_URL;

export async function getGuest(id) {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_GUEST_API_URL belum disetting"
    );
  }

  const response = await fetch(
    `${API_URL}?to-guest=${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data tamu");
  }

  const data = await response.json();

  if (!data.success) {
    return null;
  }

  return data.guest;
}