export function transformForMessage(str: string) {
  return str.replace(
    "fields",
    "'New password' and 'Repeat new password' fields"
  );
}
