import '../scss/common.scss';
import '../scss/detail.scss';
import { getPortfolioItemById } from './api/portfolio';

const toTagArray = (src: ({ 'works-tag': string } | string)[] | undefined): string[] => {
  if (!Array.isArray(src)) return [];
  return src
    .map((t) => (typeof t === 'string' ? t : t['works-tag']))
    .filter((v): v is string => Boolean(v && v.trim()))
    .map((v) => v.trim());
};

const root = document.querySelector<HTMLDivElement>('#portfolio-detail')!;
const params = new URLSearchParams(location.search);
const id = params.get('id');

const renderDetail = async () => {
  if (!id) {
    root.innerHTML = '<p>作品が見つかりませんでした。</p>';
    return;
  }
  const item = await getPortfolioItemById(id, {
    fields: 'id,title,url,description,thumbnail,works-tag',
  });
  const tags = toTagArray(item['works-tag']);
  const firstImage = item.thumbnail?.[0];

  root.innerHTML = `
    <section class="work-detail section">
      <div class="section__inner">
        <header class="work-detail__header">
          <h1 class="work-detail__title">${item.title}</h1>
          ${item.url ? `<p class="work-detail__link">URL：<a href="${item.url}" target="_blank" rel="noopener">${item.url}</a></p>` : ''}
          ${item.description ? `<div class="work-detail__desc">${item.description.replace(/\n/g, '<br>')}</div>` : ''}
          ${tags.length ? `<ul class="work-detail__tags">${tags.map(tag => `<li>${tag}</li>`).join('')}</ul>` : ''}
        </header>
        <div class="work-detail__gallery">
          ${
            firstImage
              ? `<figure>
                  <img src="${firstImage.url}" alt="${item.title}" width="${firstImage.width || 1440}" height="${firstImage.height || 900}" loading="lazy" decoding="async">
                </figure>`
              : ''
          }
        </div>
      </section>
      <div class="work-detail__back"><a href="/">トップへ戻る</a></div>
  `;
};

renderDetail();
