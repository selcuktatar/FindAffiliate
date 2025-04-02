
export default eventHandler(async (event) => {
    const db = hubDatabase()
    const { results } = await db.prepare('SELECT * FROM programs').all()
    // TODO: Change with Drizzle when you done with logics
    return results
})
