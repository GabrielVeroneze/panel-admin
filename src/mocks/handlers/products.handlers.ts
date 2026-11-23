import { delay, http, HttpResponse } from 'msw'
import { productsDatabase } from '../database'
import type {
    CreateProductPayload,
    PaginatedProducts,
    Product,
    UpdateProductPayload,
} from '@/features/products/types'

type CreateProductResponse =
    | Product
    | {
          message: string
      }

type UpdateProductResponse =
    | Product
    | {
          message: string
      }

type UpdateProductParams = {
    id: string
}

type DeleteProductParams = {
    id: string
}

type DeleteProductsPayload = {
    ids: number[]
}

export const productsHandlers = [
    http.get<never, never, PaginatedProducts>(
        '/api/products',
        async ({ request }) => {
            await delay(1000)

            const url = new URL(request.url)

            const page = Number(url.searchParams.get('page') ?? 1)
            const pageSize = Number(url.searchParams.get('pageSize') ?? 15)
            const search = url.searchParams.get('search')?.toLowerCase() ?? ''

            const filteredProducts = search
                ? productsDatabase.filter(
                      (product) =>
                          product.name.toLowerCase().includes(search) ||
                          product.category.toLowerCase().includes(search) ||
                          product.brand.toLowerCase().includes(search),
                  )
                : productsDatabase

            const start = (page - 1) * pageSize
            const end = start + pageSize

            const paginatedProducts = filteredProducts.slice(start, end)

            return HttpResponse.json({
                list: paginatedProducts,
                total: filteredProducts.length,
                page,
                pageSize,
            })
        },
    ),

    http.post<never, CreateProductPayload, CreateProductResponse>(
        '/api/products',
        async ({ request }) => {
            await delay(1000)

            const formData = await request.formData()

            const name = formData.get('name') as string
            const category = formData.get('category') as string
            const brand = formData.get('brand') as string
            const price = Number(formData.get('price'))
            const description = formData.get('description') as string
            const images = formData.getAll('images') as File[]

            const productAlreadyExists = productsDatabase.some(
                (product) => product.name.toLowerCase() === name.toLowerCase(),
            )

            if (productAlreadyExists) {
                return HttpResponse.json(
                    {
                        message: 'A product with this name already exists',
                    },
                    {
                        status: 409,
                    },
                )
            }

            const nextId =
                productsDatabase.length > 0
                    ? Math.max(...productsDatabase.map((p) => p.id)) + 1
                    : 1

            const imageUrls = images.map((file) => URL.createObjectURL(file))

            const newProduct: Product = {
                id: nextId,
                name: name,
                category: category,
                brand: brand,
                price: price,
                description: description,
                images: imageUrls,
            }

            productsDatabase.push(newProduct)

            return HttpResponse.json(newProduct, {
                status: 201,
            })
        },
    ),

    http.put<UpdateProductParams, UpdateProductPayload, UpdateProductResponse>(
        '/api/products/:id',
        async ({ params, request }) => {
            await delay(1000)

            const id = Number(params.id)
            const formData = await request.formData()

            const name = formData.get('name') as string | null
            const category = formData.get('category') as string | null
            const brand = formData.get('brand') as string | null
            const price = Number(formData.get('price')) as number | null
            const description = formData.get('description') as string | null
            const images = formData.getAll('images') as File[]

            const productIndex = productsDatabase.findIndex(
                (product) => product.id === id,
            )

            if (productIndex === -1) {
                return HttpResponse.json(
                    {
                        message: 'Product not found',
                    },
                    {
                        status: 404,
                    },
                )
            }

            const productAlreadyExists = productsDatabase.some(
                (product) =>
                    product.id !== id &&
                    product.name.toLowerCase() === (name ?? '').toLowerCase(),
            )

            if (productAlreadyExists) {
                return HttpResponse.json(
                    {
                        message: 'A product with this name already exists',
                    },
                    {
                        status: 409,
                    },
                )
            }

            const existingProduct = productsDatabase[productIndex]

            const updatedProduct: Product = {
                ...existingProduct,
                name: name ?? existingProduct.name,
                category: category ?? existingProduct.category,
                brand: brand ?? existingProduct.brand,
                price: price ?? existingProduct.price,
                description: description ?? existingProduct.description,
                images:
                    images.length > 0
                        ? images.map((file) => URL.createObjectURL(file))
                        : existingProduct.images,
            }

            productsDatabase[productIndex] = updatedProduct

            return HttpResponse.json(updatedProduct)
        },
    ),

    http.delete<DeleteProductParams, never, { message: string }>(
        '/api/products/:id',
        async ({ params }) => {
            await delay(1000)

            const id = Number(params.id)

            const productIndex = productsDatabase.findIndex(
                (product) => product.id === id,
            )

            if (productIndex === -1) {
                return HttpResponse.json(
                    {
                        message: 'Product not found',
                    },
                    {
                        status: 404,
                    },
                )
            }

            productsDatabase.splice(productIndex, 1)

            return new HttpResponse(null, { status: 204 })
        },
    ),

    http.delete<never, DeleteProductsPayload, { message: string }>(
        '/api/products',
        async ({ request }) => {
            await delay(1000)

            const { ids } = await request.json()

            if (!ids || ids.length === 0) {
                return HttpResponse.json(
                    {
                        message: 'No products selected for deletion',
                    },
                    {
                        status: 400,
                    },
                )
            }

            const allProductsExist = ids.every((id) =>
                productsDatabase.some((product) => product.id === id),
            )

            if (!allProductsExist) {
                return HttpResponse.json(
                    {
                        message: 'One or more products were not found',
                    },
                    {
                        status: 404,
                    },
                )
            }

            for (const id of ids) {
                const index = productsDatabase.findIndex(
                    (product) => product.id === id,
                )

                productsDatabase.splice(index, 1)
            }

            return new HttpResponse(null, { status: 204 })
        },
    ),
]
