interface NotificationProps {
  message: string | null
  type: 'success' | 'error'
}

const Notification = ({ message, type }: NotificationProps) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

export default Notification 