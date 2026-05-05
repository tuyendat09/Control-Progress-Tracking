import GoogleAuth from '@/components/ui/GoogleAuth/GoogleAuth'
import HeroTypewriter from './HeroWriter'

import SignUpForm from './SignUpForm'

export default function SignUp() {
  return (
    <div className="flex w-87.5 flex-col items-center justify-items-center gap-(--spacing-md)">
      <HeroTypewriter />
      <p className="text-center">
        Thank you for signing up. To start enjoy the benetfit, let's set up your account
      </p>
      <SignUpForm />
      <GoogleAuth />
    </div>
  )
}
