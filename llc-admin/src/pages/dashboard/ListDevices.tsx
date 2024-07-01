import { PATH_DASHBOARD } from '@configs'
import { getProfileAdminAction, useAppDispatch, useAppSelector } from '@redux'
import { Card } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
type Props = {}

export const ListDevice = (props: Props) => {
  const dispatch = useAppDispatch()
  const { listDevices } = useAppSelector((state) => state.auth)
  const getProfileInfo = async () => {
    try {
      const response = await dispatch(getProfileAdminAction()).unwrap()
    } catch (error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getProfileInfo()
  }, [])

  return (
    <Card>
      <div className="flex flex-wrap justify-center p-4">
        {listDevices.map((device) => (
          <DeviceCard
            key={device._id}
            id={device._id}
            title={device.name}
            imageUrl="https://kingbell.vn/wp-content/uploads/2023/03/may-cho-meo-an-tu-dong-petkit-32-1.jpg"
          />
        ))}
      </div>
    </Card>
  )
}
function DeviceCard({ title, imageUrl, isOn, id }: any) {
  const navigate = useNavigate()

  return (
    <div
      className="w-full p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
      onClick={() => {
        navigate(`${PATH_DASHBOARD}/${id}`)
      }}
    >
      <img
        className="w-20 h-20 mb-2 rounded-lg object-cover"
        src={imageUrl}
        alt={title}
      />
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      <label className="mt-2 flex items-center">
        <span className="mr-2 text-gray-700">Status:</span>
        <input
          type="checkbox"
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-4 w-4 rounded-full bg-white border-gray-300 checked:bg-blue-500 checked:border-blue-600"
          checked={isOn}
          // onChange={onToggle}
        />
      </label>
    </div>
  )
}
