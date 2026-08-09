export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#2a2a2a] bg-[#111]">
      <div className="relative aspect-[4/3] bg-[#1a1a1a] skeleton" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 bg-[#1a1a1a] rounded skeleton" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3.5 h-3.5 bg-[#1a1a1a] rounded skeleton" />
            ))}
          </div>
        </div>
        <div className="h-4 w-3/4 bg-[#1a1a1a] rounded skeleton" />
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-[#1a1a1a] rounded skeleton" />
          <div className="h-3 w-2/3 bg-[#1a1a1a] rounded skeleton" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <div className="h-3 w-12 bg-[#1a1a1a] rounded skeleton" />
          <div className="h-3 w-px bg-[#2a2a2a]" />
          <div className="h-3 w-10 bg-[#1a1a1a] rounded skeleton" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
          <div className="h-6 w-16 bg-[#1a1a1a] rounded skeleton" />
          <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl skeleton" />
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="bg-[#111] rounded-2xl p-6 border border-[#2a2a2a]">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-xl bg-[#1a1a1a] skeleton shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-1/2 bg-[#1a1a1a] rounded skeleton" />
          <div className="h-4 w-20 bg-[#1a1a1a] rounded skeleton" />
          <div className="flex items-center gap-2 pt-2">
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl skeleton" />
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <section className="pt-28 pb-20 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16 space-y-4">
          <div className="h-4 w-32 bg-[#1a1a1a] rounded skeleton mx-auto" />
          <div className="h-10 w-64 bg-[#1a1a1a] rounded skeleton mx-auto" />
          <div className="h-4 w-80 bg-[#1a1a1a] rounded skeleton mx-auto" />
        </div>

        <div className="mb-12 space-y-8">
          <div className="h-14 max-w-2xl mx-auto bg-[#1a1a1a] rounded-2xl skeleton" />
          <div className="flex justify-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 w-32 bg-[#1a1a1a] rounded-2xl skeleton" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CartPageSkeleton() {
  return (
    <section className="pt-28 pb-20 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-3">
          <div className="h-10 w-48 bg-[#1a1a1a] rounded skeleton" />
          <div className="h-4 w-32 bg-[#1a1a1a] rounded skeleton" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#111] rounded-2xl p-6 border border-[#2a2a2a] space-y-4">
              <div className="h-6 w-36 bg-[#1a1a1a] rounded skeleton" />
              <div className="space-y-3 pt-2">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-[#1a1a1a] rounded skeleton" />
                  <div className="h-4 w-16 bg-[#1a1a1a] rounded skeleton" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-[#1a1a1a] rounded skeleton" />
                  <div className="h-4 w-12 bg-[#1a1a1a] rounded skeleton" />
                </div>
                <div className="border-t border-[#2a2a2a] pt-3">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 bg-[#1a1a1a] rounded skeleton" />
                    <div className="h-5 w-20 bg-[#1a1a1a] rounded skeleton" />
                  </div>
                </div>
              </div>
              <div className="h-14 bg-[#1a1a1a] rounded-xl skeleton" />
              <div className="h-12 bg-[#1a1a1a] rounded-xl skeleton" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
