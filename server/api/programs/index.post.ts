import { z } from 'zod'

const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    link: z.string().url(),
    commissionRate: z.number().positive(),
    categories: z.array(z.string()).min(1),
    email: z.string().email(),
    isListed: z.boolean().default(false), // ✅ Add default value
    visitorNumber: z.number().default(0)  // ✅ Add default value
})

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const validatedData = schema.parse(body)

        const db = hubDatabase()

        const stmt = await db.prepare(`
      INSERT INTO programs (name, description, link, commissionRate, categories, email, created_at, isListed, visitorNumber)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
            validatedData.name,
            validatedData.description,
            validatedData.link,
            validatedData.commissionRate,
            JSON.stringify(validatedData.categories),
            validatedData.email,
            new Date().toISOString(),
            validatedData.isListed,
            validatedData.visitorNumber
        )

        await stmt.run()
        return { success: true, message: 'Program saved successfully!' }
    } catch (error) {
        return createError({ statusCode: 400, statusMessage: error.message })
    }
})
