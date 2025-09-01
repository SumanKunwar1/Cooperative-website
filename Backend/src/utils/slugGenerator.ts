export const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim() // Remove leading/trailing whitespace
}

// Additional utility functions for slug handling
export const validateSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

export const generateUniqueSlug = async (
  baseName: string,
  checkFunction: (slug: string) => Promise<boolean>,
): Promise<string> => {
  let slug = createSlug(baseName)
  let counter = 1

  while (await checkFunction(slug)) {
    slug = `${createSlug(baseName)}-${counter}`
    counter++
  }

  return slug
}
