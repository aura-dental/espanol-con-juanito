import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ArrowLeftIcon } from 'lucide-react'
import SettingsForm from '@/components/SettingsForm'

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="bg-white border-b border-cream-200 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost p-2">
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
          <h1 className="heading-serif text-xl font-bold text-navy-900">Settings</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <SettingsForm profile={profile} userId={user.id} />
      </main>
    </div>
  )
}
