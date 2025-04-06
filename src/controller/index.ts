// Admin Controllers
import { adminLogin, adminRegister } from '@controller/admin/auth.Controller'
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
} from '@controller/admin/product.Controller'
import { updateUser, getAllUsers, getUserById } from '@controller/admin/user.Controller'
import {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
} from '@controller/admin/category.Controller'
import {
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    getOrdersByUserId,
} from '@controller/admin/order.Controller'
import { addSlider, updateSlider, deleteSlider } from '@controller/admin/slider.Controller'
import {
    addSale,
    updateSale,
    deleteSale,
    getAllSales,
    getSalesByCategory,
    getSaleByProduct,
} from '@controller/admin/sale.Controller'

// User Controllers
import { userLogin, userRegister } from '@controller/user/auth.Controller'
import {
    addToCart,
    updateCart,
    removeFromCart,
    getCart,
    getCartByCategory,
    getCartByProduct,
} from '@controller/user/cart.Controller'
import { purchaseProducts } from '@controller/user/order.Controller'
import { viewProduct } from '@controller/user/product.Controller'
import {
    addFavorite,
    updateFavorite,
    removeFavorite,
    getFavorites,
    getFavoritesByCategory,
    getFavoriteByProduct,
} from '@controller/user/favorite.Controller'
import {
    addReview,
    updateReview,
    deleteReview,
    getReviewsByProduct,
    getReviewsByUser,
} from '@controller/user/review.Controller'

export {
    // Admin
    adminLogin,
    adminRegister,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    updateUser,
    getAllUsers,
    getUserById,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getOrderById,
    updateOrderStatus,
    getAllOrders,
    getOrdersByUserId,
    addSlider,
    updateSlider,
    deleteSlider,
    addSale,
    updateSale,
    deleteSale,
    getAllSales,
    getSalesByCategory,
    getSaleByProduct,
    // User
    userLogin,
    userRegister,
    addToCart,
    updateCart,
    removeFromCart,
    getCart,
    getCartByCategory,
    getCartByProduct,
    purchaseProducts,
    viewProduct,
    addFavorite,
    updateFavorite,
    removeFavorite,
    getFavorites,
    getFavoritesByCategory,
    getFavoriteByProduct,
    addReview,
    updateReview,
    deleteReview,
    getReviewsByProduct,
    getReviewsByUser,
}