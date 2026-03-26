type Props = {
  title: string
  children: React.ReactNode
}

const Modal = ({ title, children }: Props) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20 }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

export default Modal
