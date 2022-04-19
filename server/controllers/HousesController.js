import { Auth0Provider } from '@bcwdev/auth0provider'
import { housesService } from '../services/HousesService.js'
import BaseController from '../utils/BaseController.js'
export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getbyId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const houses = await housesService.getAll()
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getbyId(req, res, next) {
    try {
      const house = await housesService.getbyId(req.params.id)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const house = await housesService.create(req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const house = await housesService.edit(req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await housesService.remove(req.params.id, req.userInfo.id)
      res.send('Big bad wolf cant blow down this house')
    } catch (error) {
      next(error)
    }
  }
}
