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
export const editBookingById = async (c_id, b_id, data) => {
   const URL = `/api/v1/bookings/customer/${c_id}/${b_id}`
   try {
      const bookingData = await axios.put(URL, data)
      return bookingData
   } catch (error) {
      return error
   }
}
export const deleteBookingById = async (c_id, b_id) => {
   const URL = `/api/v1/bookings/customer/${c_id}/${b_id}`
   try {
      const bookingData = await axios.delete(URL)
      return bookingData
   } catch (error) {
      return error
   }
}
export const createCustomer = async (data) => {
   const URL = `/api/v1/customers`
   try {
      const customerData = await axios.post(URL, data)
      return customerData
   } catch (error) {
      return error
   }
}
export const editCustomerById = async (c_id, data) => {
   const URL = `/api/v1/customers/${c_id}`
   try {
      const customerData = await axios.put(URL, data)
      return customerData
   } catch (error) {
      return error
   }
}
export const deleteCustomerById = async (id) => {
   const URL = `/api/v1/customers/${id}`
   try {
      const customerData = await axios.delete(URL)
      return customerData
   } catch (error) {
      return error
   }
}