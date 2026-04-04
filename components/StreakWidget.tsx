import { cn } from '@/lib/utils'

interface DayData {
  date: string
  status: 'completed' | 'partial' | 'missed' | 'rest' | 'future'
}

interface StreakWidgetProps {
  days: DayData[]
  currentStreak: number
  longestStreak: number
  totalSessions: number
}

const STATUS_COLORS = {
  completed: 'bg-navy-600',
  partial: 'bg-ochre-400',
  missed: 'bg-red-300',
  rest: 'bg-cream-300',
  future: 'bg-cream-200',
}

export default function StreakWidget({
  days,
  currentStreak,
  longestStreak,
  totalSessions,
}: StreakWidgetProps) {
  // Group into weeks (rows of 7)
  const weeks: DayData[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="heading-serif text-lg font-bold text-navy-900">
          90-Day Challenge
        </h3>
        <div className="flex items-center gap-1 text-terracotta-500 text-sm font-semibold">
          <span className="text-lg">🔥</span>
          <span>{currentStreak} day streak</span>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date} — ${day.status}`}
                  className={cn(
                    'streak-cell rounded-sm transition-colors',
                    STATUS_COLORS[day.status],
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        {[
          { status: 'completed', label: 'Done' },
          { status: 'partial', label: 'Partial' },
          { status: 'missed', label: 'Missed' },
          { status: 'rest', label: 'Rest' },
          { status: 'future', label: 'Upcoming' },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-1">
            <div
              className={cn(
                'w-3 h-3 rounded-sm',
                STATUS_COLORS[status as keyof typeof STATUS_COLORS],
              )}
            />
            <span className="text-xs text-navy-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-cream-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-navy-900">{currentStreak}</p>
          <p className="text-xs text-navy-400 mt-0.5">Current streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-navy-900">{longestStreak}</p>
          <p className="text-xs text-navy-400 mt-0.5">Longest streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-navy-900">{totalSessions}</p>
          <p className="text-xs text-navy-400 mt-0.5">Total sessions</p>
        </div>
      </div>
    </div>
  )
}
