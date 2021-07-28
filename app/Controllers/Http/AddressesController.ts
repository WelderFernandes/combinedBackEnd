import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

interface Iaddress {
  country: string
  state: string
  initials: string
  city: string
  street: string
  number: number
  complement: string
  latitude: string
  longitude: string
}

export default class AddressesController {
  public async index({}: HttpContextContract) {
    const addresses = await Address.all()

    if (addresses.length <= 0) {
      return {
        message: 'Nenhum registro encontrado',
      }
    }
    return addresses.map((Address) => Address.toJSON())
  }

  public async create({ request, response }: HttpContextContract) {
    const data: Iaddress = request.only([
      'country',
      'state',
      'initials',
      'city',
      'street',
      'number',
      'complement',
      'latitude',
      'longitude',
    ])

    const addressData = {
      country: data.country,
      state: data.state,
      initials: data.initials,
      city: data.city,
      street: data.street,
      number: data.number,
      complement: data.complement,
      latitude: data.latitude,
      longitude: data.longitude,
    }

    const address = await Address.create(addressData)

    if (address.$isLocal) {
      return response.json({
        message: 'Cadastrado com sucesso',
      })
    } else {
      return response.json({
        message: 'Ops!! Houve algum problema',
      })
      // return response.json(user.$isPersisted)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const address = await Address.findOrFail(searchCriteria.id)

      return response.json(address)
    } catch (error) {
      return response.status(500).json({
        message: 'Endereço não encontrado',
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data: Iaddress = request.only([
      'country',
      'state',
      'initials',
      'city',
      'street',
      'number',
      'complement',
      'latitude',
      'longitude',
    ])

    const searchCriteria = {
      id: params['id'],
    }

    const address = await Address.findOrFail(searchCriteria.id)

    address.country = data.country
    address.state = data.state
    address.initials = data.initials
    address.city = data.city
    address.street = data.street
    address.number = data.number
    address.complement = data.complement
    address.latitude = data.latitude
    address.longitude = data.longitude

    address.save()

    return response.json(address)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const searchCriteria = {
      id: params['id'],
    }
    try {
      const address = await Address.findOrFail(searchCriteria.id)

      address.delete()
      if (!address.$isLocal) {
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
