export type ICars = {
  brand: string
  color: string
  engine: string
  horsePower: number
  id: number
  model: string
}
export type ILogin = {
  onLogin: (token: string) => void
}

export type ILogout = {
  onLogout: () => void
  token: string
}
