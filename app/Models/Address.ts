import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Establishment from './Establishment'

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

  @hasOne(() => Establishment)
  public establishments: HasOne<typeof Establishment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
