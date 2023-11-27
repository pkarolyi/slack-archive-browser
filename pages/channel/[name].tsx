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
  const { name } = router.query

  const getKey = useCallback(
    (id: any) =>
      (pageIndex: number, previousPageData: ArchiveMessage[] | null) => {
        if (!previousPageData) return `/api/message/${id}?count=50`
        if (previousPageData && previousPageData.length === 0) return null
        return `/api/message/${id}?from=${
          previousPageData[previousPageData.length - 1].ts
        }&count=10`
      },
    [name]
  )

  const { data, size, setSize } = useSWRInfinite<ArchiveMessage[]>(
    getKey(name),
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
            <div key={m.id} className={styles.message}>
              <div className={styles.message_head}>
                <span className={styles.name}>{m.name}</span>
                <span className={styles.ts}>
                  [{DateTime.fromSeconds(parseFloat(m.ts)).toFormat('D TT')}]
                </span>
              </div>
              <div className={styles.message_body}>
                <span className={styles.text}>{m.text}</span>
              </div>
            </div>
          ))
        )}
        <button
          className={styles.load_more}
          onClick={() => setSize((size) => size + 1)}
        >
          Load more
        </button>
      </main>
    </div>
  )
}
