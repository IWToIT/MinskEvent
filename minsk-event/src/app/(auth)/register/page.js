import AuthForm from '../../../components/auth/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <AuthForm mode="register" />
      </div>
    </div>
  );
}