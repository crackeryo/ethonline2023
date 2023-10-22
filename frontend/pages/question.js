import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import CreateQuestion from '../components/createquestion'
import DisplaySpecificQuestion from '../components/displayspecificquestion'
import NavBar from '../components/nav'


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Dual Dialogue</title>
      </Head>
      <NavBar></NavBar>
        <DisplaySpecificQuestion></DisplaySpecificQuestion>

 
    </Layout>
  )
}
