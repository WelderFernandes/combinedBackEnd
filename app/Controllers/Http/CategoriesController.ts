import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    const categories = await Category.all()

    return categories.map((categories) => categories.toJSON())
  }

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'description', 'icon'])

    const searchCriteria = {
      name: data.name,
    }
    const category = await Category.firstOrCreate(searchCriteria, data)

    if (category.$isLocal) {
      return response.json({
        message: 'Cadastrado com sucesso',
      })
    } else {
      return response.json({
        message: 'Categoria ja existe no banco de dados',
      })
      // return response.json(user.$isPersisted)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const category = await Category.findOrFail(searchCriteria.id)

      return response.json(category)
    } catch (error) {
      return response.status(500).json({
        message: 'Categoria não encontrada não encontrado',
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['name', 'description', 'icon'])

    const searchCriteria = {
      id: params['id'],
    }

    const category = await Category.findOrFail(searchCriteria.id)

    category.name = data.name
    category.description = data.description
    category.icon = data.icon

    category.save()

    return response.json(category)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const category = await Category.findOrFail(searchCriteria.id)

      category.delete()
      if (!category.$isLocal) {
        return response.status(200).json({
          message: 'Deletado com sucesso',
        })
      }
    } catch (error) {
      return response.status(500).json({
        message: 'Houve algum problema ao tentar deletar',
      })
    }
  }
}
