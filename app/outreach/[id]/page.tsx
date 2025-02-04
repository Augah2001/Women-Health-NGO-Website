
import ViewSingle from './ViewSingle'

const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <ViewSingle id = {id}/>
    </div>
  )
}

export default page
