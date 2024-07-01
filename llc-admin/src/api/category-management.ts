import { ApiClient } from 'src/api/axiosClient'

export const categoryManagementAPI = {
  getCategories: async () => {
    return await ApiClient.get<any>(`/categories`)
  },
  deleteCategory: async (id: number) => {
    return await ApiClient.delete(`/categories/${id}`)
  },
  deleteSubCategory: async (id: number) => {
    return await ApiClient.delete(`/sub-categories/${id}`)
  },
  updateCategory: async ({ id, ...data }: { id: number }) => {
    return await ApiClient.put(`/categories/${id}`, data)
  },
  updateSubCategory: async ({ id, ...data }: { id: number }) => {
    return await ApiClient.put(`/sub-categories/${id}`, data)
  },
  addSubCategories: async (data: { name: string; categoryId: number }) => {
    return await ApiClient.post(`/sub-categories`, data)
  },
  addCategory: async (data: { name: string }) => {
    return await ApiClient.post(`/categories`, data)
  },
}
