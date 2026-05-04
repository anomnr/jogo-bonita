/*

import { serverSupabaseClient } from '#supabase/server'

const TARGET_MEMBER = 'Christabella Bonita'

type ScheduleItem = {
  date: string
  title: string
  type: string
  reference_code?: string
}

type Member = {
  name: string
}

type ShowData = {
  date: string
  type: string
  title: string
  ref_code: string
}

function convertToWIBDate(dateString: string) {
  const date = new Date(dateString)
  date.setHours(date.getHours() + 7)
  return date.toISOString().split('T')[0]
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  try {
    const now = new Date()
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

    const scheduleJson = await scheduleRes.json()

    if (!scheduleJson?.data || !Array.isArray(scheduleJson.data)) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Format data schedule tidak valid'
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

        const isBellaThere = members.some((member: Member) => {
          const name = member.name?.toLowerCase() || ''
          return (
            name.includes('christabella') ||
            name.includes('bella') ||
            name.includes('bonita')
          )
        })

        if (isBellaThere) {
          foundShows.push({
            date: convertToWIBDate(item.date),
            type: item.type,
            title: item.title,
            ref_code: refCode
          })
        }
      } catch (detailError) {
        console.error('Gagal mengambil detail:', refCode, detailError)
      }

      await sleep(500)
    }

    let added = 0
    let updated = 0

    for (const show of foundShows) {
      const { data: existing } = await supabase
        .from('shows')
        .select('id')
        .eq('ref_code', show.ref_code)
        .maybeSingle()

      const { error } = await supabase.from('shows').upsert(
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

      if (error) {
        console.error('Supabase upsert error:', error)
        continue
      }

      if (existing) {
        updated++
      } else {
        added++
      }
    }

    return {
      success: true,
      message: 'Sinkronisasi selesai',
      month,
      year,
      checked,
      found: foundShows.length,
      added,
      updated,
      data: foundShows
    }
  } catch (error) {
    console.error('Sync error:', error)

    return {
      success: false,
      message: 'Terjadi kesalahan internal saat sinkronisasi',
      error: error instanceof Error ? error.message : String(error)
    }
  }
})

*/