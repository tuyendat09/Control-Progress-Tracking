import GoogleIcon from '@/assest/google-icon.svg'
import Image from 'next/image'

export default function GoogleAuth() {
  return (
    <div className="flex items-center gap-(--spacing-xs)">
      <Image src={GoogleIcon} className="size-4" alt="Google Icon" />
      Sign Up With Google
    </div>
  )
}
