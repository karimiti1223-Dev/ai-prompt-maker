import ImproveForm from "./ImproveForm";

type Props = {
  searchParams: { prompt?: string };
};

export default function ImprovePage({ searchParams }: Props) {
  const initialPrompt = searchParams.prompt
    ? decodeURIComponent(searchParams.prompt)
    : "";

  return <ImproveForm initialPrompt={initialPrompt} />;
}
