export function reformatDate(dateString: string) {
  const [month, day, year] = dateString.split('/'); // Split the original date string by "/"
  return `${day}/${month}/${year}`; // Return the new format (DD/MM/YYYY)
}