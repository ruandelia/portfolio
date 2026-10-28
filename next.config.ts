import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // gera HTML/CSS/JS estáticos em out/ no build
  images: {
    // Sem servidor não há otimização automática. As imagens já vão
    // otimizadas à mão (WebP/AVIF), como pede o RNF-PERF-01.
    unoptimized: true,
  },
};

export default nextConfig;