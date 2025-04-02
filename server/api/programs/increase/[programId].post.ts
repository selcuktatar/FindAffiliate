export default defineEventHandler(async (event) => {
    const db = hubDatabase()
    const programId = getRouterParam(event, 'programId')
    const body = readBody(event)
    const { results } = await db.prepare(`SELECT visitorNumber FROM programs WHERE id=?1`)
        .bind(programId)
        .run()
    if (results.length === 0) {
        return {}
    }
    const increasedVisitorNumber = Math.round(Number(results[0].visitorNumber)) + 1;
    const data = await db.prepare('UPDATE programs SET visitorNumber = ?1 WHERE id=?2')
        .bind(increasedVisitorNumber, programId)
        .run()
    // TODO: Change with Drizzle when you done with logics
    console.log(results)
    console.log(programId)

    return
})
