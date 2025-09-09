
import ExcaliSketch from "../../../components/ExcaliSketch" // adjust the path as needed
export default async function HomePage({ params }) {
  const param = await params

  return (
    <div>
      <ExcaliSketch roomId={parseInt(param.roomId)} />
    </div>
  )
}
