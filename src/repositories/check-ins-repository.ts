export interface CheckIn {
  id: string
  userId: string
  gymId: string
  createdAt: Date
  validatedAt?: Date | null
}

export interface CheckInInput {
  userId: string
  gymId: string
}

export interface CheckInsRepository {
  create(values: CheckInInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<number>
  findById(id: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
