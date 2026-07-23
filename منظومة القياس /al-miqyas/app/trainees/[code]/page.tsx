import { TraineeWorkspace } from "../../../components/trainee-workspace";

export default async function TraineePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <TraineeWorkspace traineeCode={code.toUpperCase()} />;
}
