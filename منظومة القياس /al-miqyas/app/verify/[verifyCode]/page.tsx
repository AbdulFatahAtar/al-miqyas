import { VerificationPage } from "../../../components/public-pages";

export default async function Page({ params }: { params: Promise<{ verifyCode: string }> }) {
  const { verifyCode } = await params;
  return <VerificationPage verifyCode={verifyCode.toUpperCase()} />;
}
