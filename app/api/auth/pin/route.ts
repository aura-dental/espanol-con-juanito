import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { pin } = await req.json()

  // Constant-time comparison to avoid timing attacks
  if (!process.env.AUTH_PIN || pin !== process.env.AUTH_PIN) {
    await new Promise(r => setTimeout(r, 400))
    return NextResponse.json({ error: 'Incorrect PIN' }, { status: 401 })
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  const authEmail = process.env.AUTH_EMAIL!
  const origin = req.headers.get('origin') || new URL(req.url).origin
  const redirectTo = `${origin}/auth/callback`

  // Ensure the user account exists (create on first login)
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
  const exists = users.some(u => u.email === authEmail)

  if (!exists) {
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: authEmail,
      email_confirm: true,
    })
    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }
  }

  // Generate a magic link token server-side — no email sent, we use it directly
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: authEmail,
    options: { redirectTo },
  })

  if (error || !data?.properties?.action_link) {
    return NextResponse.json({ error: error?.message || 'Failed to generate link' }, { status: 500 })
  }

  return NextResponse.json({ action_link: data.properties.action_link })
}
