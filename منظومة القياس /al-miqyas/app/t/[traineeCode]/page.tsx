import { TraineeRoutingPage } from "../../../components/public-pages";

export default async function Page({ params }: { params: Promise<{ traineeCode: string }> }) {
  const { traineeCode } = await params;
  return <TraineeRoutingPage traineeCode={traineeCode.toUpperCase()} />;
}
