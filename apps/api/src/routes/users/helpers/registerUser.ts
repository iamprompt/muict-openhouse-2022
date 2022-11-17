import { RICH_MENU_ID } from '../../../const/line/rich-menu'
import { LINEClient } from '../../../libs/line'
import Participant from '../../../models/participant.model'
import QuestLog from '../../../models/questlog.model'
import Registration from '../../../models/registration.model'
import { Participant as IParticipant } from '../../../types/Participant'
import { getLineUserFromIdToken } from './getLineUserFromIdToken'
import { sendTicketToLine } from './sendTicketToLINE'

const registerUser = async (data: IParticipant, lineToken?: string) => {
  try {
    const payload = {
      ...data,
    }

    if (lineToken) {
      const user = await getLineUserFromIdToken(lineToken)
      if (user) {
        Object.assign(payload, {
          lineUserId: user.userId,
          lineDisplayName: user.displayName,
          linePicture: user.picture,
        })
      }
    }

    const p = await Participant.create(payload)

    // Create registration record
    await Registration.create({
      participant: p._id,
    })

    await QuestLog.create({
      participant: p._id,
      questNo: 1,
      status: 'success',
    })

    if (p.lineUserId) {
      // Send Ticket to LINE user
      await sendTicketToLine(p.lineUserId, p)

      // Set Registered Rich Menu
      await LINEClient.linkRichMenuToUser(p.lineUserId, RICH_MENU_ID.REGISTERED)
    }

    return p
  } catch (error: any) {
    throw new Error(error)
  }
}

export default registerUser
