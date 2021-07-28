import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Establishment from 'App/Models/Establishment'
export default class EstablishmentsController {
  public async index({}: HttpContextContract) {
    const establishments = await Establishment.query().preload('addresses')

    if (establishments.length <= 0) {
      return {
        message: 'Nenhum registro encontrado',
      }
    }
    return establishments.map((establishments) => establishments.toJSON())
  }

  public async create({ request, response, auth }: HttpContextContract) {
    const data = request.only([
      'name',
      'about',
      'avatar',
      'phone',
      'location',
      'back_cover',
      'assessment',
    ])
    const userId = auth.use().user?.id

    const dataEstablishment = {
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      phone: data.phone,
      location: data.location,
      back_cover: data.back_cover,
      assessment: data.assessment,
      user_id: userId,
    }

    const searchCriteria = {
      name: data.name,
    }
    const establishment = await Establishment.firstOrCreate(searchCriteria, dataEstablishment)

    if (establishment.$isLocal) {
      return response.json({
        message: 'Cadastrado com sucesso',
      })
    } else {
      return response.json({
        message: 'Categoria ja existe no banco de dados',
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const category = await Establishment.findOrFail(searchCriteria.id)

      return response.json(category)
    } catch (error) {
      return response.status(500).json({
        message: 'Categoria não encontrada não encontrado',
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only([
      'name',
      'about',
      'avatar',
      'phone',
      'location',
      'back_cover',
      'assessment',
    ])

    const searchCriteria = {
      id: params['id'],
    }
    try {
      const establishment = await Establishment.findOrFail(searchCriteria.id)

      establishment.name = data.name
      establishment.avatar = data.avatar
      establishment.phone = data.phone
      establishment.location = data.location
      establishment.back_cover = data.back_cover
      establishment.assessment = data.assessment
      establishment.about = data.about

      establishment.save()

      return response.json(establishment)
    } catch (error) {
      return response.status(500).json({
        message: 'Estabelecimento não encontrado',
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const establishment = await Establishment.findOrFail(searchCriteria.id)

      establishment.delete()
      if (!establishment.$isLocal) {
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
