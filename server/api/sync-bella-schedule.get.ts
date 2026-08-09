/*
UDAH KEBLOKIR CLAUDFARE ANJENG
*/

import { serverSupabaseServiceRole } from '#supabase/server'
import { createError } from 'h3'



const TARGET_MEMBER = 'Christabella Bonita'
const SYNC_KEY = 'bella_jkt48_schedule_daily_sync'
const DETAIL_DELAY_MS = 500

type ScheduleItem = {
  date: string
  title: string
  type: string
  reference_code?: string
}

type Member = {
  name?: string
}

type ShowData = {
  date: string
  type: string
  title: string
  ref_code: string
}

function toWIBDateOnly(input: string | Date) {
  const date = new Date(input)

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date)

  const day = parts.find((part) => part.type === 'day')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const year = parts.find((part) => part.type === 'year')?.value

  return `${year}-${month}-${day}`
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isBellaMember(member: Member) {
  const name = member.name?.toLowerCase() || ''

  return (
    name.includes('christabella') ||
    name.includes('christabella bonita') ||
    name.includes('bonita')
  )
}

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)

  try {
    const now = new Date()
    const todayWIB = toWIBDateOnly(now)

    const { data: syncState, error: syncStateError } = await supabase
      .from('sync_states')
      .select('last_success_date, last_success_at, last_result')
      .eq('key', SYNC_KEY)
      .maybeSingle()

    if (syncStateError) {
      throw syncStateError
    }

    if (syncState?.last_success_date === todayWIB) {
      return {
        success: true,
        skipped: true,
        message: 'Sync hari ini sudah pernah dilakukan. Menggunakan hasil cache.',
        last_success_at: syncState.last_success_at,
        last_success_date: syncState.last_success_date,
        result: syncState.last_result
      }
    }

    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const scheduleUrl = `https://jkt48.com/api/v1/schedules?lang=id&month=${month}&year=${year}`

    const scheduleRes = await fetch(scheduleUrl, {
      cache: 'no-store'
    })

    if (!scheduleRes.ok) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Gagal mengambil data schedule JKT48'
      })
    }

    const contentType = scheduleRes.headers.get('content-type')
    if (contentType && contentType.includes('text/html')) {
      const text = await scheduleRes.text()
      if (text.includes('Cloudflare') || text.includes('Just a moment')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'Diblokir oleh proteksi Cloudflare JKT48'
        })
      }
      throw createError({
        statusCode: 500,
        statusMessage: 'Format response bukan JSON (mungkin diblokir server)'
      })
    }

    const scheduleJson = await scheduleRes.json()

    if (!scheduleJson?.data || !Array.isArray(scheduleJson.data)) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Format data schedule JKT48 tidak valid'
      })
    }

    const foundShows: ShowData[] = []
    let checked = 0

    for (const item of scheduleJson.data as ScheduleItem[]) {
      const refCode = item.reference_code

      if (!refCode) continue
      if (item.type !== 'SHOW' && item.type !== 'EVENT') continue

      checked++

      const detailUrl =
        item.type === 'SHOW'
          ? `https://jkt48.com/api/v1/theater-shows/${refCode}?lang=id`
          : `https://jkt48.com/api/v1/events/${refCode}?lang=id`

      try {
        const detailRes = await fetch(detailUrl, {
          cache: 'no-store'
        })

        if (!detailRes.ok) {
          console.log('Detail gagal:', refCode, detailRes.status)
          continue
        }

        const detailJson = await detailRes.json()

        const members =
          detailJson?.data?.jkt48_member ||
          detailJson?.data?.members ||
          detailJson?.data?.member ||
          []

        if (!Array.isArray(members)) {
          console.log('Members bukan array:', refCode, members)
          continue
        }

        const isBellaThere = members.some(isBellaMember)

        if (isBellaThere) {
          foundShows.push({
            date: toWIBDateOnly(item.date),
            type: item.type,
            title: item.title,
            ref_code: refCode
          })
        }
      } catch (detailError) {
        console.error('Gagal mengambil detail:', refCode, detailError)
      }

      await sleep(DETAIL_DELAY_MS)
    }

    let added = 0
    let updated = 0

    for (const show of foundShows) {
      const { data: existing, error: existingError } = await supabase
        .from('shows')
        .select('id')
        .eq('ref_code', show.ref_code)
        .maybeSingle()

      if (existingError) {
        console.error('Supabase check existing error:', existingError)
        continue
      }

      const { error: upsertError } = await supabase.from('shows').upsert(
        {
          ref_code: show.ref_code,
          date: show.date,
          type: show.type,
          title: show.title,
          member_name: TARGET_MEMBER,
          source: 'api'
        },
        {
          onConflict: 'ref_code'
        }
      )

      if (upsertError) {
        console.error('Supabase upsert error:', upsertError)
        continue
      }

      if (existing) {
        updated++
      } else {
        added++
      }
    }

    const result = {
      success: true,
      skipped: false,
      message: 'Sinkronisasi selesai',
      month,
      year,
      checked,
      found: foundShows.length,
      added,
      updated,
      data: foundShows
    }

    const { error: syncUpdateError } = await supabase
      .from('sync_states')
      .upsert(
        {
          key: SYNC_KEY,
          last_success_at: new Date().toISOString(),
          last_success_date: todayWIB,
          last_result: result,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'key'
        }
      )

    if (syncUpdateError) {
      console.error('Gagal update sync state:', syncUpdateError)
    }

    return result
  } catch (error) {
    console.error('Sync error:', error)

    return {
      success: false,
      message: 'Terjadi kesalahan internal saat sinkronisasi',
      error: error instanceof Error ? error.message : String(error)
    }
  }
})