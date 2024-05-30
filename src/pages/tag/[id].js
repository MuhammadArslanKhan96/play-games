import { useRouter } from 'next/router';
import TagPage from "../../../component/TagPage";

export default function TagData() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <TagPage  id={ id } />
    </>
  );
}
