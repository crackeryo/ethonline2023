import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import CreateQuestion from '../components/createquestion'
import DisplayQuestion from '../components/displayquestion'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Title</title>
      </Head>
      <DisplayQuestion></DisplayQuestion>
      <CreateQuestion></CreateQuestion>
      <div>intro</div>
    </Layout>
  )
}
