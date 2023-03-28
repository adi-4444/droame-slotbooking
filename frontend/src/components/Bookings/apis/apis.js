import axios from 'axios'

export const getAllBookings = async () => {
   const URL = '/api/v1/bookings'
   try {
      const data = await axios(URL)
      return data
   } catch (error) {
      return error
   }
}