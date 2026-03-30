"use client";

import { use } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, MessageCircle, ShoppingBag, StarIcon } from "lucide-react";
import { fetchProductById } from "../../../api/productService";
import { Product } from "../../../types/types";
import Header from "@/components/Header";
import FloattingButton from "@/components/FloattingButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const createWhatsAppLink = (productName: string) =>
  `https://wa.me/558199025395?text=${encodeURIComponent(
    `Oi! Vim pelo catálogo da Donna Glamour e quero saber mais sobre ${productName}.`
  )}`;

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(Number(productId));
        setProduct(data);
      } catch (err) {
        setError("Erro ao carregar o produto. " + err);
      }
    }

    loadProduct();
  }, [productId]);

  const sizes = useMemo(() => ["P", "M", "G", "GG"], []);

  if (error) {
    return <p className="px-4 py-10 text-red-500">Erro: {error}</p>;
  }

  if (!product) {
    return <p className="px-4 py-10 text-[#6C4732]">Carregando produto...</p>;
  }

  const { id, nome, precoVenda, imagesUrl } = product;
  const primaryImage = imagesUrl[0] || "/logo.svg";

  const addCurrentProductToCart = () => {
    addToCart({
      id,
      name: nome,
      price: precoVenda,
      imageUrl: primaryImage,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <Header />

      <FloattingButton text="Adicionar ao carrinho" onPress={addCurrentProductToCart} />

      <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/"
            className="text-sm font-medium text-[#8D6F5C] transition hover:text-[#6C4732]"
          >
            Voltar ao catálogo
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-[#E8DDD3] bg-[#FFFDFC] p-3 shadow-[0_18px_40px_rgba(108,71,50,0.08)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[#EFE4DB]">
              <Image
                src={primaryImage}
                alt={product.nome}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E8DDD3] bg-[#FFFDFC] p-6 shadow-[0_18px_40px_rgba(108,71,50,0.08)] lg:sticky lg:top-24">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-[#EFE4DB] px-4 py-1.5 text-[#6C4732]">
                  {product.category?.nome || "Donna Glamour"}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-medium text-[#6C4732]">
                  <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
                  5,0
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="font-[family-name:var(--font-display)] text-4xl leading-none text-[#6C4732] sm:text-5xl">
                  {product.nome}
                </h1>
                <p className="text-3xl font-semibold text-[#6C4732]">
                  {formatPrice(precoVenda)}
                </p>
                <p className="leading-7 text-[#7D6658]">
                  {product.descricao ||
                    "Peça selecionada para quem busca estilo, praticidade e um look bonito para o dia a dia."}
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F8F5F0] p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8D6F5C]">
                  Tamanhos
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="rounded-full border border-[#AF8F7D] px-4 py-2 text-sm font-medium text-[#6C4732] transition hover:bg-[#EFE4DB]"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button
                  className="h-12 rounded-full bg-[#6C4732] text-white hover:bg-[#573724]"
                  onClick={addCurrentProductToCart}
                >
                  <ShoppingBag className="size-4" />
                  Adicionar ao carrinho
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-[#AF8F7D] bg-white text-[#6C4732] hover:bg-[#F8F5F0]"
                >
                  <a href={createWhatsAppLink(nome)} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>

              <div className="rounded-[1.5rem] border border-[#E8DDD3] bg-white p-4 text-sm leading-7 text-[#7D6658]">
                <div className="flex items-center gap-2 font-medium text-[#6C4732]">
                  <MapPin className="size-4" />
                  Loja física em Olinda
                </div>
                <p className="mt-2">Av. Presidente Kennedy, 31 - São Benedito, Olinda - PE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
