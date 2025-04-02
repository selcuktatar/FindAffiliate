export default defineEventHandler(async (event) => {
    const db = hubDatabase()
    const programId = getRouterParam(event, 'programId')
    const { results } = await db.prepare('SELECT id, name, description, link, commissionRate, visitorNumber, categories, isListed FROM programs WHERE id=?1')
        .bind(programId)
        .run()
    // TODO: Change with Drizzle when you done with logics
    console.log(results)
    return results[0]
})
