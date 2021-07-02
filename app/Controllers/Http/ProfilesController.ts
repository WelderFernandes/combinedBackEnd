import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

interface Iprofile {
  id: number
  name: string
  avatar: string
  birthDate: Date
}

export default class ProfilesController {
  public async index({}: HttpContextContract) {
    const profiles = await Profile.query().preload('user')

    return profiles.map((profiles) => profiles.toJSON())
  }

  public async create({ request, response }: HttpContextContract) {
    const data: Iprofile = request.only(['name', 'avatar', 'birthDate', 'id'])

    const searchCriteria = {
      name: data.name,
    }
    const profile = await Profile.firstOrCreate(searchCriteria, data)

    if (profile.$isLocal) {
      return response.json({
        message: 'Cadastrado com sucesso',
      })
    } else {
      return response.json({
        message: 'Profile ja existe no banco de dados',
      })
      // return response.json(user.$isPersisted)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const profile = await Profile.findOrFail(searchCriteria.id)

      return response.json(profile)
    } catch (error) {
      return response.status(500).json({
        message: 'Usuário não encontrado',
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['name', 'avatar'])

    const searchCriteria = {
      id: params['id'],
    }

    const profile = await Profile.findOrFail(searchCriteria.id)

    profile.name = data.name
    profile.avatar = data.avatar

    profile.save()

    return response.json(profile)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const profile = await Profile.findOrFail(searchCriteria.id)

      profile.delete()
      if (!profile.$isLocal) {
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
