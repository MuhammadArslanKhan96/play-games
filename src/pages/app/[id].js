import { useRouter } from 'next/router';
import AppPage from "../../../component/AppPage";

export default function App() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <AppPage params={{ id }} />
    </>
  );
}
