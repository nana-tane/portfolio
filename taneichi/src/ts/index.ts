import '../scss/common.scss';
import '../scss/index.scss';
import { getPortfolioList } from './api/portfolio';
import Swiper from 'swiper';
// @ts-ignore
import 'swiper/css';

const worksContainer = document.querySelector<HTMLDivElement>('#works');
const aboutContainer = document.querySelector<HTMLDivElement>('#about');
const skillContainer = document.querySelector<HTMLDivElement>('#skill');

const renderWorks = async () => {
  const works = await getPortfolioList({
    limit: 100,
    fields: 'id,title,thumbnail',
  });

  const html = `
    <div class="works__inner section__inner">
      <h2 class="works__title section__title">最近の制作物</h2>
      <ul class="works__list">
        ${works.map((item, index) => {
          const slides = item.thumbnail.map(img => `
            <div class="swiper-slide">
              <img
                src="${img.url}"
                width="${img.width || 800}"
                height="${img.height || 600}"
                alt="${item.title}"
                decoding="async"
              >
            </div>
          `).join('');

          return `
            <li class="works__list-item works-item">
              <!-- ★ div → a に変更。href で detail に遷移 -->
              <a class="works-item__inner" href="/detail.html?id=${item.id}" aria-label="${item.title} の詳細">
                <div class="swiper work-swiper-${index}">
                  <div class="swiper-wrapper">
                    ${slides}
                  </div>
                </div>
                <div class="visit-site">
                  <span class="visit-site__text">View detail</span>
                </div>
              </a>
            </li>
          `;
        }).join('')}
      </ul>
    </div>
  `;

  if (worksContainer) {
    worksContainer.innerHTML = html;

    // Swiper 初期化（複数対応）
    const swipers = document.querySelectorAll<HTMLElement>('.swiper');
    swipers.forEach((el) => {
      new Swiper(`.${el.classList[1]}`, {
        loop: true,
        speed: 1500,
      });
    });
  }
}

const renderAbout = async () => {
  const html = `
    <div class="about__inner section__inner">
      <h2 class="about__title section__title">経歴</h2>
      <div class="about__text">
        <p>
          前職の旅行会社を退職後、職業訓練校のITコースを半年間受講し、2020年1月にWeb制作会社へ入社しました。<br>
          入社以降、WordPressやMovable TypeをベースにCMS実装を約5年半担当し、Shopifyテーマ開発（Liquidカスタマイズ・アプリ連携）を含むLP、静的・動的サイト、ECサイトを計40件以上構築・運用してきました。<br>
          WAI-ARIA／WCAG 2.2準拠のアクセシビリティ改善やVanilla JS＋GSAPによるインタラクティブUI構築を得意とし、可読性と保守性を重視したコード設計やCMS・EC管理画面のUX設計にも注力しています。<br>
          テスト・レビュー・デプロイ管理やクライアント折衝にも携わり、現在はmicroCMS×TypeScript×Viteを活用したヘッドレスCMS更新フローの構築に取り組んでいます。
        </p>
      </div>
    </ul>
  `;

  if (aboutContainer) {
    aboutContainer.innerHTML = html;
  }
};

const renderSkill = async () => {
  const html = `
    <div class="skill__inner section__inner">
      <h2 class="skill__title section__title">スキル</h2>
      <ul class="skill__list">
        <li class="skill__list-item skill-item">
          <h3 class="skill-item__title">フロントエンド開発</h3>
          <ul class="skill-item__list">
            <li>
              <h4>・JavaScript (ES2023) / TypeScript</h4>
              <p>DOM 操作、非同期処理、型安全モジュール設計</p>
            </li>
            <li>
              <h4>・JGSAP / CSS Animation</h4>
            </li>
            <li>
              <h4>・Vue 2（保守・機能追加）</h4>
              <p>Vuex／Vue Router の既存コード改修・パフォーマンス改善</p>
            </li>
          </ul>
        </li>
        <li class="skill__list-item skill-item">
          <h3 class="skill-item__title">CMS・EC</h3>
          <ul class="skill-item__list">
            <li>
              <h4>・WordPress</h4>
              <p>自作テーマ、FSE、ACF、REST API 拡張</p>
            </li>
            <li>
              <h4>・Shopify</h4>
              <p>Liquid テンプレート、App Bridge、メタフィールド設計</p>
            </li>
            <li>
              <h4>・microCMS</h4>
              <p>REST API 連携、TypeScript × Vite による更新フロー</p>
            </li>
          </ul>
        </li>
        <li class="skill__list-item skill-item">
          <h3 class="skill-item__title">ビルド & デプロイ等</h3>
          <ul class="skill-item__list">
            <li>
              <h4>・Webpack</h4>
            </li>
            <li>
              <h4>・Vite</h4>
            </li>
            <li>
              <h4>・GitHub／SouceTREE</h4>
            </li>
          </ul>
        </li>
      </ul>
    </ul>
  `;

  if (skillContainer) {
    skillContainer.innerHTML = html;
  }
};

renderWorks();
renderAbout();
renderSkill();
