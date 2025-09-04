// src/api/portfolio.ts
import axios from 'axios';

const serviceId = import.meta.env.VITE_MICROCMS_SERVICE_ID;
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

// microCMS 共通クライアント
const client = axios.create({
  baseURL: `https://${serviceId}.microcms.io/api/v1`,
  headers: { 'X-MICROCMS-API-KEY': apiKey },
});

export type PortfolioItem = {
  id: string;
  title: string;
  url?: string;
  description?: string;
  thumbnail: { url: string; width?: number; height?: number }[];
  'works-tag'?: ({ 'works-tag': string } | string)[];
  clientName?: string;
  role?: string;
  tech?: string[];
  period?: string;
  bodyHtml?: string;
};


// ====== 一覧取得 ======
// limit/offset/fields/orders を渡せるようにし、用途に応じて軽量化・並び替え可能に
export const getPortfolioList = async (opts?: {
  limit?: number;
  offset?: number;
  fields?: string;        // 例: 'id,title,thumbnail'
  orders?: string;        // 例: '-publishedAt'
}) => {
  const { limit = 100, offset = 0, fields, orders } = opts ?? {};
  const { data } = await client.get<{ contents: PortfolioItem[] }>('/works', {
    params: { limit, offset, fields, orders },
  });
  return data.contents;
};

// ====== 1件取得（詳細） ======
export const getPortfolioItemById = async (
  id: string,
  opts?: {
    fields?: string;     // 必要な項目だけ取りたい時
    draftKey?: string;   // 下書きをプレビューする時に使用（任意）
  }
): Promise<PortfolioItem> => {
  const { fields, draftKey } = opts ?? {};
  const { data } = await client.get<PortfolioItem>(`/works/${id}`, {
    params: { fields, draftKey },
  });
  return data;
};
