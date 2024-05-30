import { useRouter } from 'next/router';
import DevPage from "../../../component/DevPage";

export default function App() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <DevPage id={ id } />
    </>
  );
}
