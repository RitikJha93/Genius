import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h2>This page is unprotected</h2>
      <Link href={'/sign-in'}>
        <Button>Login</Button>
      </Link>
      <Link href={'/sign-up'}>
        <Button>Register</Button>
      </Link>
    </div>
  );
};
export default Home;
