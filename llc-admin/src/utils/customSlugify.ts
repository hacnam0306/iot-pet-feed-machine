import slugify from 'slugify'

export const customSlugify = (str: string) => {
  return slugify(str, {
    lower: true,
    strict: true,
  })
}
