/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

// https://jsonplaceholder.typicode.com/guide/
const url = 'https://jsonplaceholder.typicode.com/posts'
const getEnabled = false
const postEnabled = false

function Fetch() {
  useEffect(() => {
    if (getEnabled) {
      fetch(url)
        .then(data => {
          console.log('raw data', data)
          return data.json()
        })
        .then(data => {
          console.log('parsed data', data)
          // throw Error('error')
          // operazioni
        })
        .catch(err => {
          console.warn('error', err)
        })
        .finally(() => {
          console.log('finally')
        })
    
      // const func = async () => {
      //   try {
      //     const res = await fetch(url)
      //     console.log('raw data', res)
      //     const data = await res.json()
      //     console.log('parsed data', data)
    
      //     // const data = await (await fetch(url)).json()
      //     // console.log('data', data)
      //   } catch (err) {
      //     console.warn(err)
      //   } finally {
      //     console.log('finally')
      //   }
      // }
      // func()
    
      // (async () => {
      //   try {
      //     const res = await fetch(url)
      //   } catch (err) {
      //     console.warn(err)
      //   } finally {
      //     console.log('finally')
      //   }
      // })()
    }
  }, [getEnabled])

  useEffect(() => {
    if (postEnabled) {
      (async () => {
        try {
          const res = await fetch(url, {
            method: 'post',
            body: JSON.stringify({
              title: 'Title',
              body: '',
              userId: 1
            }),
            headers: {
              'Content-type': 'application/json'
            }
          })
          console.log('res',res)
          const data = await res.json()
          console.log('data',data)
        } catch (err) {
          console.warn(err)
        } finally {
          console.log('finally')
        }
      })()
    }
  }, [postEnabled])

  return (
    <></>
  )
}

export default Fetch
