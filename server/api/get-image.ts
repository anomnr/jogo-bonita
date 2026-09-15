import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
  const { publicId } = getQuery(event)

  if (!publicId || typeof publicId !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: `publicId` query parameter is required.',
    })
  }

  const config = useRuntimeConfig(event)

  // Configure Cloudinary with private server-side credentials
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName as string,
    api_key: config.cloudinaryApiKey as string,
    api_secret: config.cloudinaryApiSecret as string,
    secure: true,
  })

  // Generate a time-limited signed URL for the asset.
  // Images are stored as 'upload' (public) type, so we sign that delivery
  // path with an expiry — links are valid for 1 hour and cannot be hotlinked.
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 // now + 1 h

  const signedUrl = cloudinary.url(publicId, {
    sign_url: true,
    expires_at: expiresAt,
    format: 'jpg', // Force .jpg extension, matching original URLs
  })

  return { url: signedUrl }
})
