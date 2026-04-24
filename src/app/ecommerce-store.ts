import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignIn } from "./components/sign-in/sign-in";
import { SignInParams, SignUpParams, User } from "./models/user";
import { Router } from "@angular/router";
import { Order } from "./models/order";
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
}

export const EcommerceStore = signalStore(
    { providedIn: 'root' },
    withState({
        products: [{
            id: '1',
            name: 'Silver Series Wireless Headphones',
            description: 'Experience crystal clear sound with active noise cancellation and 40-hour battery life.',
            price: 199.99,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            rating: 4.8,
            reviewCount: 1250,
            inStock: true,
            category: 'Electronics'
        },
        {
            id: '2',
            name: 'Minimalist Leather Watch',
            description: 'A timeless design featuring genuine Italian leather and scratch-resistant sapphire glass.',
            price: 145.00,
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            rating: 4.5,
            reviewCount: 840,
            inStock: true,
            category: 'Accessories'
        },
        {
            id: '3',
            name: 'Smart Fitness Tracker',
            description: 'Monitor your heart rate, sleep patterns, and daily steps with this sleek waterproof wearable.',
            price: 79.50,
            imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
            rating: 4.2,
            reviewCount: 2100,
            inStock: false,
            category: 'Electronics'
        },
        {
            id: '4',
            name: 'Organic Cotton Hoodie',
            description: 'Ultra-soft, sustainable cotton hoodie designed for maximum comfort and durability.',
            price: 55.00,
            imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
            rating: 4.7,
            reviewCount: 430,
            inStock: true,
            category: 'Apparel'
        },
        {
            id: '6',
            name: 'Ergonomic Mechanical Keyboard',
            description: 'Backlit RGB keys with tactile switches to improve typing speed and reduce wrist strain.',
            price: 129.99,
            imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
            rating: 4.6,
            reviewCount: 920,
            inStock: true,
            category: 'Electronics'
        }, {
            id: '7',
            name: 'Ultra-Wide Curved Monitor',
            description: '34-inch immersive 1440p display with 144Hz refresh rate, perfect for gaming and productivity.',
            price: 449.99,
            imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
            rating: 4.8,
            reviewCount: 320,
            inStock: true,
            category: 'Electronics'
        },
        {
            id: '8',
            name: 'Mid-Century Modern Chair',
            description: 'Elegant accent chair with walnut legs and premium gray upholstery.',
            price: 189.00,
            imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500',
            rating: 4.6,
            reviewCount: 85,
            inStock: true,
            category: 'Furniture'
        },
        {
            id: '10',
            name: 'Leather Weekend Bag',
            description: 'Handcrafted full-grain leather duffel bag with a dedicated shoe compartment.',
            price: 210.00,
            imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500',
            rating: 4.7,
            reviewCount: 120,
            inStock: false,
            category: 'Apparel'
        },
        {
            id: '11',
            name: 'Professional Yoga Mat',
            description: 'Extra thick, non-slip eco-friendly rubber mat for yoga and pilates.',
            price: 65.00,
            imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500',
            rating: 4.5,
            reviewCount: 890,
            inStock: true,
            category: 'Sports'
        },
        {
            id: '13',
            name: 'Running Carbon Shoes',
            description: 'Lightweight performance running shoes with carbon-plated soles for maximum energy return.',
            price: 160.00,
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
            rating: 4.8,
            reviewCount: 1100,
            inStock: true,
            category: 'Apparel'
        },
        {
            id: '14',
            name: 'Bamboo Desk Organizer',
            description: 'Sustainable bamboo desk set to keep your pens, phone, and notes tidy.',
            price: 32.00,
            imageUrl: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=500',
            rating: 4.3,
            reviewCount: 230,
            inStock: true,
            category: 'Accessories'
        },
        {
            id: '15',
            name: 'Portable Bluetooth Speaker',
            description: 'IPX7 waterproof rugged speaker with deep bass and 360-degree sound.',
            price: 115.00,
            imageUrl: 'https://images.unsplash.com/photo-1608156639585-342034e44490?w=500',
            rating: 4.7,
            reviewCount: 1540,
            inStock: true,
            category: 'Electronics'
        },
        {
            id: '16',
            name: 'Adjustable Dumbbell Set',
            description: 'Space-saving dumbbells that adjust from 5 to 50 lbs with a turn of a dial.',
            price: 399.00,
            imageUrl: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500',
            rating: 4.6,
            reviewCount: 670,
            inStock: false,
            category: 'Sports'
        }],
        category: 'all',
        wishlistItems: [],
        cartItems: [],
        user: undefined,
        loading: false
    } as EcommerceState),
    withStorageSync({ key: 'digital-store', select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }) }),
    withComputed(({ category, products, wishlistItems, cartItems }) => ({
        filteredProducts: computed(() => {
            if (category() === 'all') return products();

            return products().filter(product => product.category.toLowerCase() === category().toLowerCase());
        }),
        wishlistCount: computed(() => wishlistItems().length),
        cartItemsCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0))
    })),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category })
        }),
        addToWishlist: (product: Product) => {
            const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
                if (!draft.find((p: Product) => (p.id === product.id))) {
                    draft.push(product);
                }
            })

            patchState(store, { wishlistItems: updatedWishlistItems });
            toaster.success('Product added to Wishlist');
        },
        removeFromWishlist: (product: Product) => {
            patchState(store, { wishlistItems: store.wishlistItems().filter(p => p.id !== product.id) });
            toaster.success('Product removed from Wishlist')
        },
        clearWishlist: () => {
            patchState(store, { wishlistItems: [] });
        },
        addToCart: (product: Product, quantity = 1) => {
            const existingItemIndex = store.cartItems().findIndex(p => p.product.id === product.id);

            const updateCartItems = produce(store.cartItems(), (draft) => {
                if (existingItemIndex !== -1) {
                    draft[existingItemIndex].quantity += quantity;
                    return;
                }

                draft.push({
                    product, quantity
                })
            });

            patchState(store, { cartItems: updateCartItems });
            toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart');
        },
        setItemQuantity: (params: { id: string, quantity: number }) => {
            const index = store.cartItems().findIndex((item) => item.product.id === params.id);

            const updatedCartItems = produce(store.cartItems(), (draft) => {
                draft[index].quantity = params.quantity;
            })

            patchState(store, { cartItems: updatedCartItems });
        },
        addAllWishlistToCart: () => {
            const updatedCartItems = produce(store.cartItems(), (draft) => {
                store.wishlistItems().forEach(p => {
                    if (!draft.find(c => c.product.id === p.id)) {
                        draft.push({ product: p, quantity: 1 });
                    }
                })
            })

            patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
        },
        moveToWishlist: (product: Product) => {
            const updatedCartItems = store.cartItems().filter(item => item.product.id !== product.id);
            const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
                if (!draft.find(item => item.id === product.id)) {
                    draft.push(product);
                }
            })

            patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
        },
        removeFromCart: (product: Product) => {
            patchState(store, { cartItems: store.cartItems().filter(item => item.product.id !== product.id) })
        },
        proceedToCheckout: () => {
            if (!store.user()) {
                matDialog.open(SignIn, {
                    disableClose: true,
                    data: {
                        checkout: true
                    }
                })
                return;
            }

            router.navigate(['/checkout']);
        },

        placeOrder: async () => {
            patchState(store, { loading: true });
            const user = store.user();

            if (!user) {
                toaster.error('Please login before placing order');
                patchState(store, { loading: false });
                return;
            }
            const order: Order = {
                id: crypto.randomUUID(),
                userId: user.id,
                total: Math.round(store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)),
                items: store.cartItems(),
                paymentStatus: 'success'
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));

            patchState(store, { loading: false, cartItems: [] });
            router.navigate(['order-success']);
        },

        signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
            patchState(store, {
                user: {
                    id: '1',
                    email,
                    name: 'Sara V',
                    imageUrl: 'https://randomuser.me/portraits/women/10.jpg'
                }
            })

            const dialog = matDialog.getDialogById(dialogId)?.close();

            if (checkout) {
                router.navigate(['/checkout']);
            }
        },

        signOut: () => {
            patchState(store, { user: undefined });
        },

        signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
            patchState(store, {
                user: {
                    id: '1',
                    email,
                    name: 'Sara V',
                    imageUrl: 'https://randomuser.me/portraits/women/10.jpg'
                }
            })

            const dialog = matDialog.getDialogById(dialogId)?.close();

            if (checkout) {
                router.navigate(['/checkout']);
            }
        }
    }))

)