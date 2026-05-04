import BrandPanel from '@/components/(auth)/login/BrandPanel'
import LoginFormContainer from '@/components/(auth)/login/LoginFormContainer'
import LoginHeader from '@/components/(auth)/login/LoginHeader'

export default function LoginPage() {
  return (
    <main className="grid min-h-screen w-full grid-cols-1 bg-white lg:grid-cols-2">
      <BrandPanel />
      <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-18 lg:py-20">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 lg:hidden">
            123123
            <LoginHeader variant="mobile" />
          </div>

          <LoginFormContainer />
        </div>
      </section>
    </main>
  )
}
