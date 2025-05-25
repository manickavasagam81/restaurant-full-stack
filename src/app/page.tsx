import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Slider/>
      <Featured/>
      <Offer/>
    </main>
  )
}
