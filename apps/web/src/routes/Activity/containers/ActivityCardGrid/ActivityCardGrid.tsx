import type { ComponentProps, FC } from 'react'
import ActivityCard from '../../components/ActivityCard'

interface ActivityCardGridProps {
  activities: ComponentProps<typeof ActivityCard>[]
}

const ActivityCardGrid: FC<ActivityCardGridProps> = ({ activities }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {activities.map(activity => (
        <ActivityCard key={activity.title} {...activity} />
      ))}
    </div>
  )
}

export default ActivityCardGrid
