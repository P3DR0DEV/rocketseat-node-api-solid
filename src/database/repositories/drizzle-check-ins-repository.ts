import dayjs from 'dayjs'
import { and, eq, gte, lte } from 'drizzle-orm'
import { db } from '#src/lib/drizzle.ts'
import type { CheckIn, CheckInInput, CheckInsRepository } from '#src/repositories/check-ins-repository.ts'
import { checkIns } from '../schemas/check-ins.ts'

export class DrizzleCheckInsRepository implements CheckInsRepository {
  async create(values: CheckInInput): Promise<CheckIn> {
    const checkIn = await db.insert(checkIns).values(values).returning()

    return checkIn[0]
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = await db
      .select()
      .from(checkIns)
      .where(
        and(
          eq(checkIns.userId, userId),
          gte(checkIns.createdAt, startOfTheDay.toDate()),
          lte(checkIns.createdAt, endOfTheDay.toDate()),
        ),
      )

    if (checkInOnSameDate.length === 0) {
      return null
    }

    return checkInOnSameDate[0]
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const returnedCheckIns = await db
      .select()
      .from(checkIns)
      .where(eq(checkIns.userId, userId))
      .orderBy(checkIns.createdAt)
      .limit(20)
      .offset((page - 1) * 20)

    return returnedCheckIns
  }

  async countByUserId(userId: string): Promise<number> {
    const total = await db.$count(checkIns, eq(checkIns.userId, userId))

    return total
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await db.select().from(checkIns).where(eq(checkIns.id, id))

    if (checkIn.length === 0) {
      return null
    }

    return checkIn[0]
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await db.update(checkIns).set(checkIn).where(eq(checkIns.id, checkIn.id)).returning()

    return updatedCheckIn[0]
  }
}
