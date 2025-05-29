"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  date: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
  }[]
  total: number
  status: "pending" | "confirmed" | "delivered" | "cancelled"
}

// Menu data untuk pengecekan ketersediaan
const menuData = [
  // Monday
  {
    day: "Monday",
    items: [
      [
        { id: "m1-1", name: "Nasi Putih", image: "/images/nasi-putih.png", price: 5000 },
        { id: "m1-2", name: "Nasi Merah", image: "/images/nasi-merah.png", price: 5500 },
        { id: "m1-3", name: "Ayam Woku", image: "/images/ayam-woku.png", price: 19000 },
        { id: "m1-4", name: "Sapi Lada Hitam", image: "/images/sapi-lada-hitam.png", price: 23000 },
        { id: "m1-5", name: "Telur Barendo", image: "/images/telur-barendo.png", price: 14000 },
      ],
      [
        { id: "m1-6", name: "Cah Brokoli", image: "/images/cah-brokoli.png", price: 8000 },
        { id: "m1-7", name: "Tauge Ikan Asin", image: "/images/tauge-ikan-asin.png", price: 8000 },
        { id: "m1-8", name: "Tempe Goreng", image: "/images/tempe-goreng.png", price: 6000 },
        { id: "m1-9", name: "Sayur Bening", image: "/images/sayur-bening.png", price: 7500 },
        { id: "m1-10", name: "Nila Goreng", image: "/images/nila-goreng.png", price: 18500 },
      ],
    ],
  },
  // Tuesday
  {
    day: "Tuesday",
    items: [
      [
        { id: "m2-1", name: "Nasi Putih", image: "/images/nasi-putih.png", price: 5000 },
        { id: "m2-2", name: "Mie Kuning", image: "/images/mie-kuning.png", price: 6500 },
        { id: "m2-3", name: "Ayam Asam Manis", image: "/images/ayam-asam-manis.png", price: 19000 },
        { id: "m2-4", name: "Sapi Panggang", image: "/images/sapi-panggang.png", price: 23000 },
        { id: "m2-5", name: "Ikan Bakar", image: "/images/ikan-bakar.png", price: 18500 },
      ],
      [
        { id: "m2-6", name: "Labu Siam", image: "/images/labu-siam.png", price: 8000 },
        { id: "m2-7", name: "Bebek Goreng", image: "/images/bebek-goreng.png", price: 25000 },
        { id: "m2-8", name: "Tahu Bacem", image: "/images/tahu-bacem.png", price: 6000 },
        { id: "m2-9", name: "Kuah Oyong", image: "/images/kuah-oyong.png", price: 7500 },
        { id: "m2-10", name: "Telur Balado", image: "/images/telur-balado.png", price: 5000 },
      ],
    ],
  },
  // Wednesday
  {
    day: "Wednesday",
    items: [
      [
        { id: "m3-1", name: "Nasi putih", image: "/images/nasi-putih.png", price: 5000 },
        { id: "m3-2", name: "Mie shirataki", image: "/images/mie-shirataki.png", price: 7500 },
        { id: "m3-3", name: "Ayam Goreng", image: "/images/ayam-goreng.png", price: 13500 },
        { id: "m3-4", name: "Rendang", image: "/images/rendang.png", price: 20000 },
        { id: "m3-5", name: "Tuna Sawir", image: "/images/tuna-sawir.png", price: 18500 },
      ],
      [
        { id: "m3-6", name: "Cah kangkung", image: "/images/cah-kangkung.png", price: 8000 },
        { id: "m3-7", name: "Semur Daging", image: "/images/semur-daging.png", price: 25000 },
        { id: "m3-8", name: "Tempe Orek", image: "/images/tempe-orek.png", price: 7000 },
        { id: "m3-9", name: "Soto Lamongan", image: "/images/soto-lamongan.png", price: 15000 },
        { id: "m3-10", name: "Bakwan Jagung", image: "/images/bakwan-jagung.png", price: 5000 },
      ],
    ],
  },
  // Thursday
  {
    day: "Thursday",
    items: [
      [
        { id: "m4-1", name: "Nasi putih", image: "/images/nasi-putih.png", price: 5000 },
        { id: "m4-2", name: "Nasi Goreng", image: "/images/nasi-goreng.png", price: 12500 },
        { id: "m4-3", name: "Ayam Bakar", image: "/images/ayam-bakar.png", price: 13500 },
        { id: "m4-4", name: "Tumis Sapi", image: "/images/tumis-sapi.png", price: 18000 },
        { id: "m4-5", name: "Ikan Balado", image: "/images/ikan-balado.png", price: 16000 },
      ],
      [
        { id: "m4-6", name: "Tumis Buncis", image: "/images/tumis-buncis.png", price: 8000 },
        { id: "m4-7", name: "Ayam Kecap", image: "/images/ayam-kecap.png", price: 22000 },
        { id: "m4-8", name: "Kentang Balado", image: "/images/kentang-balado.png", price: 7000 },
        { id: "m4-9", name: "Sup Jagung", image: "/images/sup-jagung.png", price: 15000 },
        { id: "m4-10", name: "Telur Mata Sapi", image: "/images/telur-mata-sapi.png", price: 5000 },
      ],
    ],
  },
  // Friday
  {
    day: "Friday",
    items: [
      [
        { id: "m5-1", name: "Nasi putih", image: "/images/nasi-putih.png", price: 5000 },
        { id: "m5-2", name: "Nasi Merah", image: "/images/nasi-merah.png", price: 5500 },
        { id: "m5-3", name: "Ayam Geprek", image: "/images/ayam-geprek.png", price: 12500 },
        { id: "m5-4", name: "Tongseng Sapi", image: "/images/tongseng-sapi.png", price: 18000 },
        { id: "m5-5", name: "Nila Cabe Ijo", image: "/images/nila-cabe-ijo.png", price: 16000 },
      ],
      [
        { id: "m5-6", name: "Sayur Lodeh", image: "/images/sayur-lodeh.png", price: 8000 },
        { id: "m5-7", name: "Terong Balado", image: "/images/terong-balado.png", price: 10000 },
        { id: "m5-8", name: "Jamur Goreng", image: "/images/jamur-goreng.png", price: 7000 },
        { id: "m5-9", name: "Sayur Asem", image: "/images/sayur-asem.png", price: 10000 },
        { id: "m5-10", name: "Tahu Goreng", image: "/images/tahu-goreng.png", price: 5000 },
      ],
    ],
  },
  // Saturday
  {
    day: "Saturday",
    items: [
      [
        { id: "m6-1", name: "Nasi putih", image: "/images/nasi-putih.png", price: 5000 },
        { id: "m6-2", name: "Ubi Cilembu", image: "/images/ubi-cilembu.png", price: 12500 },
        { id: "m6-3", name: "Ayam Mentega", image: "/images/ayam-mentega.png", price: 16500 },
        { id: "m6-4", name: "Sate Sapi", image: "/images/sate-sapi.png", price: 15000 },
        { id: "m6-5", name: "Nila Bakar", image: "/images/nila-bakar.png", price: 18500 },
      ],
      [
        { id: "m6-6", name: "Cah Timun Udang", image: "/images/cah-timun-udang.png", price: 10000 },
        { id: "m6-7", name: "Terong Balado", image: "/images/terong-balado.png", price: 10000 },
        { id: "m6-8", name: "Usus Bakar", image: "/images/usus-bakar.png", price: 5000 },
        { id: "m6-9", name: "Sayur Sop", image: "/images/sayur-sop.png", price: 10000 },
        { id: "m6-10", name: "Telur Kecap", image: "/images/telur-kecap.png", price: 5000 },
      ],
    ],
  },
  // Sunday
  {
    day: "Sunday",
    items: [
      [
        { id: "m7-1", name: "Nasi putih", image: "/images/nasi-putih.png", price: 5000 },
        { id: "m7-2", name: "Nasi Uduk", image: "/images/nasi-uduk.png", price: 7500 },
        { id: "m7-3", name: "Ayam Taliwang", image: "/images/ayam-taliwang.png", price: 18000 },
        { id: "m7-4", name: "Sapi Lada Hitam", image: "/images/sapi-lada-hitam.png", price: 23000 },
        { id: "m7-5", name: "Gurame Bakar", image: "/images/gurame-bakar.png", price: 25000 },
      ],
      [
        { id: "m7-6", name: "Tumis Kacang Panjang", image: "/images/tumis-kacang-panjang.png", price: 8000 },
        { id: "m7-7", name: "Pepes Ikan", image: "/images/pepes-ikan.png", price: 15000 },
        { id: "m7-8", name: "Tahu Isi", image: "/images/tahu-isi.png", price: 7000 },
        { id: "m7-9", name: "Sayur Bayam", image: "/images/sayur-bayam.png", price: 8000 },
        { id: "m7-10", name: "Perkedel Kentang", image: "/images/perkedel-kentang.png", price: 5000 },
      ],
    ],
  },
]

