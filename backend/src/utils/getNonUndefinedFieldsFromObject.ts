export function getNonUndefinedFieldsFromObject(object: Object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
}
