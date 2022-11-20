import Evaluation from '~/models/evaluation.model'
import QuestLog from '~/models/questlog.model'
import { Participant } from '~/types/models/Participant'
import { getLineUserFromIdToken } from '~/routes/users/helpers/getLineUserFromIdToken'
import { getUserRecordFromLineUId } from '~/routes/users/helpers/getUserRecordFromLineUId'

const submitEvaluation = async (data: Participant, lineToken?: string) => {
  try {
    const payload = {
      ...data,
    }

    if (lineToken) {
      const user = await getLineUserFromIdToken(lineToken)
      const userRecord = await getUserRecordFromLineUId(user.userId)

      if (userRecord) {
        Object.assign(payload, {
          participant: userRecord._id,
        })
      }
    }

    const p = await Evaluation.create(payload)

    await QuestLog.create({
      participant: p.participant,
      questNo: 6,
      status: 'success',
    })

    return p
  } catch (error: any) {
    throw new Error(error)
  }
}

export default submitEvaluation
