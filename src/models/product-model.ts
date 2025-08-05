export type ProducModel = {
  idproduto: number;
  nome: string;
  descricao: string | null;
  preco: string;
  code: string;
  image_url: string | null;
  ativo: boolean | null;
  data_criacao?: Date | null;
  data_atualizacao?: Date | null;
};
