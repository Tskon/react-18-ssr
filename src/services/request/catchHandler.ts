export default (error: Promise<{ error: { code: string} }>) => {
  error.then((result ) => {
    console.warn(result)
  })
  return error
}
