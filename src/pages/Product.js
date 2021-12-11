import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../util/api"

export default function Product () {
  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getProduct(id)

        console.log('product', res)

        setData(res.data)
      } catch (err) {
        if (err.response) {
          console.warn('response error', err.response)
        } else {
          console.error("An error occurred")
        }
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading
        ? 'Loading'
        : data
          ?
          <>
            <h1>{data.name}</h1>
          </>
          : 'Product not found'
      }
    </>
  )
}