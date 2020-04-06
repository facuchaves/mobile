export function updateObject<T>(oldObject: T, updatedValues: T): T {
  return {
    ...oldObject,
    ...updatedValues,
  }
}
