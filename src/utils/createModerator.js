import User from '../models/user'
import { ROLES } from './constants'

export async function createModerator() {
  const moderator = await User.findOne({ username: 'moderator' })
  if (moderator) return
  const user = new User({
    username: 'moderator',
    fullname: 'Moderator',
    password: '123456',
    role: ROLES.MODERATOR,
  })

  user.save()
}