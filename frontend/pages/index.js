import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import CreateQuestion from '../components/createquestion'
import DisplayQuestion from '../components/displayquestion'
import NavBar from '../components/nav'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Dual Dialogue</title>
      </Head>
      <NavBar></NavBar>
      <DisplayQuestion></DisplayQuestion>
      <CreateQuestion></CreateQuestion>
      
    </Layout>
  )
}
