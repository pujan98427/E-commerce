interface CartItem {
  id: string
  name: string
  color: string
  imageSrc: string
  imageAlt: string
  imageAltPrice: string
  price: string
}

interface CartState {
  items: CartItem[]
  count: number
}

export type { CartItem, CartState }