// Additional items (sambal) - always available
const additionalItems = [
  { id: "a1", name: "Sambal Matah", image: "/images/sambal-matah.png", price: 2500 },
  { id: "a2", name: "Sambal Bawang", image: "/images/sambal-bawang.png", price: 2500 },
  { id: "a3", name: "Sambal Terasi", image: "/images/sambal-terasi.png", price: 2500 },
  { id: "a4", name: "Sambal Ijo", image: "/images/sambal-ijo.png", price: 2500 },
]

export default function HistoryPage() {
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))

    // Get orders from localStorage - don't clear them
    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders)
        setOrders(parsedOrders)
      } catch (e) {
        console.error("Error parsing orders:", e)
        setOrders([])
      }
    } else {
      setOrders([])
    }
  }, [router])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ]

    const dayName = days[date.getDay()]
    const day = date.getDate().toString().padStart(2, "0")
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${dayName}, ${day} ${month} ${year}`
  }

  const getTodayMenuIndex = () => {
    const today = new Date().getDay()
    // Sunday is 0 in JavaScript, but we have it as index 6 in our array
    return today === 0 ? 6 : today - 1
  }

  const findItemInTodayMenu = (itemId: string, itemName: string) => {
    const todayIndex = getTodayMenuIndex()
    const todayMenu = menuData[todayIndex]

    // Check in today's menu items
    for (const row of todayMenu.items) {
      for (const item of row) {
        if (item.id === itemId || item.name === itemName) {
          return item
        }
      }
    }

    // Check in additional items (always available)
    for (const item of additionalItems) {
      if (item.id === itemId || item.name === itemName) {
        return item
      }
    }

    return null
  }

  const addToCart = (itemId: string, itemName: string, itemPrice: number, itemImage: string) => {
    // Get existing cart or create new one
    let cart = []
    const existingCart = localStorage.getItem("cart")

    if (existingCart) {
      try {
        cart = JSON.parse(existingCart)
      } catch (e) {
        console.error("Error parsing cart:", e)
      }
    }

    // Add item to cart
    cart.push({
      id: itemId,
      name: itemName,
      price: itemPrice,
      image: itemImage,
      quantity: 1,
    })

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  const handleOrderAgain = (item: any) => {
    // Check if user is logged in
    if (!user) {
      router.push("/login")
      return
    }

    // Check if the item is available in today's menu
    const availableItem = findItemInTodayMenu(item.id, item.name)

    if (!availableItem) {
      // Item not available today
      const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
      const todayIndex = getTodayMenuIndex()
      const todayName = days[todayIndex]

      alert(`Maaf, "${item.name}" tidak tersedia untuk hari ${todayName}. Silakan pilih menu yang tersedia hari ini.`)
      return
    }

    // Item is available, add to cart
    addToCart(availableItem.id, availableItem.name, availableItem.price, availableItem.image)

    // Show success message
    alert(`"${availableItem.name}" berhasil ditambahkan ke keranjang!`)

    // Optionally refresh the page to update cart count in navbar
    window.location.reload()
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main
        className="flex-1 py-8 px-6"
        style={{
          backgroundImage: `url('/images/leaf-pattern-new.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f8f3e2",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* History Header */}
          <div className="text-center mb-8">
            <div className="bg-[#4a3f2d] text-[#DDB04E] px-8 py-4 rounded-2xl inline-block shadow-lg">
              <h1 className="text-3xl font-bold">History</h1>
            </div>
          </div>

          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-[#7a8c4f] rounded-2xl p-8 text-center">
                <p className="text-white text-lg">Belum ada riwayat pesanan</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-[#7a8c4f] rounded-2xl p-6 shadow-lg">
                  {/* Date */}
                  <div className="mb-4">
                    <h3 className="text-[#FFD700] text-xl font-bold">{formatDate(order.date)}</h3>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        {/* Food Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/images/food-image.png"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/images/food-image.png"
                            }}
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="bg-white rounded-lg p-3 inline-block">
                            <h4 className="text-[#4a5c2f] font-bold text-lg">{item.name}</h4>
                            <p className="text-[#4a5c2f] font-medium">Rp. {item.price.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="text-[#FFD700] font-bold text-lg mx-4">{item.quantity}x</div>

                        {/* Order Again Button */}
                        <Button
                          onClick={() => handleOrderAgain(item)}
                          className="bg-[#AC9362] hover:bg-[#9d8555] text-[#4a5c2f] font-bold px-6 py-2 rounded-lg"
                        >
                          Pesan Lagi
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Total:</span>
                      <span className="text-[#FFD700] font-bold text-xl">Rp. {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="bg-[#DDB04E] py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/images/logo.png" alt="Your Daily Meal" width={100} height={50} className="h-auto" />
              <div className="text-[#4a5c2f]">
                <h3 className="text-xl font-bold">FAQ</h3>
                <p className="text-sm">Hubungi kami untuk pertanyaan</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="https://wa.me/62895639201682" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 bg-[#4a5c2f] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.467 2.02 7.785L0 32l8.352-2.188A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.613 23.387c-.363 1.02-2.124 1.99-2.922 2.117-.748.117-1.68.166-2.714-.166-.624-.197-1.426-.459-2.45-.9-4.31-1.857-7.117-6.4-7.334-6.7-.215-.3-1.75-2.333-1.75-4.45 0-2.117 1.084-3.167 1.47-3.6.363-.4.793-.5 1.057-.5.27 0 .53.003.763.014.247.012.577-.093.9.7.363.9 1.235 3.1 1.345 3.317.11.217.182.47.036.77-.146.3-.22.47-.43.72-.215.25-.45.56-.64.75-.215.215-.44.45-.19.9.25.45 1.11 1.83 2.38 2.97 1.64 1.46 3.02 1.91 3.47 2.13.45.22.71.18.98-.11.27-.29 1.12-1.3 1.42-1.75.3-.45.6-.37 1.01-.22.41.15 2.6 1.23 3.05 1.45.45.22.75.33.86.51.11.18.11 1.05-.25 2.07z" />
                  </svg>
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCzgxx_DM2Dcb9Y1spb9mUJA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 bg-[#4a5c2f] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path d="M549.7 124.1C537.5 80.9 502.3 48 459 40.1 403.3 32 288 32 288 32s-115.3 0-171 8c-43.3 7.9-78.5 40.8-90.7 83.9C16 166.4 16 256 16 256s0 89.6 10.3 131.9c12.2 43.1 47.4 76 90.7 83.9 55.7 8 171 8 171 8s115.3 0 171-8c43.3-7.9 78.5-40.8 90.7-83.9C560 345.6 560 256 560 256s0-89.6-10.3-131.9zM232 338.5V173.5L361 256 232 338.5z" />
                  </svg>
                </div>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/JYPETWICE/" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 bg-[#4a5c2f] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91V133.34c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.24 0 225.36 0c-73.61 0-121.08 44.38-121.08 124.72V195.3H22.89V288h81.39v224h100.2V288z" />
                  </svg>
                </div>
              </a>
            </div>
            <div className="text-center text-[#4a5c2f]">
              <p className="text-sm">Subscribe for latest updates</p>
              <div className="flex mt-2">
                <input type="email" placeholder="Your email" className="px-3 py-1 rounded-l-lg text-sm" />
                <button className="bg-[#7a8c4f] text-white px-3 py-1 rounded-r-lg text-sm">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
