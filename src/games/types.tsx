export const OrderBy = {
    DateAdded: 'ts_added',
    Released: 'year_released'
} as const

export type OrderBy = typeof OrderBy[keyof typeof OrderBy]
