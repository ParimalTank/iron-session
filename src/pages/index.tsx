import Link from "next/link";
import { withSessionSsr } from "../lib/withSession";

interface Props {
  username: string;
}

export default function Home({ username }: Props) {
  return (
    <div>
      <div className="name">I'm {username || "Guest User"}</div>
      <button><Link href={"/login"}>Go To Login</Link></button>
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }) {
    try {
      const username = req.session?.username || "";

      return {
        props: {
          username: username
        }
      }
    }
    catch (err) {
      console.log("page Home error", err);

      return {
        redirect: {
          destination: '/login',
          statusCode: 307
        }
      }
    }
  }
)