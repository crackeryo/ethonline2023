import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import CreateQuestion from '../components/createquestion'
import DisplaySpecificQuestion from '../components/displayspecificquestion'


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Dual Dialogue</title>
      </Head>
        <DisplaySpecificQuestion></DisplaySpecificQuestion>

 
    </Layout>
  )
}
