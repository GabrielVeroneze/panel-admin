export { default as productsReducer } from './products.slice'
export {
    createProduct,
    deleteProduct,
    deleteProducts,
    fetchProducts,
    updateProduct,
} from './products.thunks'
export { selectProductsList } from './products.selectors'
