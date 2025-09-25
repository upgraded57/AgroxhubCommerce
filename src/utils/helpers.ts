export const currency = (value: string | number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'symbol',
  }).format(Number(value))

export const preventAlphabetInput = (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const numbers = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'Backspace',
    'Tab',
    'Delete',
    'ArrowRight',
    'ArrowLeft',
    '.',
  ]

  if (!numbers.includes(e.key)) {
    e.preventDefault()
    return
  }
}
