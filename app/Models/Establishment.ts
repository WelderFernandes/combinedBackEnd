import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'

export default class Establishment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public about: string

  @column()
  public avatar: string

  @column()
  public phone: string

  @column()
  public location: string

  @column()
  public back_cover: string

  @column()
  public assessment: string

  @column()
  public addressId: number

  @column()
  public user_id: number

  @belongsTo(() => Address)
  public addresses: BelongsTo<typeof Address>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
