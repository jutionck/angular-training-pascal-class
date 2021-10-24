export interface AlertMessage {
  status: 'primary' | 'success' | 'info' | 'danger' | 'warning'
  text: string
}