export function transformForMessage(str: string) {
  return str.replace("fields", "'password' and 'repeat password' fields");
}
