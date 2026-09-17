import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/categories";
import { getTemplateById } from "@/lib/templates";
import QuestionForm from "@/components/QuestionForm";

type Props = {
  params: { category: string };
  searchParams: { template?: string };
};

export default function CreateCategoryPage({ params, searchParams }: Props) {
  const category = getCategoryById(params.category);

  if (!category) {
    notFound();
  }

  // テンプレートから来た場合は、その内容をあらかじめ入力しておく
  const template = searchParams.template
    ? getTemplateById(searchParams.template)
    : undefined;

  return (
    <QuestionForm category={category} initialAnswers={template?.baseAnswers} />
  );
}
