import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'
class HousesService {
  async getAll() {
    return await dbContext.Houses.find({}).populate('creator', 'picture name')
  }

  async getbyId(id) {
    const house = await dbContext.Houses.findById(id).populate('creator', 'picture name')
    if (!house) {
      throw new BadRequest('Invalid Id')
    }
    return house
  }

  async create(body) {
    throw new Error('Method not implemented.')
  }

  async edit(body) {
    throw new Error('Method not implemented.')
  }

  async remove(id, userId) {
    throw new Error('Method not implemented.')
  }
}

export const housesService = new HousesService()
