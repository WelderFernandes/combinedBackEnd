import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public country: string

  @column()
  public state: string

  @column()
  public initials: string

  @column()
  public city: string

  @column()
  public street: string

  @column()
  public number: number

  @column()
  public complement: string

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
