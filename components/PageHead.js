import Head from 'next/head';
import { defaultKeywords } from 'constants/seo';

export default function PageHead({ title, description, keywords = '' }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={defaultKeywords + keywords} />
      <link rel="icon" href="/tickEthIconWhite.svg" />
    </Head>
  );
}
