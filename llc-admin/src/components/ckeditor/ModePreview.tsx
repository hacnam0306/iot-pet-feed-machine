import Parser from 'html-react-parser'

interface Props {
  data: string
}

const ModePreview = ({ data }: Props) => {
  return <div>{Parser(data)}</div>
}

export default ModePreview
