import { fetcher } from '@lib/fetcher'
import { ArchiveChannel } from '@prisma/client'
import styles from '@styles/Home.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

export default function Home() {
  const { data: channels } = useSWR<ArchiveChannel[]>('/api/channel', fetcher)

  return (
    <div className={styles.container}>
      <Head>
        <title>CPPFTW Archive | ALPHA</title>
      </Head>

      <main className={styles.main}>
        <nav>
          {channels?.map((c) => (
            <p key={c.id}>
              <Link href={`/channel/${c.name}`}>{c.name}</Link>
            </p>
          ))}
        </nav>
      </main>
    </div>
  )
}
