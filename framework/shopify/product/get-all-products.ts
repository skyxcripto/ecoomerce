import { normalizeProduct, getAllProductsQuery } from '../utils'
import { ProductConnection } from '../schema'
import { Product } from '@common/types/products'
import { ApiConfig } from '@common/types/api'

type ReturnType = {
  products: ProductConnection
}

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<ReturnType>({
    url: config.apiUrl,
    query: getAllProductsQuery,
  })
  //Normalize and return the data
  const products =
    data.products.edges.map(({ node: product }) => {
      return normalizeProduct(product)
    }) ?? []
  return products
}

export default getAllProducts
