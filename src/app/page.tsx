import Presentation from '@/components/Presentation';
import { seminarSlideRegistry } from '@/config/seminarSlides';

export default function Home() {
  return <Presentation registry={seminarSlideRegistry} />;
}
