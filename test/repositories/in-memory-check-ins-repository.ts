import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import type { CheckIn, CheckInInput, CheckInsRepository } from '#src/repositories/check-ins-repository.ts'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find(
      (checkIn) => {
        const checkInDate = dayjs(checkIn.createdAt)
        const isSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

        return checkIn.userId === userId && isSameDate
      },
    )

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(values: CheckInInput) {
    const checkIn: CheckIn = { id: randomUUID(), ...values, createdAt: new Date(), validatedAt: null }

    await this.items.push(checkIn)

    return checkIn
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = this.items.filter((checkIn) => checkIn.userId === userId).slice((page - 1) * 20, page * 20)

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    const count = this.items.filter((checkIn) => checkIn.userId === userId).length

    return count
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const index = this.items.findIndex((item) => item.id === checkIn.id)

    if (index !== -1) {
      this.items[index] = checkIn
    }

    return this.items[index]
  }

}
