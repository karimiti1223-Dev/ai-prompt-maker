export default function HowToWritePage() {
  return (
    <article className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-ink font-display">良いプロンプトの作り方</h1>

      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-ink">1. 役割を伝える</h2>
        <p className="text-sm leading-relaxed text-ink/60">
          「あなたは〇〇の専門家です」のように、AIにどんな立場で答えてほしいかを伝えると、
          回答の視点がぶれにくくなります。
        </p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-ink">2. 目的をはっきりさせる</h2>
        <p className="text-sm leading-relaxed text-ink/60">
          「何のために」その回答が必要なのかを添えると、AIは背景を踏まえた答えを返しやすくなります。
        </p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-ink">3. 出力形式を指定する</h2>
        <p className="text-sm leading-relaxed text-ink/60">
          「箇条書きで」「手順形式で」「短く」など、欲しい形を先に伝えると、
          読みやすい回答が返ってきやすくなります。
        </p>
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-ink">4. 条件・制約を伝える</h2>
        <p className="text-sm leading-relaxed text-ink/60">
          「専門用語には説明をつけてほしい」のような条件を伝えると、
          自分に合った回答になりやすくなります。
        </p>
      </section>

      <p className="text-sm leading-relaxed text-ink/60">
        このサービスの質問画面は、まさにこの4つの要素(役割・目的・出力形式・条件)を
        整理するために作られています。
      </p>
    </article>
  );
}
