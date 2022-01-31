import Head from "next/head";

export default function Layout({children}) {
    return (
        <>
            <Head>
                <title>NFT Hockey</title>
                <meta name="description" content="NFT-based fantasy hockey managers game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </>
    )
}