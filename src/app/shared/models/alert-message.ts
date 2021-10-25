export interface AlertMessage {
  status: 'primary' | 'info' | 'success' | 'secondary' | 'warning' | 'danger'
  text: string
}