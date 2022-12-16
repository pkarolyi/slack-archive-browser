import { fetcher } from '@lib/fetcher'
import { ArchiveMessage } from '@prisma/client'
import styles from '@styles/Channel.module.scss'
import { DateTime } from 'luxon'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'

export default function Channel() {
  const router = useRouter()
  const { id } = router.query

  const getKey = useCallback(
    (id: any) =>
      (pageIndex: number, previousPageData: ArchiveMessage[] | null) => {
        if (!previousPageData) return `/api/message/${id}?count=1000`
        if (previousPageData && previousPageData.length === 0) return null
        return `/api/message/${id}?before=${
          previousPageData[previousPageData.length - 1].ts
        }&count=1000`
      },
    [id]
  )

  const { data, size, setSize } = useSWRInfinite<ArchiveMessage[]>(
    getKey(id),
    fetcher
  )

  if (!data) return 'loading...'

  return (
    <div className={styles.container}>
      <Head>
        <title>CPPFTW Archive | ALPHA</title>
      </Head>

      <main className={styles.main}>
        {data.map((messages) =>
          messages?.map((m) => (
            <div key={m.id}>
              <p>
                [{DateTime.fromSeconds(parseFloat(m.ts)).toFormat('D TT')}] &lt;
                <strong>{m.name}</strong>&gt;: <span>{m.text}</span>
              </p>
            </div>
          ))
        )}
        <button onClick={() => setSize(size + 1)}>Load More</button>
      </main>
    </div>
  )
}
