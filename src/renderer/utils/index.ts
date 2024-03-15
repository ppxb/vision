export const convertSpaceBytes = (bytes: number) => {
  const cacl = bytes / 1024 / 1024 / 1024 / 1024
  if (cacl > 1) {
    return `${cacl.toFixed(2)} TB`
  }
  return `${(cacl * 1024).toFixed(2)} GB`
}
