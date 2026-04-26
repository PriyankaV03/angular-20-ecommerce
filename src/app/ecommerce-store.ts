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
import { AddReviewParams, UserReview } from "./models/user-review";
import { SeoManager } from "./services/seo-manager";
import { title } from "process";

export type EcommerceState = {
    products: Product[];
    category: string;
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean;
}

export const EcommerceStore = signalStore(
    { providedIn: 'root' },
    withState({
        products: [
            {
                id: '2',
                name: 'Smart Home Speaker',
                description: 'Voice-controlled assistant with premium 360-degree sound.',
                price: 99.00,
                imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
                rating: 4.2,
                reviewCount: 0,
                inStock: true,
                category: 'electronics',
                reviews: [
                    { id: 'r1', productId: '1', userName: 'Alex J.', userImageUrl: 'https://i.pravatar.cc/150?u=1', rating: 5, title: 'Amazing', comment: 'The ANC is incredible.', reviewDate: new Date('2024-01-10') },
                    { id: 'r2', productId: '1', userName: 'Sarah M.', userImageUrl: 'https://i.pravatar.cc/150?u=2', rating: 4, title: 'Great sound', comment: 'A bit pricey but worth it.', reviewDate: new Date('2024-02-15') },
                    { id: 'r3', productId: '1', userName: 'John D.', userImageUrl: 'https://i.pravatar.cc/150?u=3', rating: 5, title: 'Life changer', comment: 'Best for office work.', reviewDate: new Date('2024-03-01') },
                    { id: 'r4', productId: '1', userName: 'Emily R.', userImageUrl: 'https://i.pravatar.cc/150?u=4', rating: 5, title: 'Worth it', comment: 'Battery lasts forever.', reviewDate: new Date('2024-03-05') },
                    { id: 'r5', productId: '1', userName: 'Mike T.', userImageUrl: 'https://i.pravatar.cc/150?u=5', rating: 4, title: 'Solid', comment: 'Premium feel.', reviewDate: new Date('2024-03-10') },
                    { id: 'r6', productId: '1', userName: 'Kyle B.', userImageUrl: 'https://i.pravatar.cc/150?u=6', rating: 5, title: 'Best yet', comment: 'Soundstage is wide.', reviewDate: new Date('2024-03-12') }
                ]
            },
            {
                id: '3',
                name: 'Mechanical Gaming Keyboard',
                description: 'RGB backlit keys with tactile switches.',
                price: 149.00,
                imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                reviewCount: 1,
                inStock: true,
                category: 'electronics',
                reviews: [{ id: 'r7', productId: '3', userName: 'GamerX', userImageUrl: 'https://i.pravatar.cc/150?u=7', rating: 5, title: 'Clicky!', comment: 'Super responsive.', reviewDate: new Date('2024-04-10') }]
            },
            { id: '5', name: '4K Ultra Slim Monitor', description: '27-inch IPS display with HDR.', price: 349.99, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80', rating: 4.8, reviewCount: 0, inStock: false, category: 'electronics', reviews: [] },
            { id: '6', name: 'Wireless Ergonomic Mouse', description: 'Precision tracking with custom buttons.', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80', rating: 4.3, reviewCount: 1, inStock: true, category: 'electronics', reviews: [{ id: 'r8', productId: '6', userName: 'DevGuy', userImageUrl: 'https://i.pravatar.cc/150?u=8', rating: 4, title: 'Comfy', comment: 'No more wrist pain.', reviewDate: new Date('2024-02-20') }] },
            {
                id: '7',
                name: 'Minimalist Leather Watch',
                description: 'Genuine Italian leather with Swiss movement.',
                price: 150.00,
                imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
                rating: 4.5,
                reviewCount: 6,
                inStock: true,
                category: 'accessories',
                reviews: [
                    { id: 'r9', productId: '7', userName: 'Lana W.', userImageUrl: 'https://i.pravatar.cc/150?u=9', rating: 5, title: 'Elegant', comment: 'Soft leather.', reviewDate: new Date('2024-02-15') },
                    { id: 'r10', productId: '7', userName: 'Chris P.', userImageUrl: 'https://i.pravatar.cc/150?u=10', rating: 4, title: 'Good', comment: 'Silent ticking.', reviewDate: new Date('2024-03-01') },
                    { id: 'r11', productId: '7', userName: 'Nina J.', userImageUrl: 'https://i.pravatar.cc/150?u=11', rating: 3, title: 'Tight', comment: 'Small strap.', reviewDate: new Date('2024-03-05') },
                    { id: 'r12', productId: '7', userName: 'Dave L.', userImageUrl: 'https://i.pravatar.cc/150?u=12', rating: 5, title: 'Great', comment: 'Looks expensive.', reviewDate: new Date('2024-03-10') },
                    { id: 'r13', productId: '7', userName: 'Oscar V.', userImageUrl: 'https://i.pravatar.cc/150?u=13', rating: 4, title: 'Solid', comment: 'Daily piece.', reviewDate: new Date('2024-03-15') },
                    { id: 'r14', productId: '7', userName: 'James H.', userImageUrl: 'https://i.pravatar.cc/150?u=14', rating: 5, title: 'Perfect', comment: 'Stunning gift.', reviewDate: new Date('2024-03-20') }
                ]
            },
            { id: '9', name: 'Leather Messenger Bag', description: 'Fits 15-inch laptops.', price: 210.00, imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', rating: 4.8, reviewCount: 1, inStock: true, category: 'accessories', reviews: [{ id: 'r15', productId: '9', userName: 'Steve N.', userImageUrl: 'https://i.pravatar.cc/150?u=15', rating: 5, title: 'Quality', comment: 'Top tier leather.', reviewDate: new Date('2024-04-22') }] },
            { id: '10', name: 'Canvas Travel Backpack', description: 'Water-resistant with 20L capacity.', price: 85.00, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', rating: 4.4, reviewCount: 0, inStock: true, category: 'accessories', reviews: [] },
            { id: '12', name: 'Wool Scarf', description: '100% Merino wool for winter.', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80', rating: 4.7, reviewCount: 0, inStock: true, category: 'accessories', reviews: [] },
            {
                id: '13',
                name: 'Performance Running Shoes',
                description: 'Reactive foam for long-distance comfort.',
                price: 125.50,
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
                rating: 4.2,
                reviewCount: 6,
                inStock: true,
                category: 'apparel',
                reviews: [
                    { id: 'r16', productId: '13', userName: 'Runner1', userImageUrl: 'https://i.pravatar.cc/150?u=16', rating: 5, title: 'Fast', comment: 'Great energy return.', reviewDate: new Date('2024-02-10') },
                    { id: 'r17', productId: '13', userName: 'Alice C.', userImageUrl: 'https://i.pravatar.cc/150?u=17', rating: 2, title: 'Narrow', comment: 'Hurts my feet.', reviewDate: new Date('2024-02-15') },
                    { id: 'r18', productId: '13', userName: 'Pete C.', userImageUrl: 'https://i.pravatar.cc/150?u=18', rating: 4, title: 'Grip', comment: 'Good on rain.', reviewDate: new Date('2024-03-01') },
                    { id: 'r19', productId: '13', userName: 'Kelly G.', userImageUrl: 'https://i.pravatar.cc/150?u=19', rating: 4, title: 'Durable', comment: '100 miles in.', reviewDate: new Date('2024-03-05') },
                    { id: 'r20', productId: '13', userName: 'Rich F.', userImageUrl: 'https://i.pravatar.cc/150?u=20', rating: 5, title: 'Style', comment: 'Daily wear.', reviewDate: new Date('2024-03-10') },
                    { id: 'r21', productId: '13', userName: 'Tom S.', userImageUrl: 'https://i.pravatar.cc/150?u=21', rating: 5, title: 'Bounce', comment: 'Like clouds.', reviewDate: new Date('2024-03-15') }
                ]
            },
            { id: '14', name: 'Organic Cotton Hoodie', description: 'Relaxed fit, heavyweight cotton.', price: 65.00, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', rating: 4.9, reviewCount: 1, inStock: true, category: 'apparel', reviews: [{ id: 'r22', productId: '14', userName: 'Jess L.', userImageUrl: 'https://i.pravatar.cc/150?u=22', rating: 5, title: 'Soft', comment: 'Best quality.', reviewDate: new Date('2024-04-01') }] },
            { id: '18', name: 'Cargo Joggers', description: 'Slim fit with multiple pockets.', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', rating: 4.4, reviewCount: 0, inStock: true, category: 'apparel', reviews: [] },
            {
                id: '19',
                name: 'Professional Yoga Mat',
                description: 'Non-slip 6mm thick mat.',
                price: 75.00,
                imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
                rating: 4.7,
                reviewCount: 5,
                inStock: true,
                category: 'sports',
                reviews: [
                    { id: 'r23', productId: '19', userName: 'Yogi A.', userImageUrl: 'https://i.pravatar.cc/150?u=23', rating: 5, title: 'No slip', comment: 'Finally!', reviewDate: new Date('2024-01-10') },
                    { id: 'r24', productId: '19', userName: 'Brea T.', userImageUrl: 'https://i.pravatar.cc/150?u=24', rating: 5, title: 'Cushion', comment: 'Good for knees.', reviewDate: new Date('2024-01-15') },
                    { id: 'r25', productId: '19', userName: 'Li W.', userImageUrl: 'https://i.pravatar.cc/150?u=25', rating: 4, title: 'Heavy', comment: 'Hard to carry.', reviewDate: new Date('2024-02-01') },
                    { id: 'r26', productId: '19', userName: 'YogaGuy', userImageUrl: 'https://i.pravatar.cc/150?u=26', rating: 5, title: 'Pro', comment: 'Worth it.', reviewDate: new Date('2024-02-10') },
                    { id: 'r27', productId: '19', userName: 'Emma S.', userImageUrl: 'https://i.pravatar.cc/150?u=27', rating: 5, title: 'Quality', comment: 'Does not peel.', reviewDate: new Date('2024-02-15') }
                ]
            },
            { id: '20', name: 'Adjustable Dumbbells', description: 'Compact 15-in-1 weight set.', price: 349.99, imageUrl: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=800&q=80', rating: 4.8, reviewCount: 0, inStock: true, category: 'sports', reviews: [] },
            { id: '21', name: 'Regulation Basketball', description: 'Composite leather for grip.', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80', rating: 4.6, reviewCount: 0, inStock: true, category: 'sports', reviews: [] },
            { id: '23', name: 'Gym Duffel Bag', description: 'Separate shoe compartment.', price: 45.00, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', rating: 4.4, reviewCount: 0, inStock: true, category: 'sports', reviews: [] },
            {
                id: '25',
                name: 'Matte Black Desk Lamp',
                description: 'Architect-style with dimmable LED.',
                price: 49.00,
                imageUrl: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80',
                rating: 4.3,
                reviewCount: 5,
                inStock: true,
                category: 'furniture',
                reviews: [
                    { id: 'r28', productId: '25', userName: 'WorkHolic', userImageUrl: 'https://i.pravatar.cc/150?u=28', rating: 5, title: 'Bright', comment: 'Great for nights.', reviewDate: new Date('2024-03-01') },
                    { id: 'r29', productId: '25', userName: 'Sam K.', userImageUrl: 'https://i.pravatar.cc/150?u=29', rating: 4, title: 'Sturdy', comment: 'Heavy base.', reviewDate: new Date('2024-03-05') },
                    { id: 'r30', productId: '25', userName: 'Lucy L.', userImageUrl: 'https://i.pravatar.cc/150?u=30', rating: 5, title: 'Minimalist', comment: 'Fits my desk.', reviewDate: new Date('2024-03-10') },
                    { id: 'r31', productId: '25', userName: 'Ben M.', userImageUrl: 'https://i.pravatar.cc/150?u=31', rating: 3, title: 'Switch', comment: 'Hard to reach.', reviewDate: new Date('2024-03-15') },
                    { id: 'r32', productId: '25', userName: 'Tara Q.', userImageUrl: 'https://i.pravatar.cc/150?u=32', rating: 5, title: 'Perfect', comment: 'No flicker.', reviewDate: new Date('2024-03-20') }
                ]
            },
            { id: '26', name: 'Velvet Accent Chair', description: 'Mid-century gold-finished legs.', price: 245.00, imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', rating: 4.8, reviewCount: 0, inStock: true, category: 'furniture', reviews: [] },
            { id: '28', name: 'Bamboo Coffee Table', description: 'Sustainably sourced wood.', price: 120.00, imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', rating: 4.6, reviewCount: 0, inStock: true, category: 'furniture', reviews: [] },
            { id: '30', name: 'Modern Side Table', description: 'Marble top with metal legs.', price: 95.00, imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80', rating: 4.5, reviewCount: 0, inStock: true, category: 'furniture', reviews: [] }
        ],
        category: 'all',
        wishlistItems: [],
        cartItems: [],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false
    } as EcommerceState),
    // withStorageSync({ key: 'digital-store', select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }) }),
    withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
        filteredProducts: computed(() => {
            if (category() === 'all') return products();

            return products().filter(product => product.category.toLowerCase() === category().toLowerCase());
        }),
        wishlistCount: computed(() => wishlistItems().length),
        cartItemsCount: computed(() => cartItems().reduce((total, item) => total + item.quantity, 0)),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId()))
    })),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router), seoManager = inject(SeoManager)) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category })
        }),
        setProductId: signalMethod<string>((productId: string) => {
            patchState(store, { selectedProductId: productId })
        }),
        setProductSeoTags: signalMethod<Product | undefined>((product) => {
            if (!product) return;
            seoManager.updateSeoTags({
                title: product.name,
                description: product.description,
                image: product.imageUrl,
                type: 'product'
            })
        }),
        setProductsListSeoTags: signalMethod<string | undefined>((category) => {
            const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';
            const description = category ? `Browse our collection of ${category} products` : 'Browse our collection of products';
            seoManager.updateSeoTags({
                title: categoryName,
                description
            })
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
        },

        showWriteReview: () => {
            patchState(store, { writeReview: true });
        },

        hideWriteReview: () => {
            patchState(store, { writeReview: false });
        },

        addReview: async ({ title, comment, rating }: AddReviewParams) => {
            patchState(store, { loading: true });
            const product = store.products().find(p => p.id === store.selectedProductId());
            if (!product) {
                toaster.error('Product not found');
                patchState(store, { loading: false });
                return;
            }

            const review: UserReview = {
                id: crypto.randomUUID(),
                title,
                comment,
                rating,
                productId: product.id,
                userName: store.user()?.name || '',
                userImageUrl: store.user()?.imageUrl || '',
                reviewDate: new Date()
            }

            const updatedProducts = produce(store.products(), (draft) => {
                const index = draft.findIndex((p) => p.id === product.id);
                draft[index].reviews.push(review);
                draft[index].rating = Math.round((draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) / draft[index].reviews.length) * 10) / 10;
                draft[index].reviewCount = draft[index].reviews.length;
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));

            patchState(store, { loading: false, products: updatedProducts, writeReview: false });
        }
    }))

)