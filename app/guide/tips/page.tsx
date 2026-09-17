export default function TipsPage() {
  return (
    <article className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-gray-900">AIへの質問のコツ</h1>

      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-gray-800">
          一度で完璧を求めない
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          最初の回答が理想と違っても大丈夫です。「もう一度生成」や「改善する」機能を使って、
          少しずつ理想の指示文に近づけていきましょう。
        </p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-gray-800">
          具体例を1つ入れてみる
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          「例えば〇〇のような感じ」と伝えるだけで、AIはイメージをつかみやすくなります。
        </p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-gray-800">
          長さの希望を伝える
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          「短く」「詳しく」といった希望を伝えるだけで、読みやすさが大きく変わります。
        </p>
      </section>
    </article>
  );
}
