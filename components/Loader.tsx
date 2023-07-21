import logo from '../public/logo.png'
import Image from 'next/image'
const Loader = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-y-4">
        <div className='w-10 h-10 relative animate-spin'>
            <Image src={logo} fill alt='Logo' />
        </div>
        <h2 className='text-sm text-muted-foreground'>Genius is thinking ....</h2>
    </div>
  )
}
export default Loader