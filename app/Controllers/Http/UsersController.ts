import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    console.log('Teste')

    const users = await User.query().preload('profile')
    return users.map((user) => user.toJSON())
  }

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['email', 'password'])

    const searchCriteria = {
      email: data.email,
    }

    const user = await User.firstOrCreate(searchCriteria, data)

    await user.related('profile').firstOrCreate(
      {},
      {
        userId: user.id,
      }
    )
    if (user.$isLocal) {
      return response.status(201).json({
        message: 'Cadastrado com sucesso',
      })
    } else {
      return response.status(500).json({
        message: 'Usuario ja existe no banco de dados',
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const user = await User.findOrFail(searchCriteria.id)

      return response.json(user)
    } catch (error) {
      return response.status(500).json({
        message: 'Usuário não encontrado',
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['email', 'password'])

    const searchCriteria = {
      id: params['id'],
    }

    const user = await User.findOrFail(searchCriteria.id)

    user.email = data.email
    user.password = data.password

    user.save()
    console.log(user.password)

    return response.json(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const user = await User.findOrFail(searchCriteria.id)

      user.delete()
      if (!user.$isLocal) {
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
