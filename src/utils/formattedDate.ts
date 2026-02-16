const formattedDate = (): string => {
  const date = new Date()
  return date
    .toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    .replace(',', '')
}
export default formattedDate