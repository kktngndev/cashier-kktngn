import AuthForm from "@/components/auth-form";

export default function Page() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-96 h-fit">
        <AuthForm />
      </div>
    </div>
  )
}