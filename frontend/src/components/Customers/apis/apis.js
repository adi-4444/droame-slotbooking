import axios from 'axios'

export const getAllCustomer = async () => {
   const URL = '/api/v1/customers'
   try {
      const data = await axios(URL)
      return data
   } catch (error) {
      return error
   }
}

export const getAllBookingsById = async (id) => {
   const URL = `/api/v1/customers/${id}`
   const URL2 = `/api/v1/bookings/customer/${id}`
   try {
      const customerData = await axios(URL)
      const bokkingsData = await axios(URL2)
      return [customerData, bokkingsData]
   } catch (error) {
      return error
   }
}
export const createBookingById = async (id, data) => {
   const URL = `/api/v1/bookings/customer/${id}`
   try {
      const bokkingsData = await axios.post(URL, data)
      return bokkingsData
   } catch (error) {
      return error
   }
}