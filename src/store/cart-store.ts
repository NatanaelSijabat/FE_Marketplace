import { create } from 'zustand'

type CartItem = {
    id: number
    title: string
    price: number
    thumbnail: string
    quantity: number
}

interface CartState {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: number) => void
    updateQty: (id: number, quantity: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
            set({
                items: get().items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
            })
        } else {
            set({ items: [...get().items, { ...item, quantity: 1 }] })
        }
    },
    removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
    updateQty: (id, quantity) => {
        if (quantity < 1) return
        set({
            items: get().items.map((i) =>
                i.id === id ? { ...i, quantity } : i
            ),
        })
    },
    clearCart: () => set({ items: [] }),
}))
