import { StatisticChart } from '@components'
import { zodResolver } from '@hookform/resolvers/zod'
import { getProfileAdminAction, useAppDispatch, useAppSelector } from '@redux'
import { Card } from 'antd'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import BatteryGauge from 'react-battery-gauge'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import mqtt, { BaseMqttProtocol } from 'mqtt' // import namespace "mqtt"
import { useParams, useSearchParams } from 'react-router-dom'
import { useSocketObserver } from 'src/hooks/useConnect'
type Props = {}
const addAboutUsSchema = z.object({
  no: z
    .number()
    .min(1, { message: t('error:aboutsus_providing_no_error') as string }),
  mediaId: z.number().min(1, { message: t('error:field_required') as string }),
  mediaMobileId: z
    .number()
    .min(1, { message: t('error:field_required') as string }),
})

const clientId = 'client' + Math.random().toString(36).substring(7)
const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
})

export const Dashboard = (props: Props) => {
  const { id } = useParams()
  const { socket, listenEvent } = useSocketObserver()
  const { accountInfo, currentDevice } = useAppSelector((state) => state.auth)
  const [mqttState, setMqttState] = useState<mqtt.MqttClient>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket?.connect()
    listenEvent()
    return () => {
      socket?.disconnect()
    }
  }, [socket])
  useEffect(() => {
    socket?.emit('join_device', {
      deviceId: id,
      userId: accountInfo?._id,
    })
  }, [socket])

  useEffect(() => {
    client.on('error', (err) => {
      console.log('Error: ', err)
      client.end()
    })

    client.on('reconnect', () => {
      console.log('Reconnecting...')
    })

    client.on('connect', () => {
      console.log('Client connected:' + clientId)
      client.subscribe(`temperature_${id}`, (err) => {})
    })

    // Received
    client.on('message', (topic, message: any, packet) => {
      if (topic === `temperature_${id}`) {
        let arrayBufferConverted: {
          temp: number
          humidity: number
        } = JSON.parse(
          String.fromCharCode.apply(null, [...new Uint8Array(message)])
        )
        setTempArr((temp) => [...temp, arrayBufferConverted?.temp || 0])
        setHudArr((temp) => [...temp, arrayBufferConverted?.humidity || 0])
      }
    })
    // Cleanup on component unmount
    return () => {
      client.end()
    }
  }, [])
  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const response = await dispatch(getProfileAdminAction()).unwrap()
      } catch (error: any) {
        console.log(error.message)
      }
    }

    getProfileInfo()
  }, [])
  const [progress, setProgress] = useState(currentDevice?.battery || 0)
  const [progressFood, setProgressFood] = useState(
    (currentDevice?.foodLevel * 100) / 2000 || 0
  )
  const [tempArr, setTempArr] = useState<number[]>([])
  const [hudArr, setHudArr] = useState<number[]>([])
  const handleClick = async () => {
    for (let i = 0; i <= 100; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10)) // Adjust delay for desired speed
      setProgress(i)
    }
    client?.publish(`updateBattery_${id}`, 'update battery')
  }
  const handleClickFood = async () => {
    for (let i = 0; i <= 100; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10)) // Adjust delay for desired speed
      setProgressFood(i)
    }

    client?.publish(`updateFood_${id}`, 'update food')
  }

  useEffect(() => {
    // Optional: Reset progress after a certain amount of time (if needed)
    const timeoutId = setTimeout(
      () => setProgress(currentDevice?.battery || 0),
      5000
    ) // Adjust timeout as needed
    const timeoutId2 = setTimeout(
      () => setProgressFood((currentDevice?.foodLevel * 100) / 2000 || 0),
      5000
    ) // Adjust timeout as needed
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
    }
  }, [])

  const defaultValue = {
    no: 0,
  }
  const { control, handleSubmit, setValue } = useForm<any>({
    defaultValues: defaultValue,
    resolver: zodResolver(addAboutUsSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  return (
    <Card>
      <StatisticChart temperatureArray={tempArr} humidityArray={hudArr} />
      <form>
        <div className="flex d-row justify-between mt-5">
          <div className="">
            <h3> Battery Charge:</h3>
            <BatteryGauge onClick={handleClick} value={progress} />
          </div>
          <div className="">
            <h3> Food Level:</h3>
            <BatteryGauge onClick={handleClickFood} value={progressFood} />
          </div>
        </div>
      </form>
    </Card>
  )
}
