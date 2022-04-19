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
    const house = await dbContext.Houses.create(body)
    await house.populate('creator', 'picture name')
    return house
  }

  async edit(update) {
    const original = await this.getbyId(update.id)
    if (original.creatorId.toString() !== update.creatorId) { throw new Forbidden('invalid access') }
    original.bedrooms = update.bedrooms || original.bedrooms
    original.bathrooms = update.bathrooms || original.bathrooms
    original.levels = update.levels || original.levels
    original.imgUrl = update.imgUrl || original.imgUrl
    original.year = update.year || original.year
    original.price = update.price || original.price
    original.description = update.description || original.description
    await original.save()
    return original
  }

  async remove(id, userId) {
    const car = await this.getbyId(id)
    if (car.creatorId.toString() !== userId) {
      throw new Forbidden('thats not yours to delete')
    }
    await dbContext.Houses.findByIdAndDelete(id)
  }
}

export const housesService = new HousesService()
