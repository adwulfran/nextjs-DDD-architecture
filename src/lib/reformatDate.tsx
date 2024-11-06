export function reformatDate(dateString: string): string {
  const [month, day, year] = dateString.split('/');
  return `${day}/${month}/${year}`; // Return the new format (DD/MM/YYYY)
}